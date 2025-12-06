"use client";
import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartIcon = () => {
  const { items } = useStore();
  const [bounce, setBounce] = useState(false);
  const [prevCount, setPrevCount] = useState(0);

  useEffect(() => {
    if (items.length > prevCount) {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }
    setPrevCount(items.length);
  }, [items.length, prevCount]);

  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className={`w-5 h-5 hover:text-shop_light_green hoverEffect ${bounce ? 'animate-bounce-in' : ''}`} />
      <span className={`absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-300 ${bounce ? 'scale-125' : 'scale-100'} hover:scale-110`}>
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;
