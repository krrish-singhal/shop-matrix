"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "@/images/ShopMatrix_Logo.png";

const Logo = ({
  className,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  const [showTagline, setShowTagline] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const sequence = () => {
      // Show logo for 2 seconds
      setShowTagline(false);
      setIsAnimating(false);
      
      setTimeout(() => {
        // Start sliding animation
        setIsAnimating(true);
        setShowTagline(true);
        
        setTimeout(() => {
          // Slide out and show logo again
          setIsAnimating(false);
          setTimeout(() => {
            setShowTagline(false);
          }, 500);
        }, 3000);
      }, 2000);
    };

    // Initial sequence
    sequence();
    
    // Repeat every 5.5 seconds
    const interval = setInterval(sequence, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link href={"/"} className="inline-flex items-center gap-2 group">
      <div className="relative h-12 min-w-[280px] flex items-center overflow-hidden">
        {/* Logo Image */}
        <div
          className={cn(
            "absolute left-0 transition-all duration-500 ease-in-out",
            !showTagline
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
          )}
        >
          <Image
            src={logo}
            alt="ShopMatrix Logo"
            className={cn(
              "h-12 w-auto object-contain",
              "group-hover:scale-110 group-hover:rotate-3",
              className
            )}
            priority
          />
        </div>
        
        {/* Tagline Text - Continuous sliding animation */}
        <div
          className={cn(
            "absolute whitespace-nowrap transition-all duration-1000 ease-linear",
            showTagline && isAnimating
              ? "animate-slide-text"
              : showTagline && !isAnimating
              ? "translate-x-full opacity-0"
              : "-translate-x-full opacity-0"
          )}
        >
          <span className="text-sm font-semibold text-[#3ab8a3]">
            Where Quality Meets Convenience
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
