import { Product, MasterOrder } from '../types';

let products: Product[] = [
  {
    "id": "PROD-001",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with active noise cancelling, premium sound, and comfortable fit.",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 49.99,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 25,
    "rating": 4.5,
    "reviewCount": 98,
    "discount": {
      "type": "percentage",
      "value": 20,
      "expiresAt": "2026-06-30T12:00:00.000Z"
    }
  },
  {
    "id": "PROD-002",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Smart Watch Pro",
    "description": "Advanced health tracking, GPS, waterproof, and long battery life.",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 99.99,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 12,
    "rating": 4.6,
    "reviewCount": 128,
    "discount": {
      "type": "percentage",
      "value": 15,
      "expiresAt": "2026-06-29T08:00:00.000Z"
    }
  },
  {
    "id": "PROD-003",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Running Shoes",
    "description": "Lightweight and breathable running shoes with maximum cushioning and grip.",
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format",
    "basePrice": 79.99,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 5,
    "rating": 4.2,
    "reviewCount": 64,
    "discount": {
      "type": "percentage",
      "value": 25,
      "expiresAt": "2026-06-28T20:00:00.000Z"
    }
  },
  {
    "id": "PROD-004",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Travel Backpack",
    "description": "Durable and water-resistant travel backpack with multi-compartments.",
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format",
    "basePrice": 49.99,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 18,
    "rating": 4.7,
    "reviewCount": 112,
    "discount": {
      "type": "percentage",
      "value": 10,
      "expiresAt": "2026-06-30T18:00:00.000Z"
    }
  },
  {
    "id": "PROD-005",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Power Bank 10000mAh",
    "description": "Compact and fast charging 10000mAh power bank for mobile phones and tablets.",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format",
    "basePrice": 24.99,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 20,
    "rating": 4.3,
    "reviewCount": 42,
    "discount": {
      "type": "percentage",
      "value": 20,
      "expiresAt": "2026-06-29T16:00:00.000Z"
    }
  },
  {
    "id": "PROD-006",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Classic Novel",
    "description": "High-quality classic novel designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&auto=format",
    "basePrice": 84,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 21,
    "rating": 4.8,
    "reviewCount": 181,
    "discount": null
  },
  {
    "id": "PROD-007",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Elite Keyboard",
    "description": "High-quality elite keyboard designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&auto=format",
    "basePrice": 161,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 53,
    "rating": 4.2,
    "reviewCount": 207,
    "discount": null
  },
  {
    "id": "PROD-008",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Ultra Jacket",
    "description": "High-quality ultra jacket designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop&auto=format",
    "basePrice": 280,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 24,
    "rating": 4.9,
    "reviewCount": 386,
    "discount": null
  },
  {
    "id": "PROD-009",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Sleek Clock",
    "description": "High-quality sleek clock designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&auto=format",
    "basePrice": 39,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 48,
    "rating": 4.6,
    "reviewCount": 485,
    "discount": null
  },
  {
    "id": "PROD-010",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Ultra Cleanser",
    "description": "High-quality ultra cleanser designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1616046229478-9901baab7813?w=400&h=400&fit=crop&auto=format",
    "basePrice": 226,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 10,
    "rating": 4.3,
    "reviewCount": 135,
    "discount": {
      "type": "percentage",
      "value": 36,
      "expiresAt": "2026-06-28T09:51:34.985Z"
    }
  },
  {
    "id": "PROD-011",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Eco Watch",
    "description": "High-quality eco watch designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1596462502278-27bfdc403a5e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 225,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 3,
    "rating": 4.1,
    "reviewCount": 1,
    "discount": null
  },
  {
    "id": "PROD-012",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Smart Dumbbells",
    "description": "High-quality smart dumbbells designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1591561954555-607968c89040?w=400&h=400&fit=crop&auto=format",
    "basePrice": 41,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 12,
    "rating": 4.2,
    "reviewCount": 34,
    "discount": {
      "type": "percentage",
      "value": 28,
      "expiresAt": "2026-06-27T09:16:01.878Z"
    }
  },
  {
    "id": "PROD-013",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Pro Journal",
    "description": "High-quality pro journal designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format",
    "basePrice": 268,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 33,
    "rating": 4.1,
    "reviewCount": 11,
    "discount": null
  },
  {
    "id": "PROD-014",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Elite Camera",
    "description": "High-quality elite camera designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&auto=format",
    "basePrice": 218,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 0,
    "rating": 4.4,
    "reviewCount": 37,
    "discount": {
      "type": "percentage",
      "value": 28,
      "expiresAt": "2026-06-28T08:30:27.256Z"
    }
  },
  {
    "id": "PROD-015",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Classic Sneakers",
    "description": "High-quality classic sneakers designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format",
    "basePrice": 178,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 3,
    "rating": 4.8,
    "reviewCount": 147,
    "discount": {
      "type": "percentage",
      "value": 26,
      "expiresAt": "2026-06-23T16:57:17.961Z"
    }
  },
  {
    "id": "PROD-016",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Classic Lamp",
    "description": "High-quality classic lamp designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1434389677669-e08b4cae3d87?w=400&h=400&fit=crop&auto=format",
    "basePrice": 222,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 40,
    "rating": 4.4,
    "reviewCount": 48,
    "discount": {
      "type": "percentage",
      "value": 34,
      "expiresAt": "2026-06-29T15:33:28.865Z"
    }
  },
  {
    "id": "PROD-017",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Classic Cleanser",
    "description": "High-quality classic cleanser designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1586023492125-27b2c045efd3?w=400&h=400&fit=crop&auto=format",
    "basePrice": 28,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 0,
    "rating": 4.3,
    "reviewCount": 84,
    "discount": {
      "type": "percentage",
      "value": 19,
      "expiresAt": "2026-06-26T22:03:28.366Z"
    }
  },
  {
    "id": "PROD-018",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Essential Gloves",
    "description": "High-quality essential gloves designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa181?w=400&h=400&fit=crop&auto=format",
    "basePrice": 194,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 28,
    "rating": 4.3,
    "reviewCount": 312,
    "discount": {
      "type": "fixed",
      "value": 28,
      "expiresAt": "2026-06-23T23:32:38.294Z"
    }
  },
  {
    "id": "PROD-019",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Sleek Ball",
    "description": "High-quality sleek ball designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1606318005154-a401ec7fba18?w=400&h=400&fit=crop&auto=format",
    "basePrice": 117,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 42,
    "rating": 4.9,
    "reviewCount": 253,
    "discount": null
  },
  {
    "id": "PROD-020",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Eco Diary",
    "description": "High-quality eco diary designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1534258936669-2a1e8e2bde4d?w=400&h=400&fit=crop&auto=format",
    "basePrice": 216,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 0,
    "rating": 4.6,
    "reviewCount": 244,
    "discount": null
  },
  {
    "id": "PROD-021",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Premium Tablet",
    "description": "High-quality premium tablet designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1474366521628-c1b3e0a27e2e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 16,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 3,
    "rating": 4.6,
    "reviewCount": 173,
    "discount": {
      "type": "percentage",
      "value": 20,
      "expiresAt": "2026-06-27T21:52:21.859Z"
    }
  },
  {
    "id": "PROD-022",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Elite Sneakers",
    "description": "High-quality elite sneakers designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&auto=format",
    "basePrice": 27,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 12,
    "rating": 4.4,
    "reviewCount": 333,
    "discount": null
  },
  {
    "id": "PROD-023",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Sleek Chair",
    "description": "High-quality sleek chair designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 29,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 3,
    "rating": 4,
    "reviewCount": 152,
    "discount": {
      "type": "percentage",
      "value": 24,
      "expiresAt": "2026-06-25T22:36:30.127Z"
    }
  },
  {
    "id": "PROD-024",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Premium Perfume",
    "description": "High-quality premium perfume designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=400&fit=crop&auto=format",
    "basePrice": 23,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 50,
    "rating": 3.7,
    "reviewCount": 225,
    "discount": null
  },
  {
    "id": "PROD-025",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Essential Backpack",
    "description": "High-quality essential backpack designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&auto=format",
    "basePrice": 197,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 0,
    "rating": 4.7,
    "reviewCount": 9,
    "discount": null
  },
  {
    "id": "PROD-026",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Premium Racket",
    "description": "High-quality premium racket designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1601924994987-f6949da57dc8?w=400&h=400&fit=crop&auto=format",
    "basePrice": 147,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 0,
    "rating": 4.4,
    "reviewCount": 171,
    "discount": null
  },
  {
    "id": "PROD-027",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Modern Guide",
    "description": "High-quality modern guide designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop&auto=format",
    "basePrice": 272,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 36,
    "rating": 4.5,
    "reviewCount": 307,
    "discount": null
  },
  {
    "id": "PROD-028",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Elite Tablet",
    "description": "High-quality elite tablet designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop&auto=format",
    "basePrice": 193,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 20,
    "rating": 4.6,
    "reviewCount": 441,
    "discount": null
  },
  {
    "id": "PROD-029",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Pro Coat",
    "description": "High-quality pro coat designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&auto=format",
    "basePrice": 203,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 13,
    "rating": 4.1,
    "reviewCount": 263,
    "discount": null
  },
  {
    "id": "PROD-030",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Ultra Mirror",
    "description": "High-quality ultra mirror designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop&auto=format",
    "basePrice": 72,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 29,
    "rating": 4.4,
    "reviewCount": 392,
    "discount": null
  },
  {
    "id": "PROD-031",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Modern Mask",
    "description": "High-quality modern mask designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&auto=format",
    "basePrice": 172,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 46,
    "rating": 3.8,
    "reviewCount": 70,
    "discount": null
  },
  {
    "id": "PROD-032",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Ultra Sunglasses",
    "description": "High-quality ultra sunglasses designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&auto=format",
    "basePrice": 233,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 2,
    "rating": 4.3,
    "reviewCount": 301,
    "discount": {
      "type": "percentage",
      "value": 10,
      "expiresAt": "2026-06-29T23:28:13.373Z"
    }
  },
  {
    "id": "PROD-033",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Ultra Shoes",
    "description": "High-quality ultra shoes designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1614179818511-57b26dfafdf2?w=400&h=400&fit=crop&auto=format",
    "basePrice": 220,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 28,
    "rating": 3.6,
    "reviewCount": 226,
    "discount": null
  },
  {
    "id": "PROD-034",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Sleek Notebook",
    "description": "High-quality sleek notebook designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1526401485004-46910ecc8e2f?w=400&h=400&fit=crop&auto=format",
    "basePrice": 145,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 42,
    "rating": 4.9,
    "reviewCount": 451,
    "discount": null
  },
  {
    "id": "PROD-035",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Essential Tablet",
    "description": "High-quality essential tablet designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 132,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 18,
    "rating": 3.9,
    "reviewCount": 135,
    "discount": null
  },
  {
    "id": "PROD-036",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Ultra Jacket",
    "description": "High-quality ultra jacket designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&auto=format",
    "basePrice": 259,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 26,
    "rating": 3.6,
    "reviewCount": 357,
    "discount": {
      "type": "fixed",
      "value": 30,
      "expiresAt": "2026-06-29T14:12:59.821Z"
    }
  },
  {
    "id": "PROD-037",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Ultra Cushion",
    "description": "High-quality ultra cushion designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format",
    "basePrice": 12,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 30,
    "rating": 3.9,
    "reviewCount": 413,
    "discount": null
  },
  {
    "id": "PROD-038",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Essential Cream",
    "description": "High-quality essential cream designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop&auto=format",
    "basePrice": 272,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 3,
    "rating": 4,
    "reviewCount": 48,
    "discount": {
      "type": "percentage",
      "value": 24,
      "expiresAt": "2026-06-28T23:01:12.286Z"
    }
  },
  {
    "id": "PROD-039",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Sleek Gloves",
    "description": "High-quality sleek gloves designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1567721913486-6585f068b645?w=400&h=400&fit=crop&auto=format",
    "basePrice": 138,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 41,
    "rating": 4.7,
    "reviewCount": 169,
    "discount": {
      "type": "percentage",
      "value": 34,
      "expiresAt": "2026-06-28T14:27:55.178Z"
    }
  },
  {
    "id": "PROD-040",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Eco Dumbbells",
    "description": "High-quality eco dumbbells designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&auto=format",
    "basePrice": 263,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 17,
    "rating": 3.7,
    "reviewCount": 105,
    "discount": null
  },
  {
    "id": "PROD-041",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Smart Guide",
    "description": "High-quality smart guide designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=400&h=400&fit=crop&auto=format",
    "basePrice": 138,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 32,
    "rating": 4.2,
    "reviewCount": 7,
    "discount": {
      "type": "percentage",
      "value": 38,
      "expiresAt": "2026-06-30T01:55:23.366Z"
    }
  },
  {
    "id": "PROD-042",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Sleek Speaker",
    "description": "High-quality sleek speaker designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop&auto=format",
    "basePrice": 164,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 15,
    "rating": 4.2,
    "reviewCount": 141,
    "discount": null
  },
  {
    "id": "PROD-043",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Essential Coat",
    "description": "High-quality essential coat designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&auto=format",
    "basePrice": 26,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 15,
    "rating": 3.9,
    "reviewCount": 313,
    "discount": null
  },
  {
    "id": "PROD-044",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Modern Lamp",
    "description": "High-quality modern lamp designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1503341504249-4e695e01e98d?w=400&h=400&fit=crop&auto=format",
    "basePrice": 38,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 46,
    "rating": 5,
    "reviewCount": 202,
    "discount": null
  },
  {
    "id": "PROD-045",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Classic Mask",
    "description": "High-quality classic mask designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 221,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 0,
    "rating": 4.5,
    "reviewCount": 169,
    "discount": null
  },
  {
    "id": "PROD-046",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Elite Wallet",
    "description": "High-quality elite wallet designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 230,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 28,
    "rating": 4.4,
    "reviewCount": 22,
    "discount": null
  },
  {
    "id": "PROD-047",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Smart Mat",
    "description": "High-quality smart mat designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1617038260897-41a57a31b6e5?w=400&h=400&fit=crop&auto=format",
    "basePrice": 113,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 3,
    "rating": 4.5,
    "reviewCount": 179,
    "discount": {
      "type": "fixed",
      "value": 9,
      "expiresAt": "2026-06-24T07:37:55.102Z"
    }
  },
  {
    "id": "PROD-048",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Essential Folio",
    "description": "High-quality essential folio designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=400&fit=crop&auto=format",
    "basePrice": 124,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 3,
    "rating": 4.8,
    "reviewCount": 436,
    "discount": null
  },
  {
    "id": "PROD-049",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Essential Earbuds",
    "description": "High-quality essential earbuds designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
    "basePrice": 104,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 17,
    "rating": 4.2,
    "reviewCount": 178,
    "discount": null
  },
  {
    "id": "PROD-050",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Elite Jacket",
    "description": "High-quality elite jacket designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop&auto=format",
    "basePrice": 139,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 44,
    "rating": 3.6,
    "reviewCount": 134,
    "discount": {
      "type": "percentage",
      "value": 20,
      "expiresAt": "2026-06-26T19:21:49.411Z"
    }
  },
  {
    "id": "PROD-051",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Elite Clock",
    "description": "High-quality elite clock designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=400&fit=crop&auto=format",
    "basePrice": 239,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 47,
    "rating": 3.9,
    "reviewCount": 310,
    "discount": null
  },
  {
    "id": "PROD-052",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Modern Lotion",
    "description": "High-quality modern lotion designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop&auto=format",
    "basePrice": 56,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 2,
    "rating": 3.7,
    "reviewCount": 479,
    "discount": {
      "type": "fixed",
      "value": 7,
      "expiresAt": "2026-06-28T02:35:36.907Z"
    }
  },
  {
    "id": "PROD-053",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Essential Belt",
    "description": "High-quality essential belt designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1608248597279-f99d160bfce1?w=400&h=400&fit=crop&auto=format",
    "basePrice": 267,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 50,
    "rating": 5,
    "reviewCount": 231,
    "discount": null
  },
  {
    "id": "PROD-054",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Smart Mat",
    "description": "High-quality smart mat designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&auto=format",
    "basePrice": 198,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 13,
    "rating": 4.5,
    "reviewCount": 195,
    "discount": {
      "type": "fixed",
      "value": 24,
      "expiresAt": "2026-06-26T22:30:53.869Z"
    }
  },
  {
    "id": "PROD-055",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Smart Album",
    "description": "High-quality smart album designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop&auto=format",
    "basePrice": 113,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 1,
    "rating": 4.4,
    "reviewCount": 443,
    "discount": {
      "type": "percentage",
      "value": 26,
      "expiresAt": "2026-06-23T19:59:52.081Z"
    }
  },
  {
    "id": "PROD-056",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Eco Charger",
    "description": "High-quality eco charger designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1516979187895-ef17800683aa?w=400&h=400&fit=crop&auto=format",
    "basePrice": 192,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 34,
    "rating": 4.8,
    "reviewCount": 292,
    "discount": null
  },
  {
    "id": "PROD-057",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Premium Dress",
    "description": "High-quality premium dress designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop&auto=format",
    "basePrice": 235,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 24,
    "rating": 3.6,
    "reviewCount": 425,
    "discount": null
  },
  {
    "id": "PROD-058",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Smart Cushion",
    "description": "High-quality smart cushion designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop&auto=format",
    "basePrice": 61,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 25,
    "rating": 3.8,
    "reviewCount": 316,
    "discount": null
  },
  {
    "id": "PROD-059",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Sleek Lotion",
    "description": "High-quality sleek lotion designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format",
    "basePrice": 52,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 20,
    "rating": 4.5,
    "reviewCount": 326,
    "discount": {
      "type": "fixed",
      "value": 6,
      "expiresAt": "2026-06-29T00:49:47.591Z"
    }
  },
  {
    "id": "PROD-060",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Eco Wallet",
    "description": "High-quality eco wallet designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1581044777550-4cba5b1c4f07?w=400&h=400&fit=crop&auto=format",
    "basePrice": 287,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 30,
    "rating": 4.5,
    "reviewCount": 476,
    "discount": null
  },
  {
    "id": "PROD-061",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Pro Mat",
    "description": "High-quality pro mat designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop&auto=format",
    "basePrice": 247,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 18,
    "rating": 4.7,
    "reviewCount": 317,
    "discount": null
  },
  {
    "id": "PROD-062",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Sleek Guide",
    "description": "High-quality sleek guide designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?w=400&h=400&fit=crop&auto=format",
    "basePrice": 131,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 11,
    "rating": 4.3,
    "reviewCount": 203,
    "discount": null
  },
  {
    "id": "PROD-063",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Pro Monitor",
    "description": "High-quality pro monitor designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=400&fit=crop&auto=format",
    "basePrice": 207,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 0,
    "rating": 4.3,
    "reviewCount": 251,
    "discount": null
  },
  {
    "id": "PROD-064",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Essential T-Shirt",
    "description": "High-quality essential t-shirt designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop&auto=format",
    "basePrice": 187,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 1,
    "rating": 4.7,
    "reviewCount": 15,
    "discount": {
      "type": "percentage",
      "value": 29,
      "expiresAt": "2026-06-29T14:29:10.064Z"
    }
  },
  {
    "id": "PROD-065",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Eco Mirror",
    "description": "High-quality eco mirror designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop&auto=format",
    "basePrice": 129,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 3,
    "rating": 4.5,
    "reviewCount": 163,
    "discount": {
      "type": "percentage",
      "value": 28,
      "expiresAt": "2026-06-29T08:07:30.708Z"
    }
  },
  {
    "id": "PROD-066",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Smart Perfume",
    "description": "High-quality smart perfume designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1581404804984-404ad3ac4f1b?w=400&h=400&fit=crop&auto=format",
    "basePrice": 172,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 48,
    "rating": 4.7,
    "reviewCount": 365,
    "discount": null
  },
  {
    "id": "PROD-067",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Classic Gloves",
    "description": "High-quality classic gloves designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1543690827-4a6f61c81085?w=400&h=400&fit=crop&auto=format",
    "basePrice": 134,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 38,
    "rating": 4.3,
    "reviewCount": 14,
    "discount": {
      "type": "percentage",
      "value": 36,
      "expiresAt": "2026-06-24T14:58:56.659Z"
    }
  },
  {
    "id": "PROD-068",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Pro Ball",
    "description": "High-quality pro ball designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1602173574767-37a04aa493f8?w=400&h=400&fit=crop&auto=format",
    "basePrice": 174,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 44,
    "rating": 4.1,
    "reviewCount": 371,
    "discount": null
  },
  {
    "id": "PROD-069",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Eco Album",
    "description": "High-quality eco album designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop&auto=format",
    "basePrice": 21,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 47,
    "rating": 5,
    "reviewCount": 104,
    "discount": null
  },
  {
    "id": "PROD-070",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Modern Earbuds",
    "description": "High-quality modern earbuds designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?w=400&h=400&fit=crop&auto=format",
    "basePrice": 131,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 31,
    "rating": 4.1,
    "reviewCount": 312,
    "discount": {
      "type": "fixed",
      "value": 29,
      "expiresAt": "2026-06-29T20:31:10.559Z"
    }
  },
  {
    "id": "PROD-071",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Modern Jeans",
    "description": "High-quality modern jeans designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&auto=format",
    "basePrice": 141,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 57,
    "rating": 3.9,
    "reviewCount": 7,
    "discount": {
      "type": "percentage",
      "value": 32,
      "expiresAt": "2026-06-29T03:45:56.978Z"
    }
  },
  {
    "id": "PROD-072",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Essential Lamp",
    "description": "High-quality essential lamp designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3773?w=400&h=400&fit=crop&auto=format",
    "basePrice": 158,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 26,
    "rating": 4.3,
    "reviewCount": 393,
    "discount": null
  },
  {
    "id": "PROD-073",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Classic Cleanser",
    "description": "High-quality classic cleanser designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=400&h=400&fit=crop&auto=format",
    "basePrice": 138,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 0,
    "rating": 4.3,
    "reviewCount": 471,
    "discount": null
  },
  {
    "id": "PROD-074",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Sleek Wallet",
    "description": "High-quality sleek wallet designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&h=400&fit=crop&auto=format",
    "basePrice": 111,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 18,
    "rating": 4.7,
    "reviewCount": 17,
    "discount": null
  },
  {
    "id": "PROD-075",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Sleek Dumbbells",
    "description": "High-quality sleek dumbbells designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1571945192050-5e33e5a04c7d?w=400&h=400&fit=crop&auto=format",
    "basePrice": 93,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 0,
    "rating": 3.8,
    "reviewCount": 181,
    "discount": null
  },
  {
    "id": "PROD-076",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Eco Guide",
    "description": "High-quality eco guide designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1605296830714-7df6e42b5d72?w=400&h=400&fit=crop&auto=format",
    "basePrice": 128,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 40,
    "rating": 4.8,
    "reviewCount": 74,
    "discount": null
  },
  {
    "id": "PROD-077",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Ultra Earbuds",
    "description": "High-quality ultra earbuds designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop&auto=format",
    "basePrice": 102,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 28,
    "rating": 5,
    "reviewCount": 128,
    "discount": null
  },
  {
    "id": "PROD-078",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Smart Boots",
    "description": "High-quality smart boots designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1567721913486-6585f068b645?w=400&h=400&fit=crop&auto=format",
    "basePrice": 57,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 28,
    "rating": 4.2,
    "reviewCount": 173,
    "discount": null
  },
  {
    "id": "PROD-079",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Ultra Cushion",
    "description": "High-quality ultra cushion designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&auto=format",
    "basePrice": 208,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 0,
    "rating": 5,
    "reviewCount": 162,
    "discount": null
  },
  {
    "id": "PROD-080",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Pro Oil",
    "description": "High-quality pro oil designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=400&h=400&fit=crop&auto=format",
    "basePrice": 190,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 3,
    "rating": 4.1,
    "reviewCount": 354,
    "discount": null
  },
  {
    "id": "PROD-081",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Elite Sunglasses",
    "description": "High-quality elite sunglasses designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1614859048452-e6e2e5dfb587?w=400&h=400&fit=crop&auto=format",
    "basePrice": 41,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 49,
    "rating": 4.9,
    "reviewCount": 125,
    "discount": {
      "type": "percentage",
      "value": 39,
      "expiresAt": "2026-06-23T13:54:47.315Z"
    }
  },
  {
    "id": "PROD-082",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Eco Ball",
    "description": "High-quality eco ball designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1611601322175-ef8ec8c9e1b6?w=400&h=400&fit=crop&auto=format",
    "basePrice": 271,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 54,
    "rating": 3.6,
    "reviewCount": 280,
    "discount": null
  },
  {
    "id": "PROD-083",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Pro Guide",
    "description": "High-quality pro guide designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1541534741688-6078c7bfb5c5?w=400&h=400&fit=crop&auto=format",
    "basePrice": 284,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 0,
    "rating": 4.5,
    "reviewCount": 139,
    "discount": {
      "type": "fixed",
      "value": 30,
      "expiresAt": "2026-06-29T00:51:33.727Z"
    }
  },
  {
    "id": "PROD-084",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Premium Speaker",
    "description": "High-quality premium speaker designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1471970394675-613138e45da3?w=400&h=400&fit=crop&auto=format",
    "basePrice": 75,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 45,
    "rating": 3.8,
    "reviewCount": 11,
    "discount": null
  },
  {
    "id": "PROD-085",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Ultra Jacket",
    "description": "High-quality ultra jacket designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1587834467706-4ae7f2b47e50?w=400&h=400&fit=crop&auto=format",
    "basePrice": 65,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 16,
    "rating": 4.7,
    "reviewCount": 110,
    "discount": {
      "type": "fixed",
      "value": 10,
      "expiresAt": "2026-06-24T23:55:23.832Z"
    }
  },
  {
    "id": "PROD-086",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Sleek Mirror",
    "description": "High-quality sleek mirror designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1594938298603-a3554582a5bf?w=400&h=400&fit=crop&auto=format",
    "basePrice": 124,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 3,
    "rating": 5,
    "reviewCount": 217,
    "discount": null
  },
  {
    "id": "PROD-087",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Modern Scrub",
    "description": "High-quality modern scrub designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&auto=format",
    "basePrice": 240,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 0,
    "rating": 4.1,
    "reviewCount": 93,
    "discount": null
  },
  {
    "id": "PROD-088",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Modern Backpack",
    "description": "High-quality modern backpack designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop&auto=format",
    "basePrice": 85,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 0,
    "rating": 3.6,
    "reviewCount": 353,
    "discount": null
  },
  {
    "id": "PROD-089",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Smart Mat",
    "description": "High-quality smart mat designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1547949003-9792a18a2b43?w=400&h=400&fit=crop&auto=format",
    "basePrice": 117,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 2,
    "rating": 4.2,
    "reviewCount": 242,
    "discount": null
  },
  {
    "id": "PROD-090",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Elite Planner",
    "description": "High-quality elite planner designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&auto=format",
    "basePrice": 186,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 17,
    "rating": 4,
    "reviewCount": 143,
    "discount": null
  },
  {
    "id": "PROD-091",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Classic Headphones",
    "description": "High-quality classic headphones designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop&auto=format",
    "basePrice": 95,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 0,
    "rating": 4.9,
    "reviewCount": 290,
    "discount": null
  },
  {
    "id": "PROD-092",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Eco Boots",
    "description": "High-quality eco boots designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=400&h=400&fit=crop&auto=format",
    "basePrice": 49,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 16,
    "rating": 4.1,
    "reviewCount": 102,
    "discount": null
  },
  {
    "id": "PROD-093",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Smart Cushion",
    "description": "High-quality smart cushion designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&auto=format",
    "basePrice": 173,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 0,
    "rating": 5,
    "reviewCount": 342,
    "discount": null
  },
  {
    "id": "PROD-094",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Classic Perfume",
    "description": "High-quality classic perfume designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1567538096630-e1a464891c37?w=400&h=400&fit=crop&auto=format",
    "basePrice": 103,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 55,
    "rating": 4.6,
    "reviewCount": 220,
    "discount": null
  },
  {
    "id": "PROD-095",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Pro Backpack",
    "description": "High-quality pro backpack designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1566958769312-82cef57c2b53?w=400&h=400&fit=crop&auto=format",
    "basePrice": 272,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 0,
    "rating": 4.9,
    "reviewCount": 60,
    "discount": {
      "type": "fixed",
      "value": 68,
      "expiresAt": "2026-06-28T23:46:04.565Z"
    }
  },
  {
    "id": "PROD-096",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Sleek Shoes",
    "description": "High-quality sleek shoes designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1608666634759-4376e6a45e49?w=400&h=400&fit=crop&auto=format",
    "basePrice": 249,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 3,
    "rating": 4.2,
    "reviewCount": 389,
    "discount": null
  },
  {
    "id": "PROD-097",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Modern Novel",
    "description": "High-quality modern novel designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=400&fit=crop&auto=format",
    "basePrice": 63,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 14,
    "rating": 4,
    "reviewCount": 450,
    "discount": null
  },
  {
    "id": "PROD-098",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Ultra Speaker",
    "description": "High-quality ultra speaker designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop&auto=format",
    "basePrice": 126,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 18,
    "rating": 3.8,
    "reviewCount": 142,
    "discount": {
      "type": "fixed",
      "value": 41,
      "expiresAt": "2026-06-29T16:59:51.357Z"
    }
  },
  {
    "id": "PROD-099",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Premium Sneakers",
    "description": "High-quality premium sneakers designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?w=400&h=400&fit=crop&auto=format",
    "basePrice": 27,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 0,
    "rating": 4.8,
    "reviewCount": 171,
    "discount": null
  },
  {
    "id": "PROD-100",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Classic Chair",
    "description": "High-quality classic chair designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format",
    "basePrice": 76,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 51,
    "rating": 4.4,
    "reviewCount": 155,
    "discount": null
  },
  {
    "id": "PROD-101",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Sleek Scrub",
    "description": "High-quality sleek scrub designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 115,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 2,
    "rating": 4.6,
    "reviewCount": 304,
    "discount": {
      "type": "fixed",
      "value": 34,
      "expiresAt": "2026-06-24T03:39:01.387Z"
    }
  },
  {
    "id": "PROD-102",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Ultra Wallet",
    "description": "High-quality ultra wallet designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop&auto=format",
    "basePrice": 220,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 0,
    "rating": 4.8,
    "reviewCount": 313,
    "discount": {
      "type": "percentage",
      "value": 15,
      "expiresAt": "2026-06-29T12:38:19.734Z"
    }
  },
  {
    "id": "PROD-103",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Eco Band",
    "description": "High-quality eco band designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format",
    "basePrice": 252,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 2,
    "rating": 3.9,
    "reviewCount": 330,
    "discount": null
  },
  {
    "id": "PROD-104",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Premium Folio",
    "description": "High-quality premium folio designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1552674605-db5f5d5e87b3?w=400&h=400&fit=crop&auto=format",
    "basePrice": 85,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 22,
    "rating": 4.8,
    "reviewCount": 26,
    "discount": null
  },
  {
    "id": "PROD-105",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Sleek Keyboard",
    "description": "High-quality sleek keyboard designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1549230405-9d98b1e2d3e4?w=400&h=400&fit=crop&auto=format",
    "basePrice": 254,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 45,
    "rating": 4.7,
    "reviewCount": 189,
    "discount": null
  },
  {
    "id": "PROD-106",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Pro Dress",
    "description": "High-quality pro dress designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 242,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 32,
    "rating": 3.5,
    "reviewCount": 298,
    "discount": null
  },
  {
    "id": "PROD-107",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Sleek Vase",
    "description": "High-quality sleek vase designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&auto=format",
    "basePrice": 294,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 0,
    "rating": 4.5,
    "reviewCount": 279,
    "discount": {
      "type": "percentage",
      "value": 36,
      "expiresAt": "2026-06-25T10:26:55.592Z"
    }
  },
  {
    "id": "PROD-108",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Elite Perfume",
    "description": "High-quality elite perfume designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=400&h=400&fit=crop&auto=format",
    "basePrice": 221,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 10,
    "rating": 4.4,
    "reviewCount": 369,
    "discount": {
      "type": "fixed",
      "value": 43,
      "expiresAt": "2026-06-24T22:18:44.125Z"
    }
  },
  {
    "id": "PROD-109",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Sleek Belt",
    "description": "High-quality sleek belt designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1556909173-fb89eb71bd03?w=400&h=400&fit=crop&auto=format",
    "basePrice": 36,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 29,
    "rating": 3.7,
    "reviewCount": 74,
    "discount": {
      "type": "percentage",
      "value": 22,
      "expiresAt": "2026-06-30T01:37:27.487Z"
    }
  },
  {
    "id": "PROD-110",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Pro Mat",
    "description": "High-quality pro mat designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1591561954555-607968c89040?w=400&h=400&fit=crop&auto=format",
    "basePrice": 23,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 45,
    "rating": 4.3,
    "reviewCount": 33,
    "discount": {
      "type": "fixed",
      "value": 9,
      "expiresAt": "2026-06-27T12:44:09.111Z"
    }
  },
  {
    "id": "PROD-111",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Classic Planner",
    "description": "High-quality classic planner designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop&auto=format",
    "basePrice": 256,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 1,
    "rating": 4.2,
    "reviewCount": 268,
    "discount": null
  },
  {
    "id": "PROD-112",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Smart Monitor",
    "description": "High-quality smart monitor designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&auto=format",
    "basePrice": 283,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 41,
    "rating": 4.8,
    "reviewCount": 96,
    "discount": {
      "type": "percentage",
      "value": 22,
      "expiresAt": "2026-06-23T23:54:51.848Z"
    }
  },
  {
    "id": "PROD-113",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Pro Coat",
    "description": "High-quality pro coat designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format",
    "basePrice": 252,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 2,
    "rating": 4.6,
    "reviewCount": 199,
    "discount": {
      "type": "percentage",
      "value": 32,
      "expiresAt": "2026-06-26T14:15:06.799Z"
    }
  },
  {
    "id": "PROD-114",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Modern Clock",
    "description": "High-quality modern clock designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1434389677669-e08b4cae3d87?w=400&h=400&fit=crop&auto=format",
    "basePrice": 162,
    "currency": "EUR",
    "category": "Home",
    "stockCount": 0,
    "rating": 3.6,
    "reviewCount": 56,
    "discount": null
  },
  {
    "id": "PROD-115",
    "vendorId": "VENDOR-002",
    "vendor": {
      "id": "VENDOR-002",
      "name": "TimeZone"
    },
    "name": "Classic Perfume",
    "description": "High-quality classic perfume designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1534353341-2hl9823j3mc?w=400&h=400&fit=crop&auto=format",
    "basePrice": 41,
    "currency": "EUR",
    "category": "Beauty",
    "stockCount": 3,
    "rating": 4.7,
    "reviewCount": 122,
    "discount": {
      "type": "fixed",
      "value": 8,
      "expiresAt": "2026-06-28T03:36:55.496Z"
    }
  },
  {
    "id": "PROD-116",
    "vendorId": "VENDOR-003",
    "vendor": {
      "id": "VENDOR-003",
      "name": "StepUp"
    },
    "name": "Eco Belt",
    "description": "High-quality eco belt designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1596462502278-27bfdc403a5e?w=400&h=400&fit=crop&auto=format",
    "basePrice": 23,
    "currency": "EUR",
    "category": "Accessories",
    "stockCount": 0,
    "rating": 3.6,
    "reviewCount": 445,
    "discount": {
      "type": "percentage",
      "value": 12,
      "expiresAt": "2026-06-26T23:59:54.772Z"
    }
  },
  {
    "id": "PROD-117",
    "vendorId": "VENDOR-004",
    "vendor": {
      "id": "VENDOR-004",
      "name": "BagHub"
    },
    "name": "Ultra Bottle",
    "description": "High-quality ultra bottle designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1606318005154-a401ec7fba18?w=400&h=400&fit=crop&auto=format",
    "basePrice": 42,
    "currency": "EUR",
    "category": "Sports",
    "stockCount": 27,
    "rating": 4.9,
    "reviewCount": 202,
    "discount": null
  },
  {
    "id": "PROD-118",
    "vendorId": "VENDOR-005",
    "vendor": {
      "id": "VENDOR-005",
      "name": "HomeNest"
    },
    "name": "Eco Novel",
    "description": "High-quality eco novel designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format",
    "basePrice": 248,
    "currency": "EUR",
    "category": "Books",
    "stockCount": 0,
    "rating": 4.2,
    "reviewCount": 486,
    "discount": null
  },
  {
    "id": "PROD-119",
    "vendorId": "VENDOR-006",
    "vendor": {
      "id": "VENDOR-006",
      "name": "BeautyLab"
    },
    "name": "Modern Headphones",
    "description": "High-quality modern headphones designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&auto=format",
    "basePrice": 254,
    "currency": "EUR",
    "category": "Electronics",
    "stockCount": 0,
    "rating": 4.2,
    "reviewCount": 263,
    "discount": {
      "type": "fixed",
      "value": 10,
      "expiresAt": "2026-06-25T03:51:51.315Z"
    }
  },
  {
    "id": "PROD-120",
    "vendorId": "VENDOR-001",
    "vendor": {
      "id": "VENDOR-001",
      "name": "TechWorld"
    },
    "name": "Pro Jacket",
    "description": "High-quality pro jacket designed for maximum performance and style. Made with premium materials.",
    "imageUrl": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&auto=format",
    "basePrice": 297,
    "currency": "EUR",
    "category": "Fashion",
    "stockCount": 10,
    "rating": 4.6,
    "reviewCount": 99,
    "discount": null
  }
];

