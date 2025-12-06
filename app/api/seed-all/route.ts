import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

// 17 Categories (8 old + 9 new)
const categories = [
  {
    title: "Smartphones",
    slug: "smartphones",
    description: "Latest smartphones and mobile devices",
  },
  {
    title: "Laptops",
    slug: "laptops",
    description: "Powerful laptops for work and gaming",
  },
  {
    title: "Headphones",
    slug: "headphones",
    description: "Premium audio headphones and earbuds",
  },
  {
    title: "Cameras",
    slug: "cameras",
    description: "Professional cameras and photography gear",
    imageUrl: "https://images.unsplash.com/photo-1606765962248-7ff407b51667?w=800&q=80",
  },
  {
    title: "Gaming",
    slug: "gaming",
    description: "Gaming consoles and accessories",
  },
  {
    title: "Wearables",
    slug: "wearables",
    description: "Smartwatches and fitness trackers",
  },
  {
    title: "Television",
    slug: "television",
    description: "Smart TVs and home entertainment",
  },
  {
    title: "Home Appliances",
    slug: "home-appliances",
    description: "Modern home appliances",
  },
  // New categories
  {
    title: "Air Conditioners",
    slug: "air-conditioners",
    description: "Cooling and heating solutions",
  },
  {
    title: "Appliances",
    slug: "appliances",
    description: "Essential home and office appliances",
  },
  {
    title: "Kitchen Appliances",
    slug: "kitchen-appliances",
    description: "Modern kitchen equipment",
  },
  {
    title: "Refrigerators",
    slug: "refrigerators",
    description: "Refrigerators and cooling appliances",
  },
  {
    title: "Smart Watches",
    slug: "smart-watches",
    description: "Smart watches and fitness bands",
  },
  {
    title: "Tablets",
    slug: "tablets",
    description: "Tablets and portable computing devices",
  },
  {
    title: "Washing Machines",
    slug: "washing-machines",
    description: "Washing machines and laundry solutions",
  },
  {
    title: "Gadget Accessories",
    slug: "gadget-accessories",
    description: "Accessories for all your gadgets",
  },
  {
    title: "Airbuds",
    slug: "airbuds",
    description: "Premium wireless earbuds and audio accessories",
  },
];

// 12 Brands with logo URLs from Unsplash
const brands = [
  {
    title: "Apple",
    slug: "apple",
    imageUrl: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=200&h=200&fit=crop",
  },
  {
    title: "Samsung",
    slug: "samsung",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop",
  },
  {
    title: "Sony",
    slug: "sony",
    imageUrl: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200&h=200&fit=crop",
  },
  {
    title: "LG",
    slug: "lg",
    imageUrl: "https://images.unsplash.com/photo-1631541058374-5a8e5fbb4235?w=200&h=200&fit=crop",
  },
  {
    title: "Dell",
    slug: "dell",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop",
  },
  {
    title: "Bose",
    slug: "bose",
    imageUrl: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
  },
  {
    title: "Canon",
    slug: "canon",
    imageUrl: "https://images.unsplash.com/photo-1606986628126-eb86b92e8231?w=200&h=200&fit=crop",
  },
  {
    title: "Microsoft",
    slug: "microsoft",
    imageUrl: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200&h=200&fit=crop",
  },
  {
    title: "Daikin",
    slug: "daikin",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=200&fit=crop",
  },
  {
    title: "Whirlpool",
    slug: "whirlpool",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
  },
  {
    title: "Bosch",
    slug: "bosch",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&h=200&fit=crop",
  },
  {
    title: "JBL",
    slug: "jbl",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
  },
];

