import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🧪 Creating 10 test products...");
    
    // Get first category and brand
    const category = await backendClient.fetch(`*[_type == "category"][0]`);
    const brand = await backendClient.fetch(`*[_type == "brand"][0]`);
    
    if (!category || !brand) {
      return NextResponse.json({
        success: false,
        error: "No categories or brands found. Run /api/seed first."
      });
    }
    
    // Create 10 test products
    for (let i = 0; i < 10; i++) {
      // Upload a test image from Unsplash
      const imageUrl = `https://source.unsplash.com/500x500/?electronics,product&sig=${i}`;
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const imageAsset = await backendClient.assets.upload('image', Buffer.from(imageBuffer), {
        filename: `test-product-${i + 1}.jpg`,
      });
      
      await backendClient.create({
        _type: "product",
        name: `Test Product ${i + 1}`,
        slug: { current: `test-product-${i + 1}-${Date.now()}` },
        description: `This is test product number ${i + 1}`,
        price: 299 + (i * 50),
        discount: 10 + (i * 2),
        stock: 50 + i,
        categories: [{ _type: "reference", _ref: category._id }],
        brand: { _type: "reference", _ref: brand._id },
        status: "new",
        variant: "gadget",
        isFeatured: false,
        images: [
          {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id
            }
          }
        ]
      });
      
      console.log(`✅ Created test product ${i + 1}/10`);
    }
    
    return NextResponse.json({
      success: true,
      message: "Created 10 test products with images",
      products: 10,
    });
  } catch (error) {
    console.error("❌ Test products creation failed:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
