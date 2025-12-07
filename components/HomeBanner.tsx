"use client";
import React, { useState, useEffect } from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import { banner_1 } from "@/images";

const HomeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="py-10 sm:py-12 md:py-16 lg:py-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-[#1e2768] dark:via-[#1e2768] dark:to-[#161d53] rounded-lg px-6 sm:px-8 md:px-10 lg:px-24 flex flex-col lg:flex-row items-center justify-between overflow-hidden relative gap-6 lg:gap-0">
      {/* Animated background - only visible in dark mode */}
      <div className="absolute inset-0 opacity-0 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3ab8a3] rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#fb6c08] rounded-full filter blur-3xl animate-float delay-500"></div>
      </div>

      <div className={`space-y-4 sm:space-y-5 z-10 transition-all duration-1000 text-center lg:text-left ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
        <Title className="text-gray-800 dark:text-white animate-fade-in-up text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Grab Upto <span className="text-[#3ab8a3] animate-pulse">50% off</span> on <br className="hidden sm:block" />
          every order for the first user <br className="hidden sm:block"/> for <span className="text-[#fb6c08]">limited period</span>
        </Title>
        <Link
          href={"/shop"}
          className="inline-block bg-[#3ab8a3] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm font-semibold 
          hover:bg-[#2d9785] hoverEffect transform transition-all duration-300 
          hover:scale-105 hover:shadow-lg hover:shadow-[#3ab8a3]/50 animate-bounce-in delay-300"
        >
          Buy Now
        </Link>
      </div>
      <div className={`z-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        <Image
          src={banner_1}
          alt="banner_1"
          className="hidden md:inline-flex w-64 lg:w-80 xl:w-96 animate-float"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