const unsplashIds: Record<string, string> = {
  "PROD-001": "photo-1505740420928-5e560c06d30e", // headphones
  "PROD-002": "photo-1523275335684-37898b6baf30", // smart watch
  "PROD-003": "photo-1542291026-7eec264c27ff", // running shoes
  "PROD-004": "photo-1553062407-98eeb64c6a62", // backpack
  "PROD-005": "photo-1609592424109-dd9892f1b177", // power bank
};

const categoryUnsplashIds: Record<string, string[]> = {
  "Electronics": [
    "photo-1526738549149-8e07eca6c147",
    "photo-1546868871-7041f2a55e12",
    "photo-1563206767-5b18f218e8de",
    "photo-1588508065123-287b28e013da"
  ],
  "Fashion": [
    "photo-1483985988355-763728e1935b",
    "photo-1539109136881-3be0616acf4b",
    "photo-1515886657613-9f3515b0c78f",
    "photo-1434389677669-e08b4cac3105"
  ],
  "Accessories": [
    "photo-1523275335684-37898b6baf30",
    "photo-1535632066927-ab7c9ab60908",
    "photo-1617038260897-41a1f14a8ca0",
    "photo-1584308666744-24d5c474f2ae"
  ],
  "Home": [
    "photo-1513694203232-719a280e022f",
    "photo-1505691938895-1758d7feb511",
    "photo-1586023492125-27b2c045efd7",
    "photo-1538688525198-9b88f6f53126"
  ],
  "Beauty": [
    "photo-1522335789203-aabd1fc54bc9",
    "photo-1596462502278-27bfdc403348",
    "photo-1608248597481-496100c8c836",
    "photo-1512496015851-a90fb38ba796"
  ],
  "Sports": [
    "photo-1461896836934-ffe607ba8211",
    "photo-1517838277536-f5f99be501cd",
    "photo-1571019613454-1cb2f99b2d8b",
    "photo-1584735935682-2f2b69dff9d2"
  ],
  "Books": [
    "photo-1544947950-fa07a98d237f",
    "photo-1512820790803-83ca734da794",
    "photo-1497633762265-9d179a990aa6",
    "photo-1506880018603-83d5b814b5a6"
  ]
};

