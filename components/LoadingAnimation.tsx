"use client";
import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#161d53]">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-24 h-24 rounded-full border-4 border-[#3ab8a3]/20 animate-pulse"></div>
        
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-transparent border-t-[#3ab8a3] animate-spin"></div>
        
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-[#3ab8a3] rounded-full animate-ping"></div>
          <div className="w-4 h-4 bg-[#3ab8a3] rounded-full absolute top-0 left-0"></div>
        </div>
      </div>
      
      <div className="absolute mt-32">
        <p className="text-[#3ab8a3] font-semibold text-lg animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
