import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Count products
    const total = await client.fetch(`count(*[_type == "product"])`);
    
    // Get products with and without images
    const withImages = await client.fetch(`count(*[_type == "product" && defined(images)])`);
    const withoutImages = await client.fetch(`count(*[_type == "product" && !defined(images)])`);
    
    // Get sample products
    const sampleWithImages = await client.fetch(
      `*[_type == "product" && defined(images)][0...3]{
        name,
        "hasImages": defined(images),
        "imageCount": count(images)
      }`
    );
    
    const sampleWithoutImages = await client.fetch(
      `*[_type == "product" && !defined(images)][0...3]{
        name,
        "hasImages": defined(images)
      }`
    );
    
    return NextResponse.json({
      total,
      withImages,
      withoutImages,
      sampleWithImages,
      sampleWithoutImages,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
