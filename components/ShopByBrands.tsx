import React from "react";
import Title from "./Title";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
  const brands = await getAllBrands();
  
  // Only show these specific brands that we KNOW have proper logos
  const brandsWithRealLogos = ["canon", "apple", "lg", "microsoft", "dell", "sony"];
  
  // Filter to show ONLY brands with verified logos
  const uniqueBrandsWithLogos = brands?.filter((brand, index, self) => {
    if (!brand?.image) return false;
    
    const slug = brand?.slug?.current?.toLowerCase() || "";
    
    // Only include brands we've verified have actual logos
    if (!brandsWithRealLogos.includes(slug)) return false;
    
    // Keep only first occurrence (unique)
    return self.findIndex(b => b?.slug?.current === brand?.slug?.current) === index;
  }) || [];
  
  return (
    <div className="mb-10 lg:mb-20 bg-[#1e2768] p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title className="text-[#3ab8a3]">Shop By Brands</Title>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide text-[#3ab8a3] hover:text-white hoverEffect"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {uniqueBrandsWithLogos?.map((brand) => {
          if (!brand?.image) return null;
          return (
            <Link
              key={brand?._id}
              href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
              className="bg-white border border-[#3ab8a3]/20 w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg hover:border-[#3ab8a3]/50 shadow-[#3ab8a3]/20 hoverEffect group"
            >
              <Image
                src={urlFor(brand.image).url()}
                alt={brand?.title || "brandImage"}
                width={250}
                height={250}
                className="w-32 h-20 object-contain"
              />
            </Link>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-[#3ab8a3]/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-[#3ab8a3] hover:text-white"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-white font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-gray-400">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