// New products for 9 new categories (10 each = 90 products)
const newProducts = [
  // AIR CONDITIONERS (10 products)
  {
    name: "Daikin 1.5 Ton 5 Star Inverter AC",
    price: 799,
    discount: 15,
    category: "air-conditioners",
    brand: "daikin",
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    isHot: true,
  },
  {
    name: "LG 2 Ton 3 Star Dual Inverter AC",
    price: 899,
    discount: 20,
    category: "air-conditioners",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1631545806609-66b1a1a7a5bc?w=800&q=80",
    isHot: true,
  },
  {
    name: "Samsung WindFree AC 1.5 Ton",
    price: 749,
    discount: 12,
    category: "air-conditioners",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=800&q=80",
    isHot: false,
  },
  {
    name: "Carrier 1 Ton 5 Star Inverter AC",
    price: 599,
    discount: 10,
    category: "air-conditioners",
    brand: "daikin",
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    isHot: false,
  },
  {
    name: "Voltas 1.5 Ton 3 Star AC",
    price: 449,
    discount: 18,
    category: "air-conditioners",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    isHot: false,
  },
  {
    name: "Blue Star 2 Ton Inverter AC",
    price: 999,
    discount: 8,
    category: "air-conditioners",
    brand: "daikin",
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    isHot: false,
  },
  {
    name: "Hitachi 1.5 Ton Window AC",
    price: 549,
    discount: 15,
    category: "air-conditioners",
    brand: "lg",
    imageUrl:
      "https://m.media-amazon.com/images/I/814PeethJHL._SL1500_.jpg",
    isHot: false,
  },
  {
    name: "Panasonic 1 Ton 5 Star AC",
    price: 649,
    discount: 10,
    category: "air-conditioners",
    brand: "daikin",
    imageUrl:
      "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=800&q=80",
    isHot: false,
  },
  {
    name: "Godrej 1.5 Ton Inverter AC",
    price: 579,
    discount: 12,
    category: "air-conditioners",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    isHot: false,
  },
  {
    name: "Haier 2 Ton Smart AC",
    price: 849,
    discount: 20,
    category: "air-conditioners",
    brand: "daikin",
    imageUrl:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    isHot: false,
  },

  // AIR BUDS (10 products)
  {
    name: "Apple AirPods Pro 2nd Gen",
    price: 249,
    discount: 15,
    category: "air-buds",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    isHot: true,
  },
  {
    name: "Samsung Galaxy Buds2 Pro",
    price: 199,
    discount: 20,
    category: "air-buds",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    isHot: true,
  },
  {
    name: "Sony WF-1000XM5",
    price: 279,
    discount: 10,
    category: "air-buds",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80",
    isHot: false,
  },
  {
    name: "JBL Tour Pro 2",
    price: 229,
    discount: 12,
    category: "air-buds",
    brand: "jbl",
    imageUrl:
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&q=80",
    isHot: false,
  },
  {
    name: "Bose QuietComfort Earbuds II",
    price: 299,
    discount: 8,
    category: "air-buds",
    brand: "bose",
    imageUrl:
      "https://images.unsplash.com/photo-1631867675167-90a456a90863?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple AirPods 3rd Gen",
    price: 179,
    discount: 10,
    category: "air-buds",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80",
    isHot: false,
  },
  {
    name: "Samsung Galaxy Buds FE",
    price: 99,
    discount: 15,
    category: "air-buds",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    isHot: false,
  },
  {
    name: "Jabra Elite 85t",
    price: 229,
    discount: 18,
    category: "air-buds",
    brand: "jbl",
    imageUrl:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    isHot: false,
  },
  {
    name: "Sennheiser Momentum True Wireless 3",
    price: 249,
    discount: 12,
    category: "air-buds",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80",
    isHot: false,
  },
  {
    name: "Beats Fit Pro",
    price: 199,
    discount: 10,
    category: "air-buds",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&q=80",
    isHot: false,
  },

  // APPLIANCES (10 products)
  {
    name: "Dyson V15 Detect Cordless Vacuum",
    price: 749,
    discount: 15,
    category: "appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80",
    isHot: true,
  },
  {
    name: "iRobot Roomba j9+ Robot Vacuum",
    price: 1099,
    discount: 20,
    category: "appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    isHot: true,
  },
  {
    name: "Philips Air Purifier AC1215",
    price: 299,
    discount: 12,
    category: "appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    isHot: false,
  },
  {
    name: "Honeywell Air Cooler CL48PM",
    price: 249,
    discount: 10,
    category: "appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=800&q=80",
    isHot: false,
  },
  {
    name: "Eureka Forbes Aquaguard Aura",
    price: 349,
    discount: 15,
    category: "appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    isHot: false,
  },
  {
    name: "Kent Pearl Mineral RO Water",
    price: 279,
    discount: 8,
    category: "appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    isHot: false,
  },
  {
    name: "Xiaomi Robot Vacuum X10+",
    price: 599,
    discount: 18,
    category: "appliances",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    isHot: false,
  },
  {
    name: "Shark Navigator Vacuum NV352",
    price: 199,
    discount: 10,
    category: "appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80",
    isHot: false,
  },
  {
    name: "Coway Air Mega 400S",
    price: 549,
    discount: 12,
    category: "appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    isHot: false,
  },
  {
    name: "Levoit Core 300S Air Purifier",
    price: 149,
    discount: 15,
    category: "appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=800&q=80",
    isHot: false,
  },

  // KITCHEN APPLIANCES (10 products)
  {
    name: "Ninja Foodi 9-in-1 Air Fryer",
    price: 249,
    discount: 20,
    category: "kitchen-appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80",
    isHot: true,
  },
  {
    name: "KitchenAid Artisan Stand Mixer",
    price: 449,
    discount: 15,
    category: "kitchen-appliances",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=800&q=80",
    isHot: true,
  },
  {
    name: "Instant Pot Duo Plus 9-in-1",
    price: 129,
    discount: 25,
    category: "kitchen-appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80",
    isHot: false,
  },
  {
    name: "Breville Barista Express Espresso",
    price: 699,
    discount: 10,
    category: "kitchen-appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80",
    isHot: false,
  },
  {
    name: "Vitamix E310 Explorian Blender",
    price: 349,
    discount: 12,
    category: "kitchen-appliances",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80",
    isHot: false,
  },
  {
    name: "Cuisinart 14-Cup Food Processor",
    price: 249,
    discount: 15,
    category: "kitchen-appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    isHot: false,
  },
  {
    name: "De'Longhi Magnifica Evo",
    price: 799,
    discount: 8,
    category: "kitchen-appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80",
    isHot: false,
  },
  {
    name: "Philips Premium Airfryer XXL",
    price: 299,
    discount: 18,
    category: "kitchen-appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80",
    isHot: false,
  },
  {
    name: "Nespresso Vertuo Next Coffee",
    price: 179,
    discount: 10,
    category: "kitchen-appliances",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80",
    isHot: false,
  },
  {
    name: "Hamilton Beach Toaster Oven",
    price: 89,
    discount: 20,
    category: "kitchen-appliances",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    isHot: false,
  },

  // REFRIGERATORS (10 products)
  {
    name: "Samsung Bespoke 4-Door Flex",
    price: 2999,
    discount: 15,
    category: "refrigerators",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
    isHot: true,
  },
  {
    name: "LG InstaView Door-in-Door",
    price: 2499,
    discount: 20,
    category: "refrigerators",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
    isHot: true,
  },
  {
    name: "Whirlpool 36 French Door",
    price: 1999,
    discount: 12,
    category: "refrigerators",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
    isHot: false,
  },
  {
    name: "GE Profile Smart Refrigerator",
    price: 2799,
    discount: 10,
    category: "refrigerators",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
    isHot: false,
  },
  {
    name: "Frigidaire Gallery Side-by-Side",
    price: 1599,
    discount: 18,
    category: "refrigerators",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
    isHot: false,
  },
  {
    name: "Bosch 800 Series French Door",
    price: 3299,
    discount: 8,
    category: "refrigerators",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
    isHot: false,
  },
  {
    name: "KitchenAid Counter-Depth Fridge",
    price: 2199,
    discount: 15,
    category: "refrigerators",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
    isHot: false,
  },
  {
    name: "Haier Quad Door Refrigerator",
    price: 1799,
    discount: 10,
    category: "refrigerators",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
    isHot: false,
  },
  {
    name: "Maytag Top Freezer Refrigerator",
    price: 999,
    discount: 12,
    category: "refrigerators",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
    isHot: false,
  },
  {
    name: "Hisense French Door Smart",
    price: 1399,
    discount: 20,
    category: "refrigerators",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
    isHot: false,
  },

  // SMART WATCHES (10 products)
  {
    name: "Apple Watch Series 9 GPS",
    price: 399,
    discount: 15,
    category: "smart-watches",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80",
    isHot: true,
  },
  {
    name: "Samsung Galaxy Watch 6 Classic",
    price: 429,
    discount: 20,
    category: "smart-watches",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    isHot: true,
  },
  {
    name: "Apple Watch Ultra 2",
    price: 799,
    discount: 10,
    category: "smart-watches",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    isHot: false,
  },
  {
    name: "Garmin Fenix 7X Sapphire Solar",
    price: 899,
    discount: 12,
    category: "smart-watches",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Google Pixel Watch 2",
    price: 349,
    discount: 15,
    category: "smart-watches",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    isHot: false,
  },
  {
    name: "Fitbit Sense 2 Advanced Health",
    price: 299,
    discount: 18,
    category: "smart-watches",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
    isHot: false,
  },
  {
    name: "Garmin Venu 3 AMOLED",
    price: 449,
    discount: 8,
    category: "smart-watches",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    isHot: false,
  },
  {
    name: "Amazfit GTR 4 Limited Edition",
    price: 199,
    discount: 10,
    category: "smart-watches",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple Watch SE 2nd Gen",
    price: 249,
    discount: 12,
    category: "smart-watches",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80",
    isHot: false,
  },
  {
    name: "TicWatch Pro 5 Enduro",
    price: 349,
    discount: 15,
    category: "smart-watches",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    isHot: false,
  },

  // TABLETS (10 products)
  {
    name: "Apple iPad Pro 12.9 M2",
    price: 1099,
    discount: 15,
    category: "tablets",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    isHot: true,
  },
  {
    name: "Samsung Galaxy Tab S9 Ultra",
    price: 1199,
    discount: 20,
    category: "tablets",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80",
    isHot: true,
  },
  {
    name: "Apple iPad Air 5th Gen",
    price: 599,
    discount: 10,
    category: "tablets",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80",
    isHot: false,
  },
  {
    name: "Microsoft Surface Pro 9",
    price: 999,
    discount: 12,
    category: "tablets",
    brand: "microsoft",
    imageUrl:
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&q=80",
    isHot: false,
  },
  {
    name: "Samsung Galaxy Tab S8+",
    price: 899,
    discount: 15,
    category: "tablets",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple iPad 10th Generation",
    price: 449,
    discount: 8,
    category: "tablets",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    isHot: false,
  },
  {
    name: "Lenovo Tab P12 Pro",
    price: 699,
    discount: 18,
    category: "tablets",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80",
    isHot: false,
  },
  {
    name: "OnePlus Pad",
    price: 479,
    discount: 10,
    category: "tablets",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple iPad Mini 6th Gen",
    price: 499,
    discount: 12,
    category: "tablets",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    isHot: false,
  },
  {
    name: "Amazon Fire Max 11",
    price: 229,
    discount: 20,
    category: "tablets",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80",
    isHot: false,
  },

  // WASHING MACHINES (10 products)
  {
    name: "LG WashTower with AI DD",
    price: 2199,
    discount: 15,
    category: "washing-machines",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    isHot: true,
  },
  {
    name: "Samsung Bespoke AI Washer",
    price: 1899,
    discount: 20,
    category: "washing-machines",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80",
    isHot: true,
  },
  {
    name: "Whirlpool Smart Front Load",
    price: 1299,
    discount: 12,
    category: "washing-machines",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Bosch 800 Series Compact",
    price: 1599,
    discount: 10,
    category: "washing-machines",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80",
    isHot: false,
  },
  {
    name: "GE Profile Smart UltraFast",
    price: 1999,
    discount: 15,
    category: "washing-machines",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Maytag Front Load Washer",
    price: 1099,
    discount: 18,
    category: "washing-machines",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Electrolux Perfect Steam",
    price: 1399,
    discount: 8,
    category: "washing-machines",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Speed Queen TR7 Top Loader",
    price: 1249,
    discount: 10,
    category: "washing-machines",
    brand: "hp",
    imageUrl:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Miele W1 Front-Load Washer",
    price: 1799,
    discount: 12,
    category: "washing-machines",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Haier Washer Dryer Combo",
    price: 999,
    discount: 20,
    category: "washing-machines",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80",
    isHot: false,
  },

  // GADGET ACCESSORIES (10 products)
  {
    name: "Anker 737 Power Bank 24000mAh",
    price: 149,
    discount: 15,
    category: "gadget-accessories",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    isHot: true,
  },
  {
    name: "Apple MagSafe Charger",
    price: 39,
    discount: 10,
    category: "gadget-accessories",
    brand: "apple",
    imageUrl:
      "https://images.news18.com/ibnlive/uploads/2023/05/apple-magsafe-16854277873x2.jpg?impolicy=website&width=640&height=480",
    isHot: true,
  },
  {
    name: "Samsung 45W Travel Adapter",
    price: 49,
    discount: 20,
    category: "gadget-accessories",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    isHot: false,
  },
  {
    name: "Belkin 3-in-1 MagSafe Stand",
    price: 149,
    discount: 12,
    category: "gadget-accessories",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    isHot: false,
  },
  {
    name: "Logitech MX Master 3S Mouse",
    price: 99,
    discount: 15,
    category: "gadget-accessories",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple Magic Keyboard",
    price: 299,
    discount: 8,
    category: "gadget-accessories",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    isHot: false,
  },
  {
    name: "SanDisk Extreme Pro 1TB SSD",
    price: 129,
    discount: 18,
    category: "gadget-accessories",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80",
    isHot: false,
  },
  {
    name: "Spigen Armor Case iPhone 15",
    price: 29,
    discount: 10,
    category: "gadget-accessories",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
    isHot: false,
  },
  {
    name: "Razer BlackWidow V4 Keyboard",
    price: 169,
    discount: 12,
    category: "gadget-accessories",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    isHot: false,
  },
  {
    name: "JBL Flip 6 Bluetooth Speaker",
    price: 129,
    discount: 15,
    category: "gadget-accessories",
    brand: "jbl",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    isHot: false,
  },
  // AIRBUDS (10 products - 2 hot deals)
  {
    name: "Apple AirPods Pro 2nd Gen",
    price: 249,
    discount: 20,
    category: "airbuds",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    isHot: true,
  },
  {
    name: "Samsung Galaxy Buds2 Pro",
    price: 199,
    discount: 25,
    category: "airbuds",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    isHot: true,
  },
  {
    name: "Sony WF-1000XM5 Earbuds",
    price: 279,
    discount: 15,
    category: "airbuds",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple AirPods 3rd Generation",
    price: 179,
    discount: 12,
    category: "airbuds",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&q=80",
    isHot: false,
  },
  {
    name: "Sony LinkBuds S",
    price: 199,
    discount: 18,
    category: "airbuds",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    isHot: false,
  },
  {
    name: "Samsung Galaxy Buds FE",
    price: 99,
    discount: 10,
    category: "airbuds",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple AirPods Max",
    price: 549,
    discount: 8,
    category: "airbuds",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=800&q=80",
    isHot: false,
  },
  {
    name: "Sony WF-C700N Earbuds",
    price: 119,
    discount: 15,
    category: "airbuds",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80",
    isHot: false,
  },
  {
    name: "Samsung Galaxy Buds Live",
    price: 149,
    discount: 20,
    category: "airbuds",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple AirPods 2nd Gen",
    price: 129,
    discount: 10,
    category: "airbuds",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&q=80",
    isHot: false,
  },
];

