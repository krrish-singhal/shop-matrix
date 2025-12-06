"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`,
        {
          duration: 2000,
          style: {
            background: '#3ab8a3',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#3ab8a3',
          },
        }
      );
    } else {
      toast.error("Can not add more than available stock", {
        duration: 2000,
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
    }
  };
  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="text-sm w-full animate-fade-in-up">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t border-[#3ab8a3]/20 pt-1">
            <span className="text-xs font-semibold text-white">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
              className="text-[#3ab8a3] transition-all duration-300 hover:scale-110"
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-[#3ab8a3] text-white shadow-none border border-[#3ab8a3] font-semibold tracking-wide hover:bg-[#2d9785] hover:border-[#2d9785] hoverEffect transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#3ab8a3]/30",
            isOutOfStock && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <ShoppingBag className="transition-transform group-hover:rotate-12" /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
