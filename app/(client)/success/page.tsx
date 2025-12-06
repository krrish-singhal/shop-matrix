"use client";

import useStore from "@/store";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const SuccessPageContent = () => {
  const { resetCart, getGroupedItems } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const { user } = useUser();
  const [emailSent, setEmailSent] = useState(false);
  const [cartItems, setCartItems] = useState<Array<{ product: unknown; quantity: number }>>([]);

  // Store cart items before resetting
  useEffect(() => {
    if (orderNumber) {
      const items = getGroupedItems();
      setCartItems(items);
      resetCart();
    }
  }, [orderNumber, resetCart, getGroupedItems]);

  useEffect(() => {
    const sendOrderEmail = async () => {
      if (!orderNumber || !user || emailSent || cartItems.length === 0) return;

      const userEmail = user.emailAddresses?.[0]?.emailAddress;
      const userName = user.fullName || user.firstName || "Customer";

      if (!userEmail) {
        console.error("No user email found");
        return;
      }

      try {
        console.log("📧 Sending order confirmation email to:", userEmail);
        console.log("Order Number:", orderNumber);

        const response = await fetch("/api/send-order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderNumber,
            customerEmail: userEmail,
            customerName: userName,
            cartItems: cartItems,
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          console.log("✅ Order confirmation email sent successfully!");
          console.log("📧 Message ID:", result.messageId);
          setEmailSent(true);
        } else {
          console.error("❌ Failed to send email:", result);
        }
      } catch (error) {
        console.error("❌ Error sending order email:", error);
      }
    };

    sendOrderEmail();
  }, [orderNumber, user, emailSent, cartItems]);
  return (
    <div className="py-20 bg-white dark:bg-[#161d53] min-h-screen flex items-center justify-center mx-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#1e2768] rounded-2xl flex flex-col gap-8 shadow-2xl p-8 max-w-xl w-full text-center border border-gray-200 dark:border-[#3ab8a3]/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-[#3ab8a3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Check className="text-white w-12 h-12 stroke-[3]" />
        </motion.div>

        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
          Order Confirmed!
        </h1>
        <div className="space-y-4 mb-6 text-left">
          <p className="text-gray-700 dark:text-gray-300 text-base">
            Thank you for your purchase. We&apos;re processing your order and
            will ship it soon. A confirmation email with your order details will
            be sent to your inbox shortly.
          </p>
          <div className="bg-gray-50 dark:bg-[#161d53] p-4 rounded-lg border border-gray-200 dark:border-[#3ab8a3]/30">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
              Order Number:
            </p>
            <p className="text-black dark:text-white font-bold text-lg font-mono">
              {orderNumber}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/"
            className="flex items-center justify-center px-6 py-3 font-semibold bg-[#3ab8a3] dark:bg-[#3ab8a3] text-white rounded-lg hover:bg-[#2d9a87] dark:hover:bg-[#2d9a87] transition-all duration-300 shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center px-6 py-3 font-semibold bg-white dark:bg-[#161d53] text-[#3ab8a3] dark:text-white border-2 border-[#3ab8a3] dark:border-[#3ab8a3] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a2460] transition-all duration-300 shadow-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Orders
          </Link>
          <Link
            href="/shop"
            className="flex items-center justify-center px-6 py-3 font-semibold bg-[#3ab8a3] dark:bg-[#3ab8a3] text-white rounded-lg hover:bg-[#2d9a87] dark:hover:bg-[#2d9a87] transition-all duration-300 shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
