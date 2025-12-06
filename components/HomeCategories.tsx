"use client";
import React, { useState, useEffect, useRef } from "react";
import Title from "./Title";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface CategoryWithCount extends Category {
  productCount?: number;
  imageUrl?: string;
}

const HomeCategories = ({ categories }: { categories: CategoryWithCount[] }) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [categories]);

  return (
    <div className="bg-[#1e2768] dark:bg-[#1e2768] light:bg-white border border-[#3ab8a3]/20 my-10 md:my-20 p-5 lg:p-7 rounded-md animate-fade-in-up">
      <Title className="border-b pb-3 text-[#3ab8a3] dark:text-[#3ab8a3] light:text-shop_dark_green animate-fade-in-down">Popular Categories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category, index) => (
          <div
            key={category?._id}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={`bg-[#161d53] dark:bg-[#161d53] light:bg-shop_light_bg p-5 flex items-center gap-3 group 
            hover:bg-[#1a2460] transition-all duration-500 hover-lift rounded-lg
            ${visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {(category?.image || category?.imageUrl) && (
              <div className="overflow-hidden border border-[#3ab8a3]/30 hover:border-[#3ab8a3] hoverEffect w-20 h-20 p-1 bg-white/5 rounded-lg group-hover:scale-110 transition-all duration-500">
                <Link href={`/category/${category?.slug?.current}`}>
                  <Image
                    src={category?.image ? urlFor(category?.image).url() : (category?.imageUrl || '')}
                    alt="categoryImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-3 hoverEffect"
                  />
                </Link>
              </div>
            )}
            <div className="space-y-1 flex-1">
              <Link href={`/category/${category?.slug?.current}`}>
                <h3 className="text-base font-semibold text-white dark:text-white light:text-black hover:text-[#3ab8a3] transition-all duration-300 group-hover:translate-x-1">
                  {category?.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 transition-all duration-300 group-hover:text-[#3ab8a3]">
                <span className="font-bold text-[#3ab8a3] dark:text-[#3ab8a3] light:text-shop_dark_green group-hover:scale-110 inline-block transition-transform">{`(${category?.productCount || 0})`}</span>{" "}
                items Available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
