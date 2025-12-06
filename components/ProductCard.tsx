"use client";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentCard = cardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  // Use imageUrl field if available, fallback to images array, then placeholder
  const imageUrl = product?.imageUrl
    || (product?.images?.[0] ? urlFor(product.images[0]).url() : null)
    || `https://placehold.co/500x500/e5e7eb/64748b?text=${encodeURIComponent(product?.name || 'Product')}`;
    
  return (
    <div 
      ref={cardRef}
      className={`text-sm border-[1px] rounded-md border-[#3ab8a3]/20 group bg-[#1e2768] text-white 
      transition-all duration-500 hover-lift
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="relative group overflow-hidden bg-[#161d53] rounded-t-md">
        <Link href={`/product/${product?.slug?.current}`}>
          <Image
            src={imageUrl}
            alt={product?.name || "productImage"}
            width={500}
            height={500}
            priority
            className={`w-full h-64 object-contain overflow-hidden transition-all duration-700 bg-[#161d53]
            ${product?.stock !== 0 ? "group-hover:scale-110 group-hover:rotate-1" : "opacity-50"}`}
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-[#161d53]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <ProductSideMenu product={product} />
        {product?.status === "sale" ? (
          <p className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-lightGreen hover:text-shop_dark_green hoverEffect animate-bounce-in">
            Sale!
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect hover:scale-110"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect group-hover:animate-pulse"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-gray-400 transition-all duration-300 group-hover:text-[#3ab8a3]">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}
        <Title className="text-sm line-clamp-1 text-white group-hover:text-[#3ab8a3] transition-colors duration-300">{product?.name}</Title>
        <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`transition-all duration-300 delay-${index * 100}
                  ${index < 4 ? "text-[#3ab8a3]" : "text-gray-600"} 
                  group-hover:scale-110`}
                fill={index < 4 ? "#3ab8a3" : "#4a4a4a"}
              />
            ))}
          </div>
          <p className="text-gray-400 text-xs tracking-wide">5 Reviews</p>
        </div>

        <div className="flex items-center gap-2.5 transition-all duration-300">
          <p className="font-medium text-white">In Stock</p>
          <p
            className={`transition-all duration-300 ${product?.stock === 0 ? "text-red-500" : "text-[#3ab8a3] font-semibold group-hover:scale-110"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm transition-transform duration-300 group-hover:scale-105"
        />
        <AddToCartButton product={product} className="w-36 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg" />
      </div>
    </div>
  );
};

export default ProductCard;
