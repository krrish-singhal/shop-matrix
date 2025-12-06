import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("=== Cleaning up Air Buds category ===");
    
    // Get the headphones and air-buds categories
    const headphonesCategory = await backendClient.fetch(
      `*[_type == "category" && slug.current == "headphones"][0]`
    );
    
    const airBudsCategory = await backendClient.fetch(
      `*[_type == "category" && slug.current == "air-buds"][0]`
    );
    
    if (!headphonesCategory) {
      return NextResponse.json({ error: "Headphones category not found" }, { status: 404 });
    }
    
    if (!airBudsCategory) {
      return NextResponse.json({ message: "Air Buds category already removed" });
    }
    
    console.log("Moving Air Buds products to Headphones...");
    
    // Get all products with air-buds category
    const airBudsProducts = await backendClient.fetch(
      `*[_type == "product" && references(*[_type=="category" && slug.current=="air-buds"]._id)]`
    );
    
    console.log(`Found ${airBudsProducts.length} Air Buds products`);
    
    // Update each product to use headphones category instead
    for (const product of airBudsProducts) {
      const updatedCategories = product.categories
        ?.map((cat: { _ref: string }) => cat._ref)
        .filter((ref: string) => ref !== airBudsCategory._id)
        .concat([{ _ref: headphonesCategory._id, _type: "reference" }]);
      
      await backendClient
        .patch(product._id)
        .set({
          categories: updatedCategories.map((catRef: string | { _ref: string; _type: string }) => ({
            _type: "reference",
            _ref: typeof catRef === "string" ? catRef : catRef._ref,
          })),
        })
        .commit();
      
      console.log(`Updated product: ${product.name}`);
    }
    
    // Delete the air-buds category
    await backendClient.delete(airBudsCategory._id);
    console.log("Deleted Air Buds category");
    
    return NextResponse.json({
      success: true,
      message: `Moved ${airBudsProducts.length} products to Headphones and deleted Air Buds category`,
    });
  } catch (error) {
    console.error("Error cleaning up Air Buds:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
