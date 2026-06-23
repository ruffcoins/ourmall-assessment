# OurMall Assessment - Multi-Vendor E-Commerce App

A production-grade, highly optimized React Native application built with **Expo (v56)**, **TypeScript**, **Tailwind CSS (NativeWind v4)**, and **Zustand** (Global State).

This project implements all core e-commerce tasks, focusing on multi-vendor logistics, order splitting, item-level cancellations, and strict invoice auditing compliance.

---

## 🚀 Quick Start & Run Instructions

### Prerequisites
Ensure you have Node.js (v18+) and npm/yarn installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
Always start with the clear-cache flag to ensure compiled style variables and configs load cleanly:
```bash
npx expo start -c
```

### 3. Run on Simulator/Device
* Press `i` to open in iOS Simulator.
* Press `a` to open in Android Emulator.
* Scan the QR code using the Expo Go app on your physical device.

---

## 📂 Codebase Architecture (MVVM)

The project is structured around a modular **Model-View-ViewModel (MVVM)** pattern to separate business computations from layouts:

```
src/
├── app/                  # Expo Router file-based pages & routes
├── features/             # Feature-specific modules
│   ├── cancellation/     # Item-level cancellation/return logic & views
│   ├── cart/             # Shopping cart aggregation and grouping
│   ├── checkout/         # Form validation, formatting & submission
│   ├── filter/           # Catalog filter parameters & sheets
│   ├── order-details/    # Nested order tracking page
│   ├── orders/           # Historical orders index
│   └── product-listing/  # Home grid, card skeletons & timer list
└── shared/               # Shared logic across features
    ├── components/       # Custom Typography, Steppers, Quantity controls
    ├── data/             # Mock Database storage (db.ts)
    ├── hooks/            # App-wide hooks (useTheme, useAppFonts)
    ├── store/            # Zustand global store slices
    ├── types/            # Strict TypeScript interfaces
    └── utils/            # Mock API endpoints, currency conversion
```

---

## 🛠️ Key Features Implemented

### Task 1: Product Listing & Dynamic Pricing
* **Performant Grid List**: Built using Shopify's `@shopify/flash-list` with custom skeletons, image loading covers, and fluid fade-in animations.
* **Smart Filter & Search**: Supports debounced text search, category filtering, price bounds, and stock availability switches.
* **Dynamic Offer Expiries**: Products with active promotional discounts show a real-time countdown. Once the countdown hits zero, prices automatically recalculate and update immediately.
* **API Failure Handling**: Full error boundary overlays with a "Try Again" refetch button.

### Task 2: Multi-Vendor Cart Logic
* **Multi-Vendor Grouping**: Items in the cart are grouped by vendor. Shows a visual breakdown of subtotals and discounts per vendor.
* **Offer Expiry in Cart**: If an item's promotion expires while in the cart, the cart total and item price automatically update.
* **Duplicate Item Merging**: Adding the same product merges quantities, respecting available stock limits.
* **Stock & Price Validations**: Prevents adding more items to the cart than are available in stock.

### Task 3: Checkout, Orders, & Cancellations
* **Pre-Checkout Validation**: Real-time validation checks for stock and price changes before permitting checkout.
* **Payment Form Formatting**: Automatic spacing for card numbers, MM/YY expiry dates, and numerical CVV inputs.
* **Order Splitting**: Groups items into vendor-wise sub-orders upon placement.
* **Status Stepper Flow**: Visually tracks individual vendor sub-orders through their lifecycle states: `Pending ➔ Confirmed ➔ Shipped ➔ Delivered / Cancelled`.
* **Advanced Item/Order Cancellation**:
  * Allows cancelling the entire order or individual items.
  * Calculates exact refund amounts for only the cancelled items.

### 🛡️ Historical Invoice & Audit Integrity (Features 1 & 3)
To ensure compliance with financial and audit standards:
* **Vendor Metadata Snapshotting**: We capture the active `vendorName` inside `VendorSubOrder` at checkout, preventing historical order invoices from breaking if the vendor profile changes in the catalog.
* **Promotional Discount Snapshotting**: Each `OrderLineItem` stores a snapshot of the item's pre-discount `originalPrice` and the applied `promoCode` (e.g., `20% OFF`), keeping order transactions auditable even if catalog discounts change.
* **Decoupled Refunds**: Cancellation refunds and image displays read purely off these historical snapshots, eliminating dynamic catalog database dependencies.

---

## 📐 System Design Brief

The brief outlining our multi-vendor order structure, split-fulfillment logic, cancellation calculation formulas, and basic API endpoints is documented in the dedicated [SYSTEM_DESIGN.md](file:///Users/anthonychukwujekwu/Code/ourmall-assessment/SYSTEM_DESIGN.md) file.

---

## ⚡ Performance & Quality Control

1. **Search Input Debouncing**: Debounced text search at `400ms` to prevent database query spikes and layout rendering lags.
2. **Layout Navigation Isolation**: Removed dynamic theme-class wrappers from the root layout file. The layout is now fully static, preventing navigator unmounting errors, while NativeWind handles class overrides internally.
3. **Type Verification**: All code strictly complies with TypeScript configurations. Compile validation can be run with:
   ```bash
   npx tsc --noEmit
   ```
