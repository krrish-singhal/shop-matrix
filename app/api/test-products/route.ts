import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test the exact query used in Shop component
    const shopQuery = `*[_type == 'product' && price >= $minPrice && price <= $maxPrice] | order(name asc) {
      ...,
      "categories": categories[]->title,
      "categorySlugs": categories[]->slug.current,
      "brand": brand->title,
      "brandSlug": brand->slug.current
    }`;
    
    const products = await client.fetch(shopQuery, { minPrice: 0, maxPrice: 10000 });
    const totalCount = await client.fetch(`count(*[_type == "product"])`);
    
    return NextResponse.json({
      success: true,
      totalProducts: totalCount,
      fetchedProducts: products.length,
      sampleProducts: products.slice(0, 5),
      allProductNames: products.map((p: { name: string }) => p.name),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
