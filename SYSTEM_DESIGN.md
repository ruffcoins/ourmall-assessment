# OurMall System Design: Multi-Vendor Order Management

This document outline details the system architecture, order splitting logic, item-level cancellation/refund policies, and core API structures for OurMall's multi-vendor commerce platform.

---

## 1. Multi-Vendor Order Structure
To support transactions with items from multiple distinct vendors in a single checkout event, the system uses a **hierarchical data structure**:

* **Master Order (Parent)**: Acts as the primary transaction shell. Tracks the customer ID, payment status, grand total, currency, and global timestamps.
* **Vendor Sub-Order (Child)**: Created dynamically for each unique vendor present in the cart. Groups line items by `vendorId` and manages independent fulfillment status (`Pending ➔ Confirmed ➔ Shipped ➔ Delivered ➔ Cancelled ➔ Returned`). Holds snapshotted **Vendor Metadata** (`vendorName`, `vendorId`) to preserve historical integrity.
* **Line Item (Leaf Unit)**: Represents specific products purchased. Holds a permanent snapshot of pricing, quantity, and product metadata (`productId`, `name`, `imageUrl`, `originalPrice`, `promoCode`, and `status`).

---

## 2. How the Order Splits Per Vendor
When a customer places an order, the system processes checkout in a transactional pipeline:

1. **Group by Vendor**: Cart items are partitioned based on their `vendorId`.
2. **Sub-Order Instantiation**: For each partition, a `VendorSubOrder` is created, and its `subTotal` is calculated as:
   $$\text{Subtotal} = \sum (\text{item.pricePerItem} \times \text{item.quantity})$$
3. **Master Compilation**: The parent `MasterOrder` is created to link all `VendorSubOrders`. The total is calculated:
   $$\text{Grand Total} = \sum (\text{Sub-Orders Subtotal}) - \text{Global Discounts}$$
4. **Lifecycle Independence**: Vendors only view and fulfill their corresponding sub-order. Delay or cancellation in one sub-order does not disrupt the fulfillment flow of other vendors' sub-orders.

---

## 3. Item-Level Cancellation & Refund
OurMall permits cancellation and refunding of specific items without canceling the entire order.

* **Refund Calculations**: When an item is canceled or returned, the system calculates the refund based on historical checkout prices.
* **Proportional Discount Reversion**: If a coupon or promo code was applied to the sub-order or global cart, the line item's refund is net of its proportional discount:
  $$\text{Item Proportional Discount} = \text{Item Line Total} \times \left( \frac{\text{Cart Discount}}{\text{Cart Subtotal}} \right)$$
  $$\text{Refund Amount} = (\text{Item Price} \times \text{Item Qty}) - \text{Item Proportional Discount}$$
* **Hierarchical Status Propagation**:
  1. Setting all items in a sub-order to `Cancelled` or `Returned` automatically updates that `VendorSubOrder` status to `Cancelled` or `Returned`.
  2. If all sub-orders under a master order are cancelled or returned, the `MasterOrder` status updates to `Cancelled`.

---

## 4. Basic API Structure

### A. Add to Cart
Adds a item to the user's active session cart.
* **Endpoint**: `POST /api/v1/cart/items`
* **Payload**:
  ```json
  {
    "productId": "PROD-001",
    "quantity": 2
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "cart": {
      "items": [{ "productId": "PROD-001", "quantity": 2, "addedAtPrice": 39.99 }],
      "cartSubtotal": 79.98,
      "cartTotal": 79.98
    }
  }
  ```

### B. Place Order (Checkout)
Converts cart items into a hierarchical order structure.
* **Endpoint**: `POST /api/v1/orders/checkout`
* **Payload**:
  ```json
  {
    "currency": "EUR"
  }
  ```
* **Response (201 Created)**:
  ```json
  {
    "success": true,
    "masterOrderId": "ORDER-918273",
    "grandTotal": 79.98,
    "currency": "EUR",
    "createdAt": "2026-06-23T20:45:00Z"
  }
  ```

### C. Cancel / Return Item
Processes item-level cancellation or return.
* **Endpoint**: `POST /api/v1/orders/:masterOrderId/cancel-item`
* **Payload**:
  ```json
  {
    "vendorId": "VENDOR-001",
    "productId": "PROD-001"
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "refundedAmount": 79.98,
    "updatedMasterOrder": {
      "masterOrderId": "ORDER-918273",
      "grandTotal": 0.00,
      "status": "Cancelled"
    }
  }
  ```
