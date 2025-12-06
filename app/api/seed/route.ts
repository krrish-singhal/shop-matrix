import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

// 8 Categories
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
];

// 8 Brands
const brands = [
  { title: "Apple", slug: "apple" },
  { title: "Samsung", slug: "samsung" },
  { title: "Sony", slug: "sony" },
  { title: "LG", slug: "lg" },
  { title: "Dell", slug: "dell" },
  { title: "Bose", slug: "bose" },
  { title: "Canon", slug: "canon" },
  { title: "Microsoft", slug: "microsoft" },
];

// 80 Products - 10 per category, first 2 of each category are HOT DEALS
// Using verified working Unsplash images
const products = [
  // SMARTPHONES (10 products) - first 2 are hot deals
  {
    name: "iPhone 15 Pro Max",
    price: 1199,
    discount: 15,
    category: "smartphones",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    isHot: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    discount: 20,
    category: "smartphones",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
    isHot: true,
  },
  {
    name: "Google Pixel 8 Pro",
    price: 999,
    discount: 10,
    category: "smartphones",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
    isHot: false,
  },
  {
    name: "OnePlus 12",
    price: 799,
    discount: 5,
    category: "smartphones",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    isHot: false,
  },
  {
    name: "Xiaomi 14 Ultra",
    price: 899,
    discount: 12,
    category: "smartphones",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
    isHot: false,
  },
  {
    name: "iPhone 15",
    price: 899,
    discount: 8,
    category: "smartphones",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
    isHot: false,
  },
  {
    name: "Samsung Galaxy Z Fold 5",
    price: 1799,
    discount: 10,
    category: "smartphones",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80",
    isHot: false,
  },
  {
    name: "Samsung Galaxy A54",
    price: 449,
    discount: 15,
    category: "smartphones",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80",
    isHot: false,
  },
  {
    name: "iPhone 14 Pro",
    price: 999,
    discount: 20,
    category: "smartphones",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80",
    isHot: false,
  },
  {
    name: "Motorola Edge 40",
    price: 599,
    discount: 10,
    category: "smartphones",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=800&q=80",
    isHot: false,
  },

  // LAPTOPS (10 products) - first 2 are hot deals
  {
    name: "MacBook Pro 16 M3 Max",
    price: 2499,
    discount: 10,
    category: "laptops",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    isHot: true,
  },
  {
    name: "Dell XPS 15",
    price: 1799,
    discount: 18,
    category: "laptops",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    isHot: true,
  },
  {
    name: "ASUS ROG Zephyrus G14",
    price: 1599,
    discount: 12,
    category: "laptops",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
    isHot: false,
  },
  {
    name: "HP Spectre x360",
    price: 1499,
    discount: 8,
    category: "laptops",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
    isHot: false,
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1899,
    discount: 15,
    category: "laptops",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    isHot: false,
  },
  {
    name: "MacBook Air M3",
    price: 1099,
    discount: 5,
    category: "laptops",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
    isHot: false,
  },
  {
    name: "Microsoft Surface Laptop 5",
    price: 1299,
    discount: 10,
    category: "laptops",
    brand: "microsoft",
    imageUrl:
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80",
    isHot: false,
  },
  {
    name: "Razer Blade 15",
    price: 2199,
    discount: 8,
    category: "laptops",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
    isHot: false,
  },
  {
    name: "Acer Swift 5",
    price: 1099,
    discount: 12,
    category: "laptops",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    isHot: false,
  },
  {
    name: "Dell Inspiron 16 Plus",
    price: 999,
    discount: 15,
    category: "laptops",
    brand: "dell",
    imageUrl:
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800&q=80",
    isHot: false,
  },

  // HEADPHONES (10 products) - first 2 are hot deals
  {
    name: "Sony WH-1000XM5",
    price: 349,
    discount: 20,
    category: "headphones",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    isHot: true,
  },
  {
    name: "Apple AirPods Max",
    price: 549,
    discount: 15,
    category: "headphones",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    isHot: true,
  },
  {
    name: "Bose QuietComfort Ultra",
    price: 429,
    discount: 10,
    category: "headphones",
    brand: "bose",
    imageUrl:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    isHot: false,
  },
  {
    name: "Sennheiser Momentum 4",
    price: 379,
    discount: 12,
    category: "headphones",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple AirPods Pro 2",
    price: 249,
    discount: 8,
    category: "headphones",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    isHot: false,
  },
  {
    name: "Beats Studio Pro",
    price: 349,
    discount: 15,
    category: "headphones",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    isHot: false,
  },
  {
    name: "JBL Tour One M2",
    price: 299,
    discount: 10,
    category: "headphones",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80",
    isHot: false,
  },
  {
    name: "Sony WF-1000XM5 Earbuds",
    price: 299,
    discount: 12,
    category: "headphones",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    isHot: false,
  },
  {
    name: "Bose 700 Headphones",
    price: 379,
    discount: 18,
    category: "headphones",
    brand: "bose",
    imageUrl:
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&q=80",
    isHot: false,
  },
  {
    name: "Audio-Technica ATH-M50x",
    price: 149,
    discount: 5,
    category: "headphones",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80",
    isHot: false,
  },

  // CAMERAS (10 products) - first 2 are hot deals
  {
    name: "Sony Alpha A7 IV",
    price: 2499,
    discount: 12,
    category: "cameras",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    isHot: true,
  },
  {
    name: "Canon EOS R6 Mark II",
    price: 2299,
    discount: 15,
    category: "cameras",
    brand: "canon",
    imageUrl:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
    isHot: true,
  },
  {
    name: "Nikon Z8",
    price: 3999,
    discount: 8,
    category: "cameras",
    brand: "canon",
    imageUrl:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&q=80",
    isHot: false,
  },
  {
    name: "GoPro Hero 12 Black",
    price: 399,
    discount: 10,
    category: "cameras",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
    isHot: false,
  },
  {
    name: "DJI Mavic 3 Pro Drone",
    price: 2199,
    discount: 5,
    category: "cameras",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    isHot: false,
  },
  {
    name: "Canon EOS R5",
    price: 3899,
    discount: 10,
    category: "cameras",
    brand: "canon",
    imageUrl:
      "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=800&q=80",
    isHot: false,
  },
  {
    name: "Fujifilm X-T5",
    price: 1699,
    discount: 12,
    category: "cameras",
    brand: "canon",
    imageUrl:
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&q=80",
    isHot: false,
  },
  {
    name: "Sony ZV-E10",
    price: 699,
    discount: 15,
    category: "cameras",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&q=80",
    isHot: false,
  },
  {
    name: "DJI Mini 3 Pro",
    price: 759,
    discount: 8,
    category: "cameras",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80",
    isHot: false,
  },
  {
    name: "Panasonic Lumix GH6",
    price: 2199,
    discount: 10,
    category: "cameras",
    brand: "canon",
    imageUrl:
      "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&q=80",
    isHot: false,
  },

  // GAMING (10 products) - first 2 are hot deals
  {
    name: "PlayStation 5",
    price: 499,
    discount: 10,
    category: "gaming",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
    isHot: true,
  },
  {
    name: "Xbox Series X",
    price: 499,
    discount: 15,
    category: "gaming",
    brand: "microsoft",
    imageUrl:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&q=80",
    isHot: true,
  },
  {
    name: "Nintendo Switch OLED",
    price: 349,
    discount: 8,
    category: "gaming",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&q=80",
    isHot: false,
  },
  {
    name: "Meta Quest 3",
    price: 499,
    discount: 5,
    category: "gaming",
    brand: "microsoft",
    imageUrl:
      "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&q=80",
    isHot: false,
  },
  {
    name: "Steam Deck OLED",
    price: 549,
    discount: 10,
    category: "gaming",
    brand: "microsoft",
    imageUrl:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80",
    isHot: false,
  },
  {
    name: "PlayStation VR2",
    price: 549,
    discount: 12,
    category: "gaming",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&q=80",
    isHot: false,
  },
  {
    name: "Xbox Elite Controller",
    price: 179,
    discount: 15,
    category: "gaming",
    brand: "microsoft",
    imageUrl:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80",
    isHot: false,
  },
  {
    name: "Razer Kishi V2",
    price: 99,
    discount: 10,
    category: "gaming",
    brand: "microsoft",
    imageUrl:
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=80",
    isHot: false,
  },
  {
    name: "SteelSeries Arctis Nova Pro",
    price: 349,
    discount: 8,
    category: "gaming",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=800&q=80",
    isHot: false,
  },
  {
    name: "Logitech G Pro X Superlight",
    price: 159,
    discount: 12,
    category: "gaming",
    brand: "microsoft",
    imageUrl:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80",
    isHot: false,
  },

  // WEARABLES (10 products) - first 2 are hot deals
  {
    name: "Apple Watch Ultra 2",
    price: 799,
    discount: 10,
    category: "wearables",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    isHot: true,
  },
  {
    name: "Samsung Galaxy Watch 6 Classic",
    price: 429,
    discount: 20,
    category: "wearables",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    isHot: true,
  },
  {
    name: "Garmin Fenix 7X Pro",
    price: 899,
    discount: 8,
    category: "wearables",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Fitbit Charge 6",
    price: 159,
    discount: 15,
    category: "wearables",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
    isHot: false,
  },
  {
    name: "Oura Ring Gen 3",
    price: 299,
    discount: 5,
    category: "wearables",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80",
    isHot: false,
  },
  {
    name: "Apple Watch Series 9",
    price: 399,
    discount: 10,
    category: "wearables",
    brand: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80",
    isHot: false,
  },
  {
    name: "Google Pixel Watch 2",
    price: 349,
    discount: 12,
    category: "wearables",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    isHot: false,
  },
  {
    name: "Garmin Venu 3",
    price: 449,
    discount: 8,
    category: "wearables",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    isHot: false,
  },
  {
    name: "Whoop 4.0",
    price: 239,
    discount: 10,
    category: "wearables",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&q=80",
    isHot: false,
  },
  {
    name: "Amazfit GTR 4",
    price: 199,
    discount: 15,
    category: "wearables",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80",
    isHot: false,
  },

  // TELEVISION (10 products) - first 2 are hot deals
  {
    name: "LG C3 OLED 65 inch",
    price: 1799,
    discount: 20,
    category: "television",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    isHot: true,
  },
  {
    name: "Samsung QN90C Neo QLED 55 inch",
    price: 1499,
    discount: 25,
    category: "television",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800&q=80",
    isHot: true,
  },
  {
    name: "Sony Bravia XR A95L OLED",
    price: 2799,
    discount: 10,
    category: "television",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80",
    isHot: false,
  },
  {
    name: "TCL 6-Series 75 inch",
    price: 1299,
    discount: 15,
    category: "television",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=800&q=80",
    isHot: false,
  },
  {
    name: "Hisense U8K Mini-LED 65 inch",
    price: 1099,
    discount: 12,
    category: "television",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
    isHot: false,
  },
  {
    name: "LG G3 OLED evo 77 inch",
    price: 3299,
    discount: 8,
    category: "television",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&q=80",
    isHot: false,
  },
  {
    name: "Samsung The Frame 55 inch",
    price: 1299,
    discount: 10,
    category: "television",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=800&q=80",
    isHot: false,
  },
  {
    name: "Sony X90L LED 65 inch",
    price: 1399,
    discount: 12,
    category: "television",
    brand: "sony",
    imageUrl:
      "https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=800&q=80",
    isHot: false,
  },
  {
    name: "Vizio M-Series 70 inch",
    price: 799,
    discount: 18,
    category: "television",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
    isHot: false,
  },
  {
    name: "TCL QM8 Mini-LED 65 inch",
    price: 999,
    discount: 15,
    category: "television",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1539786774582-0707555f1f72?w=800&q=80",
    isHot: false,
  },

  // HOME APPLIANCES (10 products) - first 2 are hot deals
  {
    name: "Dyson V15 Detect Vacuum",
    price: 749,
    discount: 15,
    category: "home-appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80",
    isHot: true,
  },
  {
    name: "iRobot Roomba j9+ Combo",
    price: 1099,
    discount: 20,
    category: "home-appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    isHot: true,
  },
  {
    name: "Ninja Foodi Air Fryer Max XL",
    price: 199,
    discount: 25,
    category: "home-appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80",
    isHot: false,
  },
  {
    name: "Breville Barista Express Impress",
    price: 899,
    discount: 10,
    category: "home-appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80",
    isHot: false,
  },
  {
    name: "KitchenAid Artisan Stand Mixer",
    price: 449,
    discount: 12,
    category: "home-appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Instant Pot Duo Plus",
    price: 129,
    discount: 20,
    category: "home-appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80",
    isHot: false,
  },
  {
    name: "Vitamix A3500 Blender",
    price: 649,
    discount: 8,
    category: "home-appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80",
    isHot: false,
  },
  {
    name: "LG WashTower",
    price: 2199,
    discount: 15,
    category: "home-appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    isHot: false,
  },
  {
    name: "Samsung Bespoke Refrigerator",
    price: 2999,
    discount: 10,
    category: "home-appliances",
    brand: "samsung",
    imageUrl:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
    isHot: false,
  },
  {
    name: "Philips Sonicare DiamondClean",
    price: 299,
    discount: 18,
    category: "home-appliances",
    brand: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
    isHot: false,
  },
];

