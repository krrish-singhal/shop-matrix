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
      deletedDuplicates: camerasCategories.length - 1,
    });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
