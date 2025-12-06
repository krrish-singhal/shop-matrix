import { backendClient } from "../sanity/lib/backendClient";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const client = backendClient;

// Categories to create
const categories = [
  { title: "Television", slug: "television", description: "Smart TVs and home entertainment", range: 1 },
  { title: "Smartphones", slug: "smartphones", description: "Latest mobile phones and accessories", range: 2 },
  { title: "Laptops", slug: "laptops", description: "Powerful computing devices", range: 3 },
  { title: "Headphones", slug: "headphones", description: "Audio devices and sound systems", range: 4 },
  { title: "Cameras", slug: "cameras", description: "Photography and videography equipment", range: 5 },
  { title: "Gaming", slug: "gaming", description: "Gaming consoles and accessories", range: 6 },
  { title: "Wearables", slug: "wearables", description: "Smart watches and fitness trackers", range: 7 },
  { title: "Home Appliances", slug: "home-appliances", description: "Kitchen and home devices", range: 8 },
];

// Brands to create
const brands = [
  { title: "Samsung", slug: "samsung", description: "Leading electronics brand" },
  { title: "Apple", slug: "apple", description: "Premium technology products" },
  { title: "Sony", slug: "sony", description: "Audio and visual excellence" },
  { title: "LG", slug: "lg", description: "Life's Good with innovative tech" },
  { title: "Dell", slug: "dell", description: "Computing solutions" },
  { title: "HP", slug: "hp", description: "Technology that works for you" },
  { title: "Bose", slug: "bose", description: "Premium audio equipment" },
  { title: "Canon", slug: "canon", description: "Imaging solutions" },
  { title: "Nikon", slug: "nikon", description: "Photography excellence" },
  { title: "Microsoft", slug: "microsoft", description: "Software and hardware innovation" },
];

// Product templates for each category
const productTemplates = {
  television: [
    { name: "4K Ultra HD Smart TV", basePrice: 599, variant: "appliances" },
    { name: "OLED Display TV", basePrice: 1299, variant: "appliances" },
    { name: "QLED Smart TV", basePrice: 899, variant: "appliances" },
    { name: "LED Smart TV", basePrice: 399, variant: "appliances" },
    { name: "8K Ultra HD TV", basePrice: 2499, variant: "appliances" },
    { name: "Curved Screen TV", basePrice: 1099, variant: "appliances" },
    { name: "55 inch Smart TV", basePrice: 549, variant: "appliances" },
    { name: "65 inch Smart TV", basePrice: 799, variant: "appliances" },
    { name: "75 inch Smart TV", basePrice: 1499, variant: "appliances" },
    { name: "Android TV", basePrice: 499, variant: "appliances" },
  ],
  smartphones: [
    { name: "5G Smartphone", basePrice: 699, variant: "gadget" },
    { name: "Flagship Smartphone", basePrice: 999, variant: "gadget" },
    { name: "Budget Smartphone", basePrice: 299, variant: "gadget" },
    { name: "Gaming Smartphone", basePrice: 799, variant: "gadget" },
    { name: "Camera Phone", basePrice: 849, variant: "gadget" },
    { name: "Foldable Smartphone", basePrice: 1499, variant: "gadget" },
    { name: "Dual SIM Smartphone", basePrice: 399, variant: "gadget" },
    { name: "Waterproof Smartphone", basePrice: 649, variant: "gadget" },
    { name: "Long Battery Smartphone", basePrice: 449, variant: "gadget" },
    { name: "Pro Smartphone", basePrice: 1199, variant: "gadget" },
  ],
  laptops: [
    { name: "Gaming Laptop", basePrice: 1299, variant: "gadget" },
    { name: "Business Laptop", basePrice: 899, variant: "gadget" },
    { name: "Ultrabook", basePrice: 1099, variant: "gadget" },
    { name: "2-in-1 Laptop", basePrice: 799, variant: "gadget" },
    { name: "Chromebook", basePrice: 399, variant: "gadget" },
    { name: "Workstation Laptop", basePrice: 1899, variant: "gadget" },
    { name: "Student Laptop", basePrice: 549, variant: "gadget" },
    { name: "MacBook Pro", basePrice: 1999, variant: "gadget" },
    { name: "MacBook Air", basePrice: 1199, variant: "gadget" },
    { name: "Creator Laptop", basePrice: 1599, variant: "gadget" },
  ],
  headphones: [
    { name: "Wireless Headphones", basePrice: 199, variant: "gadget" },
    { name: "Noise Cancelling Headphones", basePrice: 299, variant: "gadget" },
    { name: "Gaming Headset", basePrice: 149, variant: "gadget" },
    { name: "Studio Headphones", basePrice: 349, variant: "gadget" },
    { name: "True Wireless Earbuds", basePrice: 129, variant: "gadget" },
    { name: "Sports Earphones", basePrice: 79, variant: "gadget" },
    { name: "Over-Ear Headphones", basePrice: 249, variant: "gadget" },
    { name: "In-Ear Monitors", basePrice: 399, variant: "gadget" },
    { name: "Bluetooth Headphones", basePrice: 99, variant: "gadget" },
    { name: "Premium Earbuds", basePrice: 179, variant: "gadget" },
  ],
  cameras: [
    { name: "DSLR Camera", basePrice: 899, variant: "gadget" },
    { name: "Mirrorless Camera", basePrice: 1299, variant: "gadget" },
    { name: "Action Camera", basePrice: 299, variant: "gadget" },
    { name: "Point and Shoot Camera", basePrice: 399, variant: "gadget" },
    { name: "Professional Camera", basePrice: 2499, variant: "gadget" },
    { name: "Instant Camera", basePrice: 99, variant: "gadget" },
    { name: "360 Camera", basePrice: 499, variant: "gadget" },
    { name: "Vlogging Camera", basePrice: 699, variant: "gadget" },
    { name: "Cinema Camera", basePrice: 3499, variant: "gadget" },
    { name: "Compact Camera", basePrice: 549, variant: "gadget" },
  ],
  gaming: [
    { name: "Gaming Console", basePrice: 499, variant: "gadget" },
    { name: "Handheld Console", basePrice: 349, variant: "gadget" },
    { name: "VR Headset", basePrice: 399, variant: "gadget" },
    { name: "Gaming Controller", basePrice: 69, variant: "gadget" },
    { name: "Racing Wheel", basePrice: 299, variant: "gadget" },
    { name: "Gaming Chair", basePrice: 349, variant: "gadget" },
    { name: "Gaming Monitor", basePrice: 449, variant: "gadget" },
    { name: "Gaming Keyboard", basePrice: 129, variant: "gadget" },
    { name: "Gaming Mouse", basePrice: 79, variant: "gadget" },
    { name: "Gaming Desk", basePrice: 299, variant: "gadget" },
  ],
  wearables: [
    { name: "Smartwatch", basePrice: 299, variant: "gadget" },
    { name: "Fitness Tracker", basePrice: 99, variant: "gadget" },
    { name: "Smart Band", basePrice: 49, variant: "gadget" },
    { name: "GPS Watch", basePrice: 249, variant: "gadget" },
    { name: "Health Monitor Watch", basePrice: 199, variant: "gadget" },
    { name: "Sports Watch", basePrice: 179, variant: "gadget" },
    { name: "Hybrid Smartwatch", basePrice: 229, variant: "gadget" },
    { name: "Kids Smartwatch", basePrice: 79, variant: "gadget" },
    { name: "Luxury Smartwatch", basePrice: 799, variant: "gadget" },
    { name: "Running Watch", basePrice: 149, variant: "gadget" },
  ],
  "home-appliances": [
    { name: "Air Purifier", basePrice: 299, variant: "appliances" },
    { name: "Vacuum Cleaner", basePrice: 199, variant: "appliances" },
    { name: "Coffee Maker", basePrice: 149, variant: "appliances" },
    { name: "Microwave Oven", basePrice: 249, variant: "appliances" },
    { name: "Air Fryer", basePrice: 129, variant: "appliances" },
    { name: "Blender", basePrice: 79, variant: "appliances" },
    { name: "Toaster", basePrice: 49, variant: "appliances" },
    { name: "Electric Kettle", basePrice: 39, variant: "appliances" },
    { name: "Food Processor", basePrice: 149, variant: "appliances" },
    { name: "Rice Cooker", basePrice: 89, variant: "appliances" },
  ],
};