export async function GET() {
  try {
    console.log("=== Starting Complete Database Seed ===");
    
    // Step 1: Check existing products count
    console.log("Step 1: Checking existing products...");
    const existingProducts = await backendClient.fetch(`*[_type == "product"]{ _id, name, imageUrl }`);
    console.log(`Found ${existingProducts.length} existing products`);
    
    // If we have products already, just fix the broken images
    if (existingProducts.length >= 70) {
      console.log("Products exist - fixing broken image URLs only...");
      const brokenImageFixes: Record<string, string> = {
        "photo-1621988404463-d85fe5c93bd7": "photo-1607462109225-6b64ae2dd3cb", // Canon camera
        "photo-1541807084-5c52b6b92e04": "photo-1611186871348-b1ce696e52c9", // MacBook
        "photo-1625229608841-8c1e0e92a5a1": "photo-1484788984921-03950022c9ef", // Surface
        "photo-1617717786289-92adb11b0d2c": "photo-1495707902641-75cac588d2e9", // Nikon
        "photo-1559591937-abc82b9cffe2": "photo-1571175443880-49e1d25b2bc5", // Philips
      };
      
      let fixedCount = 0;
      for (const product of existingProducts) {
        if (product.imageUrl) {
          for (const [broken, fixed] of Object.entries(brokenImageFixes)) {
            if (product.imageUrl.includes(broken)) {
              const newUrl = product.imageUrl.replace(broken, fixed);
              await backendClient.patch(product._id).set({ imageUrl: newUrl }).commit();
              console.log(`Fixed image for: ${product.name}`);
              fixedCount++;
              break;
            }
          }
        }
      }
      
      return NextResponse.json({
        success: true,
        message: "Fixed broken image URLs",
        stats: { fixedImages: fixedCount, totalProducts: existingProducts.length },
      });
    }
    
    // Otherwise do a clean seed (delete everything first)
    console.log("Doing clean seed - deleting all products...");
    for (const product of existingProducts) {
      try {
        await backendClient.delete(product._id);
      } catch {
        console.log(`Skipping ${product.name} - has references`);
      }
    }
    console.log(`Deleted products`);

    // Step 2: Create/update categories
    console.log("Step 2: Creating categories...");
    const categoryRefs: Record<string, string> = {};
    for (const cat of categories) {
      const existing = await backendClient.fetch(
        `*[_type == "category" && slug.current == $slug][0]._id`,
        { slug: cat.slug }
      );
      if (existing) {
        categoryRefs[cat.slug] = existing;
        console.log(`Category exists: ${cat.title}`);
      } else {
        const doc = await backendClient.create({
          _type: "category",
          title: cat.title,
          slug: { _type: "slug", current: cat.slug },
          description: cat.description,
        });
        categoryRefs[cat.slug] = doc._id;
        console.log(`Created category: ${cat.title}`);
      }
    }

    // Step 3: Create/update brands
    console.log("Step 3: Creating brands...");
    const brandRefs: Record<string, string> = {};
    for (const brand of brands) {
      const existing = await backendClient.fetch(
        `*[_type == "brand" && slug.current == $slug][0]._id`,
        { slug: brand.slug }
      );
      if (existing) {
        brandRefs[brand.slug] = existing;
        console.log(`Brand exists: ${brand.title}`);
      } else {
        const doc = await backendClient.create({
          _type: "brand",
          title: brand.title,
          slug: { _type: "slug", current: brand.slug },
        });
        brandRefs[brand.slug] = doc._id;
        console.log(`Created brand: ${brand.title}`);
      }
    }

    // Step 4: Create all 80 products
    console.log("Step 4: Creating 80 products...");
    let createdCount = 0;
    let hotDealsCount = 0;

    for (const product of products) {
      const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
      const status = product.isHot ? "sale" : ["new", "hot", "sale"][Math.floor(Math.random() * 3)];
      const variant = ["television", "home-appliances"].includes(product.category) ? "appliances" : "gadget";

      const productDoc = {
        _type: "product",
        name: product.name,
        slug: { _type: "slug", current: slug },
        description: `Premium ${product.name} - High quality product with excellent features and modern design. Perfect for your everyday needs.`,
        price: product.price,
        discount: product.discount,
        stock: Math.floor(Math.random() * 100) + 20,
        categories: [{ _type: "reference", _ref: categoryRefs[product.category], _key: `cat-${Date.now()}` }],
        brand: { _type: "reference", _ref: brandRefs[product.brand] },
        status: status,
        variant: variant,
        isFeatured: product.isHot,
        imageUrl: product.imageUrl,
      };

      await backendClient.create(productDoc);
      createdCount++;
      if (product.isHot) hotDealsCount++;
      console.log(`Created ${createdCount}/80: ${product.name}${product.isHot ? " [HOT DEAL]" : ""}`);
    }

    console.log("=== Seed Complete ===");

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      stats: {
        deletedOldProducts: existingProducts.length,
        categories: Object.keys(categoryRefs).length,
        brands: Object.keys(brandRefs).length,
        totalProducts: createdCount,
        hotDeals: hotDealsCount,
        productsPerCategory: 10,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
