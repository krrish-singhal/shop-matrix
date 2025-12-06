"use client";
import { productType } from "@/constants/data";
import Link from "next/link";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center flex-wrap gap-5 justify-between">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <div className="flex items-center gap-1.5 md:gap-3">
          {productType?.map((item) => (
            item.value === "others" ? (
              <Link
                key={item?.title}
                href="/shop"
                className="border border-[#3ab8a3]/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-[#3ab8a3] hover:border-[#3ab8a3] hover:text-white hoverEffect bg-[#3ab8a3]/10 text-white"
              >
                {item?.title}
              </Link>
            ) : (
              <button
                onClick={() => onTabSelect(item?.title)}
                key={item?.title}
                className={`border border-[#3ab8a3]/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-[#3ab8a3] hover:border-[#3ab8a3] hover:text-white hoverEffect ${selectedTab === item?.title ? "bg-[#3ab8a3] text-white border-[#3ab8a3]" : "bg-[#3ab8a3]/10 text-white"}`}
              >
                {item?.title}
              </button>
            )
          ))}
        </div>
      </div>
      <Link
        href={"/shop"}
        className="border border-[#3ab8a3] text-white px-4 py-1 rounded-full hover:bg-[#3ab8a3] hover:border-[#3ab8a3] hoverEffect"
      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabbar;