// 11 Blog Posts
const blogs = [
  {
    title: "Top 10 Smartphones of 2024: A Complete Guide",
    slug: "top-smartphones-2024",
    excerpt:
      "Discover the best smartphones that will dominate the market in 2024. From flagship killers to budget-friendly options.",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
  },
  {
    title: "How to Choose the Perfect Laptop for Your Needs",
    slug: "choose-perfect-laptop",
    excerpt:
      "Whether you're a student, professional, or gamer, find out which laptop specifications matter most for your use case.",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
  },
  {
    title: "Smart Home Revolution: Essential Gadgets for 2024",
    slug: "smart-home-gadgets-2024",
    excerpt:
      "Transform your living space with these must-have smart home devices that offer convenience and energy savings.",
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
  },
  {
    title: "The Ultimate Guide to Wireless Earbuds",
    slug: "wireless-earbuds-guide",
    excerpt:
      "Compare the best wireless earbuds on the market, from AirPods to Galaxy Buds and beyond.",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
  },
  {
    title: "Gaming Console Wars: PS5 vs Xbox Series X",
    slug: "ps5-vs-xbox-series-x",
    excerpt:
      "An in-depth comparison of the two leading gaming consoles to help you make the right choice.",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
  },
  {
    title: "Best Kitchen Appliances to Upgrade Your Cooking",
    slug: "best-kitchen-appliances",
    excerpt:
      "From air fryers to smart ovens, these kitchen gadgets will revolutionize your cooking experience.",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    title: "Smartwatch Buying Guide: Features That Matter",
    slug: "smartwatch-buying-guide",
    excerpt:
      "Learn what features to look for when buying a smartwatch and find the perfect one for your lifestyle.",
    imageUrl:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80",
  },
  {
    title: "Energy-Efficient Refrigerators: Save Money and the Planet",
    slug: "energy-efficient-refrigerators",
    excerpt:
      "Discover how modern refrigerators can reduce your electricity bills while keeping your food fresh longer.",
    imageUrl:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
  },
  {
    title: "The Future of Tablets: What to Expect in 2025",
    slug: "future-of-tablets-2025",
    excerpt:
      "Explore upcoming tablet innovations and how they'll change the way we work and play.",
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
  },
  {
    title: "Air Conditioner Maintenance Tips for Summer",
    slug: "ac-maintenance-tips",
    excerpt:
      "Keep your AC running efficiently all summer with these essential maintenance tips.",
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
  },
  {
    title: "Must-Have Gadget Accessories for Tech Enthusiasts",
    slug: "gadget-accessories-guide",
    excerpt:
      "From power banks to premium cases, these accessories will enhance your tech experience.",
    imageUrl:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
  },
];

