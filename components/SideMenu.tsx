import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  
  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };
  
  return (
    <div
      className="fixed inset-0 z-50 w-full h-screen bg-black/50 text-white/70 shadow-xl transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={sidebarRef}
        className={`min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop_light_green flex flex-col gap-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button
            onClick={handleClose}
            className="hover:text-shop_light_green hoverEffect z-50 p-2"
            type="button"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              className={`hover:text-shop_light_green hoverEffect ${
                pathname === item?.href && "text-white"
              }`}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