const statuses = ["new", "hot", "sale"];
const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];

async function seedData() {
  console.log("🌱 Starting seed process...");

  try {
    // Step 1: Create Categories
    console.log("\n📁 Creating categories...");
    const categoryRefs: Record<string, string> = {};
    
    for (const category of categories) {
      const doc = await client.create({
        _type: "category",
        title: category.title,
        slug: { current: category.slug },
        description: category.description,
        range: category.range,
        featured: Math.random() > 0.5,
      });
      categoryRefs[category.slug] = doc._id;
      console.log(`✅ Created category: ${category.title}`);
    }

    // Step 2: Create Brands
    console.log("\n🏷️  Creating brands...");
    const brandRefs: string[] = [];
    
    for (const brand of brands) {
      const doc = await client.create({
        _type: "brand",
        title: brand.title,
        slug: { current: brand.slug },
        description: brand.description,
      });
      brandRefs.push(doc._id);
      console.log(`✅ Created brand: ${brand.title}`);
    }

    // Step 3: Create Products for each category
    console.log("\n📦 Creating products...");
    let totalProducts = 0;

    for (const category of categories) {
      console.log(`\n🔄 Creating products for ${category.title}...`);
      const templates = productTemplates[category.slug as keyof typeof productTemplates];
      
      for (let i = 0; i < 30; i++) {
        const template = templates[i % templates.length];
        const variation = Math.floor(i / templates.length) + 1;
        
        const productName = `${template.name} ${variation > 1 ? `V${variation}` : ""}`.trim();
        const priceVariation = Math.floor(Math.random() * 200) - 100;
        const price = template.basePrice + priceVariation;
        const discount = Math.floor(Math.random() * 30);
        const stock = Math.floor(Math.random() * 100) + 10;
        const randomBrand = brandRefs[Math.floor(Math.random() * brandRefs.length)];

        try {
          await client.create({
            _type: "product",
            name: productName,
            slug: { current: `${category.slug}-${i + 1}-${Date.now()}` },
            description: `High-quality ${productName.toLowerCase()} with advanced features and excellent performance. Perfect for ${category.description.toLowerCase()}.`,
            price: price,
            discount: discount,
            stock: stock,
            categories: [{ _type: "reference", _ref: categoryRefs[category.slug] }],
            brand: { _type: "reference", _ref: randomBrand },
            status: getRandomStatus(),
            variant: template.variant,
            isFeatured: Math.random() > 0.8,
          });
          
          totalProducts++;
          if (totalProducts % 10 === 0) {
            console.log(`✅ Created ${totalProducts} products...`);
          }
        } catch (error) {
          console.error(`❌ Error creating product: ${productName}`, error);
        }
      }
    }

    console.log(`\n✨ Seed completed successfully!`);
    console.log(`📊 Summary:`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Brands: ${brands.length}`);
    console.log(`   - Products: ${totalProducts}`);
    
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  }
}

// Run the seed
seedData()
  .then(() => {
    console.log("\n✅ All done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  });
