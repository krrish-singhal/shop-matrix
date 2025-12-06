import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }

  return (
    <header className="sticky top-0 z-50 py-5 bg-[#161d53]/95 dark:bg-[#161d53]/95 light:bg-white/95 backdrop-blur-md border-b border-[#3ab8a3]/20 animate-slide-in-down shadow-lg">
      <Container className="flex items-center justify-between text-white dark:text-white light:text-[#161d53]">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0 animate-fade-in-left">
          <MobileMenu />
          <Logo />
        </div>
        <div className="animate-fade-in-down delay-200">
          <HeaderMenu />
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5 animate-fade-in-right">
          <div className="transition-all duration-300 hover:scale-110">
            <SearchBar />
          </div>
          <div className="transition-all duration-300 hover:scale-110 hover:rotate-12">
            <ThemeToggle />
          </div>
          <div className="transition-all duration-300 hover:scale-110">
            <CartIcon />
          </div>
          <div className="transition-all duration-300 hover:scale-110">
            <FavoriteButton />
          </div>

          {user && (
            <Link
              href={"/orders"}
              className="group relative hover:text-shop_light_green hoverEffect transition-all duration-300 hover:scale-110"
            >
              <Logs />
              <span className="absolute -top-1 -right-1 bg-shop_btn_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center animate-pulse-glow">
                {orders?.length ? orders?.length : 0}
              </span>
            </Link>
          )}

          <ClerkLoaded>
            <SignedIn>
              <div className="transition-all duration-300 hover:scale-110">
                <UserButton />
              </div>
            </SignedIn>
            {!user && <SignIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
