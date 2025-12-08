import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("=== Starting Category Cleanup ===");

    // Step 1: Find ALL categories and look for duplicates
    const allCategories = await backendClient.fetch(
      `*[_type == "category"] | order(_createdAt asc) { _id, title, slug, _createdAt }`
    );
    
    console.log(`Total categories found: ${allCategories.length}`);
    allCategories.forEach((cat: { _id: string; title: string; slug: { current: string } }, index: number) => {
      console.log(`${index + 1}. ${cat.title} (${cat.slug?.current}) - ID: ${cat._id}`);
    });

    // Step 2: Find all "Cameras" categories
    const camerasCategories = allCategories.filter(
      (cat: { _id: string; title: string; slug: { current: string } }) => cat.slug?.current === "cameras" || cat.title === "Cameras"
    );
    
    console.log(`Found ${camerasCategories.length} "Cameras" categories`);
    
    // Keep only the first one (oldest), delete all others
    if (camerasCategories.length > 1) {
      for (let i = 1; i < camerasCategories.length; i++) {
        await backendClient.delete(camerasCategories[i]._id);
        console.log(`Deleted duplicate Cameras category: ${camerasCategories[i]._id} - ${camerasCategories[i].title}`);
      }
    }

    // Step 2.5: Find all "Gaming" categories and remove duplicates
    const gamingCategories = allCategories.filter(
      (cat: { _id: string; title: string; slug: { current: string } }) => 
        cat.slug?.current === "gaming" || cat.slug?.current === "gamings" || cat.title?.toLowerCase() === "gaming"
    );
    
    console.log(`Found ${gamingCategories.length} "Gaming" categories`);
    
    let deletedGaming = 0;
    // Keep only the first one (oldest), delete all others
    if (gamingCategories.length > 1) {
      const keepCategory = gamingCategories[0];
      console.log(`Keeping Gaming category: ${keepCategory._id} - ${keepCategory.title}`);
      
      for (let i = 1; i < gamingCategories.length; i++) {
        const duplicateCategory = gamingCategories[i];
        
        // Find all products referencing this duplicate category
        const productsWithCategory = await backendClient.fetch(
          `*[_type == "product" && references($categoryId)]._id`,
          { categoryId: duplicateCategory._id }
        );
        
        console.log(`Found ${productsWithCategory.length} products referencing duplicate category ${duplicateCategory._id}`);
        
        // Reassign those products to the main category
        for (const productId of productsWithCategory) {
          const product = await backendClient.fetch(
            `*[_type == "product" && _id == $productId][0]{ categories }`,
            { productId }
          );
          
          // Remove duplicate category and add the keeper category if not already there
          const updatedCategories = product.categories
            .filter((ref: { _ref: string }) => ref._ref !== duplicateCategory._id)
            .concat(
              product.categories.some((ref: { _ref: string }) => ref._ref === keepCategory._id)
                ? []
                : [{ _type: 'reference', _ref: keepCategory._id }]
            );
          
          await backendClient.patch(productId).set({ categories: updatedCategories }).commit();
          console.log(`Updated product ${productId} to use main Gaming category`);
        }
        
        // Now delete the duplicate category
        await backendClient.delete(duplicateCategory._id);
        console.log(`Deleted duplicate Gaming category: ${duplicateCategory._id} - ${duplicateCategory.title}`);
        deletedGaming++;
      }
    }

    // Step 3: Find "Washing Machine" (singular) and delete it
    const washingMachineSingular = allCategories.filter(
      (cat: { _id: string; title: string; slug: { current: string } }) => cat.title === "Washing Machine" && cat.slug?.current !== "washing-machines"
    );
    
    for (const cat of washingMachineSingular) {
      await backendClient.delete(cat._id);
      console.log(`Deleted singular "Washing Machine" category: ${cat._id}`);
    }

    // Step 4: Ensure "Washing Machines" (plural) exists
    const washingMachinesPlural = allCategories.find(
      (cat: { _id: string; title: string; slug: { current: string } }) => cat.slug?.current === "washing-machines"
    );
    
    if (!washingMachinesPlural) {
      const newCategory = await backendClient.create({
        _type: "category",
        title: "Washing Machines",
        slug: { _type: "slug", current: "washing-machines" },
        description: "Washing machines and laundry solutions",
      });
      console.log(`Created "Washing Machines" category: ${newCategory._id}`);
    } else {
      console.log(`"Washing Machines" category already exists: ${washingMachinesPlural.title}`);
    }

    console.log("=== Cleanup Complete ===");

    return NextResponse.json({
      success: true,
      message: "Categories cleaned up successfully!",
      deletedCamerasDuplicates: camerasCategories.length - 1,
      deletedGamingDuplicates: deletedGaming,
    });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
