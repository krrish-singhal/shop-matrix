"use client";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  // Theme state - syncs with ThemeToggle via localStorage and dark class
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]); // Optional: select first address if no default
      }
    } catch (error) {
      console.log("Addresses fetching error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Sync theme state with localStorage and document class
  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      const isDarkMode = savedTheme === "dark" || document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };
    
    // Initial check
    checkTheme();
    
    // Listen for storage changes (when theme is toggled)
    window.addEventListener("storage", checkTheme);
    
    // Also observe class changes on document
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    return () => {
      window.removeEventListener("storage", checkTheme);
      observer.disconnect();
    };
  }, []);
  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };
  // Theme-based classes
  const bgMain = isDark ? "bg-[#161d53]" : "bg-gray-50";
  const bgCard = isDark ? "bg-[#1e2563] border-[#2d3a8c]" : "bg-white border-gray-200";
  const textMain = isDark ? "text-white" : "text-black";
  const textSecondary = isDark ? "text-gray-300" : "text-black/60";
  const cardShadow = isDark ? "shadow-lg shadow-black/20" : "shadow-lg shadow-gray-100";
  return (
    <div className={`${bgMain} pb-52 md:pb-10 min-h-screen transition-colors duration-300`}>
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className={`flex items-center gap-2 py-5 ${textMain}`}>
                <ShoppingBag className={isDark ? "text-white" : "text-darkColor"} />
                <Title className={textMain}>Shopping Cart</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-lg">
                  <div className={`border rounded-md ${bgCard} ${cardShadow} transition-colors duration-300`}>
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                        >
                          <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md
                                 overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className={`text-base font-semibold line-clamp-1 ${textMain}`}>
                                  {product?.name}
                                </h2>
                                <p className={`text-sm capitalize ${textSecondary}`}>
                                  Variant:{" "}
                                  <span className={textMain + " font-semibold"}>
                                    {product?.variant}
                                  </span>
                                </p>
                                <p className={`text-sm capitalize ${textSecondary}`}>
                                  Status:{" "}
                                  <span className={textMain + " font-semibold"}>
                                    {product?.status}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <ProductSideMenu
                                        product={product}
                                        className="relative top-0 right-0"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold">
                                      Add to Favorite
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() => {
                                          deleteCartProduct(product?._id);
                                          toast.success(
                                            "Product deleted successfully!"
                                          );
                                        }}
                                        className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold bg-red-600">
                                      Delete product
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className={`font-bold text-lg ${textMain}`}
                            />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold bg-red-900 hover:bg-red-800 !text-white"
                      variant="destructive"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="lg:col-span-1">
                    <div className={`hidden md:inline-block w-full rounded-lg border p-6 ${bgCard} ${cardShadow} transition-colors duration-300`}>
                      <h2 className={`text-xl font-semibold mb-4 ${textMain}`}>
                        Order Summary
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={textMain}>SubTotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} className={textMain} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={textMain}>Discount</span>
                          <PriceFormatter
                            amount={getSubTotalPrice() - getTotalPrice()}
                            className={textMain}
                          />
                        </div>
                        <Separator className={isDark ? "bg-gray-700" : ""} />
                        <div className={`flex items-center justify-between font-semibold text-lg ${textMain}`}>
                          <span>Total</span>
                          <PriceFormatter
                            amount={getTotalPrice()}
                            className={`text-lg font-bold ${textMain}`}
                          />
                        </div>
                        <Button
                          className={`w-full rounded-full font-semibold tracking-wide hoverEffect ${isDark ? "bg-shop_dark_green text-white hover:bg-[#3ab8a3]" : ""}`}
                          size="lg"
                          disabled={loading}
                          onClick={handleCheckout}
                        >
                          {loading ? "Please wait..." : "Proceed to Checkout"}
                        </Button>
                      </div>
                    </div>
                    {addresses && (
                      <div className={`rounded-md mt-5 ${bgCard} ${cardShadow} transition-colors duration-300`}>
                        <Card className={bgCard}>
                          <CardHeader>
                            <CardTitle className={textMain}>Delivery Address</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              defaultValue={addresses
                                ?.find((addr) => addr.default)
                                ?._id.toString()}
                            >
                              {addresses?.map((address) => (
                                <div
                                  key={address?._id}
                                  onClick={() => setSelectedAddress(address)}
                                  className={`flex items-center space-x-2 mb-4 cursor-pointer ${selectedAddress?._id === address?._id && "text-shop_dark_green"} ${textMain}`}
                                >
                                  <RadioGroupItem
                                    value={address?._id.toString()}
                                  />
                                  <Label
                                    htmlFor={`address-${address?._id}`}
                                    className="grid gap-1.5 flex-1"
                                  >
                                    <span className={`font-semibold ${textMain}`}>
                                      {address?.name}
                                    </span>
                                    <span className={`text-sm ${textSecondary}`}>
                                      {address.address}, {address.city},{" "}
                                      {address.state} {address.zip}
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <Button variant="outline" className={`w-full rounded-full font-semibold tracking-wide hoverEffect ${isDark ? "bg-shop_dark_green  hover:text-white hover:bg-[#3ab8a3]" : ""}`}>
                              Add New Address
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
                {/* Order summary for mobile view */}
                <div className={`md:hidden fixed bottom-0 left-0 w-full pt-2 ${bgCard} transition-colors duration-300`}>
                  <div className={`p-4 rounded-lg border mx-4 ${bgCard} ${cardShadow}`}>
                    <h2 className={textMain}>Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={textMain}>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} className={textMain} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={textMain}>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                          className={textMain}
                        />
                      </div>
                      <Separator className={isDark ? "bg-gray-700" : ""} />
                      <div className={`flex items-center justify-between font-semibold text-lg ${textMain}`}>
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className={`text-lg font-bold ${textMain}`}
                        />
                      </div>
                      <Button
                        className={`w-full rounded-full font-semibold tracking-wide hoverEffect ${isDark ? "bg-shop_dark_green text-white hover:bg-green-700" : ""}`}
                        size="lg"
                        disabled={loading}
                        onClick={handleCheckout}
                      >
                        {loading ? "Please wait..." : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;
