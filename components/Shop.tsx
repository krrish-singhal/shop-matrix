"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import { useSearchParams } from "next/navigation";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}
const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  
  // Filter out Washing Machines and Mobiles from categories
  const filteredCategories = categories?.filter(
    (cat) => cat.slug?.current !== "washing-machines" && cat.slug?.current !== "mobiles"
  ) || [];
  
  // Update filters from URL params only when they change
  useEffect(() => {
    if (categoryParams) setSelectedCategory(categoryParams);
    if (brandParams) setSelectedBrand(brandParams);
  }, [categoryParams, brandParams]);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      
      const query = `*[_type == 'product' && price >= $minPrice && price <= $maxPrice] | order(name asc) {
        ...,
        "categories": categories[]->title,
        "categorySlugs": categories[]->slug.current,
        "brand": brand->title,
        "brandSlug": brand->slug.current
      }`;
      
      const data = await client.fetch(
        query, 
        { minPrice, maxPrice },
        { next: { revalidate: 0 } }
      );
      
      // Filter by category and brand on client side
      let filteredProducts = data;
      
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter((product: Product & { categorySlugs?: string[] }) => 
          product.categorySlugs?.includes(selectedCategory)
        );
      }
      
      if (selectedBrand) {
        filteredProducts = filteredProducts.filter((product: Product & { brandSlug?: string }) => 
          product.brandSlug === selectedBrand
        );
      }
      
      setProducts(filteredProducts);
    } catch {
      // Error silently handled
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedBrand, selectedPrice]);
  return (
    <div className="border-t border-[#3ab8a3]/20">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide text-white">
              Get the products as your needs
            </Title>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-[#3ab8a3] underline text-sm mt-2 font-medium hover:text-white hoverEffect"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-[#3ab8a3]/20">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-[#3ab8a3]/20 scrollbar-hide">
            <CategoryList
              categories={filteredCategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              setSelectedBrand={setSelectedBrand}
              selectedBrand={selectedBrand}
            />
            <PriceList
              setSelectedPrice={setSelectedPrice}
              selectedPrice={selectedPrice}
            />
          </div>
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