// Dynamically replace deprecated Unsplash source URLs with working seed URLs from Unsplash,
// and refresh discount expiry timestamps relative to app start time.
products.forEach((p, idx) => {
  let photoId = unsplashIds[p.id];
  if (!photoId) {
    const nameLower = p.name.toLowerCase();
    if (nameLower.includes("shirt") || nameLower.includes("coat") || nameLower.includes("jacket")) {
      photoId = "photo-1591047139829-d91aecb6caea"; // jacket / coat
    } else if (nameLower.includes("watch")) {
      photoId = "photo-1523275335684-37898b6baf30"; // watch
    } else if (nameLower.includes("shoes") || nameLower.includes("sneakers")) {
      photoId = "photo-1549298916-b41d501d3772"; // shoes
    } else if (nameLower.includes("backpack") || nameLower.includes("bag")) {
      photoId = "photo-1553062407-98eeb64c6a62"; // backpack
    } else if (nameLower.includes("headphones")) {
      photoId = "photo-1505740420928-5e560c06d30e"; // headphones
    } else if (nameLower.includes("keyboard")) {
      photoId = "photo-1587829741301-dc798b83add3"; // keyboard
    } else if (nameLower.includes("camera")) {
      photoId = "photo-1516035069371-29a1b244cc32"; // camera
    } else if (nameLower.includes("lamp") || nameLower.includes("cushion") || nameLower.includes("chair") || nameLower.includes("mirror") || nameLower.includes("clock")) {
      photoId = "photo-1507473885765-e6ed057f782c"; // home items
    } else if (nameLower.includes("cleanser") || nameLower.includes("cream") || nameLower.includes("mask") || nameLower.includes("perfume")) {
      photoId = "photo-1556228720-195a672e8a03"; // beauty
    } else {
      const catList = categoryUnsplashIds[p.category] || categoryUnsplashIds["Electronics"];
      photoId = catList[idx % catList.length];
    }
  }
  p.imageUrl = `https://images.unsplash.com/${photoId}?w=400&h=400&fit=crop&q=80`;

  if (p.discount) {
    const minutesOffset = [3, 10, 30, 90, 240, 720, 1440][idx % 7];
    p.discount.expiresAt = new Date(Date.now() + minutesOffset * 60 * 1000).toISOString();
  }
});

let orders: MasterOrder[] = [];

export const database = {
  getProducts: () => products,
  getProductById: (id: string) => products.find(p => p.id === id),
  updateProductStock: (id: string, newStock: number) => {
    const product = products.find(p => p.id === id);
    if (product) {
      product.stockCount = newStock;
    }
  },
  getOrders: () => orders,
  getOrderById: (id: string) => orders.find(o => o.masterOrderId === id),
  saveOrder: (order: MasterOrder) => {
    const existingIndex = orders.findIndex(o => o.masterOrderId === order.masterOrderId);
    if (existingIndex >= 0) {
      orders[existingIndex] = order;
    } else {
      orders.push(order);
    }
  }
};