export async function GET() {
  try {
    console.log("=== Starting Complete Database Seed (New Categories + Blogs) ===");
    
    // Helper function to upload image from URL to Sanity
    const uploadImageFromUrl = async (imageUrl: string, fileName: string) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const asset = await backendClient.assets.upload('image', blob, {
          filename: fileName,
        });
        return asset;
      } catch (error) {
        console.error(`Failed to upload image ${fileName}:`, error);
        return null;
      }
    };

    // Step 1: Create/update categories
    console.log("Step 1: Creating categories...");
    const categoryRefs: Record<string, string> = {};
    for (const cat of categories) {
      const existing = await backendClient.fetch(
        `*[_type == "category" && slug.current == $slug][0]{ _id, image }`,
        { slug: cat.slug }
      );
      if (existing) {
        categoryRefs[cat.slug] = existing._id;
        console.log(`Category exists: ${cat.title}`);
        
        // Update category with image if it doesn't have one
        if (!existing.image && cat.imageUrl) {
          console.log(`Updating ${cat.title} with image...`);
          const imageAsset = await uploadImageFromUrl(
            cat.imageUrl,
            `${cat.slug}-image`
          );
          if (imageAsset) {
            await backendClient
              .patch(existing._id)
              .set({
                image: {
                  _type: "image",
                  asset: {
                    _type: "reference",
                    _ref: imageAsset._id,
                  },
                },
              })
              .commit();
            console.log(`✓ Image added to ${cat.title}`);
          }
        }
      } else {
        let imageAsset = null;
        if (cat.imageUrl) {
          imageAsset = await uploadImageFromUrl(
            cat.imageUrl,
            `${cat.slug}-image`
          );
        }
        
        const doc = await backendClient.create({
          _type: "category",
          title: cat.title,
          slug: { _type: "slug", current: cat.slug },
          description: cat.description,
          ...(imageAsset && {
            image: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageAsset._id,
              },
            },
          }),
        });
        categoryRefs[cat.slug] = doc._id;
        console.log(`Created category: ${cat.title}${imageAsset ? " with image" : ""}`);
      }
    }

    // Step 2: Create/update brands
    console.log("Step 2: Creating brands with logos...");
    const brandRefs: Record<string, string> = {};
    for (const brand of brands) {
      const existing = await backendClient.fetch(
        `*[_type == "brand" && slug.current == $slug][0]{ _id, image }`,
        { slug: brand.slug }
      );
      
      if (existing) {
        brandRefs[brand.slug] = existing._id;
        
        // Update brand with image if it doesn't have one
        if (!existing.image && brand.imageUrl) {
          console.log(`Updating ${brand.title} with logo...`);
          const imageAsset = await uploadImageFromUrl(
            brand.imageUrl,
            `${brand.slug}-logo.svg`
          );
          
          if (imageAsset) {
            await backendClient
              .patch(existing._id)
              .set({
                image: {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: imageAsset._id,
                  },
                },
              })
              .commit();
            console.log(`Updated brand with logo: ${brand.title}`);
          }
        } else {
          console.log(`Brand exists: ${brand.title}`);
        }
      } else {
        // Create new brand with image
        console.log(`Creating ${brand.title} with logo...`);
        let imageAsset = null;
        
        if (brand.imageUrl) {
          imageAsset = await uploadImageFromUrl(
            brand.imageUrl,
            `${brand.slug}-logo.svg`
          );
        }
        
        const brandData: {
          _type: string;
          title: string;
          slug: { _type: string; current: string };
          image?: { _type: string; asset: { _type: string; _ref: string } };
        } = {
          _type: "brand",
          title: brand.title,
          slug: { _type: "slug", current: brand.slug },
        };
        if (imageAsset) {
          brandData.image = {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          };
        }
        
        const doc = await backendClient.create(brandData);
        brandRefs[brand.slug] = doc._id;
        console.log(`Created brand: ${brand.title}`);
      }
    }

    // Step 3: Create new products for new categories
    console.log("Step 3: Creating products for new categories...");
    let createdCount = 0;
    let hotDealsCount = 0;

    for (const product of newProducts) {
      // Check if product already exists
      const existingProduct = await backendClient.fetch(
        `*[_type == "product" && name == $name][0]._id`,
        { name: product.name }
      );

      if (existingProduct) {
        console.log(`Product exists: ${product.name}`);
        continue;
      }

      const slug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, "");
      const status = product.isHot
        ? "sale"
        : ["new", "hot", "sale"][Math.floor(Math.random() * 3)];

      // Determine variant based on category
      let variant = "others";
      const category = product.category.toLowerCase();
      
      if (["smartphones", "laptops", "cameras", "gaming", "wearables", "smart-watches", "tablets", "headphones", "airbuds", "gadget-accessories"].includes(category)) {
        variant = "gadget";
      } else if (["air-conditioners", "washing-machines", "kitchen-appliances", "home-appliances", "appliances"].includes(category)) {
        variant = "appliances";
      } else if (["refrigerators"].includes(category)) {
        variant = "refrigerators";
      } else if (["television"].includes(category)) {
        variant = "gadget";
      }

      const productDoc = {
        _type: "product",
        name: product.name,
        slug: { _type: "slug", current: slug },
        description: `Premium ${product.name} - High quality product with excellent features and modern design. Perfect for your everyday needs.`,
        price: product.price,
        discount: product.discount,
        stock: Math.floor(Math.random() * 100) + 20,
        categories: [
          {
            _type: "reference",
            _ref: categoryRefs[product.category],
            _key: `cat-${Date.now()}-${Math.random()}`,
          },
        ],
        brand: { _type: "reference", _ref: brandRefs[product.brand] },
        status: status,
        variant: variant,
        isFeatured: product.isHot,
        imageUrl: product.imageUrl,
      };

      await backendClient.create(productDoc);
      createdCount++;
      if (product.isHot) hotDealsCount++;
      console.log(
        `Created: ${product.name}${product.isHot ? " [HOT DEAL]" : ""}`
      );
    }

    // Step 4: Create blog posts
    console.log("Step 4: Creating blog posts...");
    let blogCount = 0;

    // First, create an author if not exists
    let authorId = await backendClient.fetch(`*[_type == "author"][0]._id`);
    if (!authorId) {
      const author = await backendClient.create({
        _type: "author",
        name: "Shop Matrix Team",
        slug: { _type: "slug", current: "shop-matrix-team" },
        bio: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "The official Shop Matrix editorial team.",
              },
            ],
          },
        ],
      });
      authorId = author._id;
      console.log("Created author: Shop Matrix Team");
    }

    // Create a blog category if not exists
    let blogCategoryId = await backendClient.fetch(
      `*[_type == "blogcategory"][0]._id`
    );
    if (!blogCategoryId) {
      const blogCat = await backendClient.create({
        _type: "blogcategory",
        title: "Technology",
        slug: { _type: "slug", current: "technology" },
      });
      blogCategoryId = blogCat._id;
      console.log("Created blog category: Technology");
    }

    for (const blog of blogs) {
      const existing = await backendClient.fetch(
        `*[_type == "blog" && slug.current == $slug][0]._id`,
        { slug: blog.slug }
      );

      if (existing) {
        console.log(`Blog exists: ${blog.title}`);
        continue;
      }

      await backendClient.create({
        _type: "blog",
        title: blog.title,
        slug: { _type: "slug", current: blog.slug },
        author: { _type: "reference", _ref: authorId },
        blogcategories: [
          {
            _type: "reference",
            _ref: blogCategoryId,
            _key: `bc-${Date.now()}`,
          },
        ],
        publishedAt: new Date().toISOString(),
        isLatest: true,
        body: [
          {
            _type: "block",
            _key: `block-${Date.now()}`,
            style: "normal",
            children: [
              { _type: "span", _key: `span-${Date.now()}`, text: blog.excerpt },
            ],
          },
        ],
      });
      blogCount++;
      console.log(`Created blog: ${blog.title}`);
    }

    console.log("=== Seed Complete ===");

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      stats: {
        newCategories: categories.length,
        brands: Object.keys(brandRefs).length,
        newProducts: createdCount,
        hotDeals: hotDealsCount,
        blogs: blogCount,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
