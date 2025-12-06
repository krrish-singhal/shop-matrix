import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    console.log("🗑️  FORCE Deleting all products and references...");
    
    // Step 1: Delete ALL orders first (they reference products)
    const orders = await backendClient.fetch(`*[_type == "order"]._id`);
    for (const id of orders) {
      try {
        await backendClient.delete(id);
      } catch {
        console.log("Could not delete order:", id);
      }
    }
    console.log(`Deleted ${orders.length} orders`);

    // Step 2: Delete any documents that reference products
    const products = await backendClient.fetch(`*[_type == "product"]._id`);
    
    for (const productId of products) {
      // Find all documents that reference this product
      const refs = await backendClient.fetch(
        `*[references($id)]._id`,
        { id: productId }
      );
      
      // Delete all referencing documents
      for (const refId of refs) {
        try {
          await backendClient.delete(refId);
          console.log(`Deleted referencing doc: ${refId}`);
        } catch {
          console.log(`Could not delete ref: ${refId}`);
        }
      }
      
      // Now delete the product
      try {
        await backendClient.delete(productId);
        console.log(`Deleted product: ${productId}`);
      } catch {
        console.log(`Could not delete product: ${productId}`);
      }
    }
    
    console.log(`✅ Processed ${products.length} products`);
    
    return NextResponse.json({
      success: true,
      message: `Force deleted ${products.length} products and their references`,
      ordersDeleted: orders.length,
      productsProcessed: products.length,
    });
  } catch (error) {
    console.error("❌ Delete failed:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return DELETE();
}
