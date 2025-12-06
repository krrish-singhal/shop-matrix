import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { getDealProducts } from "@/sanity/queries";
import { Product } from "@/sanity.types";
import React from "react";

const DealPage = async () => {
  const allProducts = await getDealProducts();
  
  // Get 5 products per category
  const productsByCategory = allProducts.reduce((acc: Record<string, Product[]>, product: Product & { categorySlugs?: string[] }) => {
    const categorySlugs = product.categorySlugs || [];
    categorySlugs.forEach((slug: string) => {
      if (!acc[slug]) acc[slug] = [];
      if (acc[slug].length < 5) acc[slug].push(product);
    });
    return acc;
  }, {});
  
  const products = Object.values(productsByCategory).flat() as Product[];
  
  return (
    <div className="py-10 bg-[#161d53]">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide text-[#3ab8a3]">
          Hot Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
