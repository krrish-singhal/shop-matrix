"use client";

import Container from "@/components/Container";
import Title from "@/components/Title";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  ShoppingBag,
  CreditCard,
  Truck,
  Settings,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const helpTopics = [
  {
    icon: <ShoppingBag className="w-8 h-8 text-[#3ab8a3]" />,
    title: "Shopping Guide",
    description: "Learn how to browse, search, and purchase products",
    links: [
      { title: "How to create an account", href: "/faqs#account" },
      { title: "Searching for products", href: "/faqs#products" },
      { title: "Adding items to cart", href: "/faqs#cart" },
      { title: "Applying discount codes", href: "/faqs#discounts" },
    ],
  },
  {
    icon: <CreditCard className="w-8 h-8 text-[#3ab8a3]" />,
    title: "Payment Help",
    description: "Information about payment methods and billing",
    links: [
      { title: "Accepted payment methods", href: "/faqs#payments" },
      { title: "Payment security", href: "/faqs#payments" },
      { title: "Installment options", href: "/faqs#payments" },
      { title: "Billing issues", href: "/contact" },
    ],
  },
  {
    icon: <Truck className="w-8 h-8 text-[#3ab8a3]" />,
    title: "Shipping & Delivery",
    description: "Track orders and understand delivery options",
    links: [
      { title: "Shipping options", href: "/faqs#orders" },
      { title: "Track your order", href: "/orders" },
      { title: "International shipping", href: "/faqs#orders" },
      { title: "Delivery issues", href: "/contact" },
    ],
  },
  {
    icon: <Settings className="w-8 h-8 text-[#3ab8a3]" />,
    title: "Account Management",
    description: "Manage your account settings and preferences",
    links: [
      { title: "Update profile information", href: "/faqs#account" },
      { title: "Change password", href: "/faqs#account" },
      { title: "Email preferences", href: "/faqs#account" },
      { title: "Delete account", href: "/contact" },
    ],
  },
];

const quickActions = [
  { title: "Track My Order", href: "/orders", icon: <Truck className="w-5 h-5" /> },
  { title: "Return an Item", href: "/faqs#returns", icon: <ShoppingBag className="w-5 h-5" /> },
  { title: "Contact Support", href: "/contact", icon: <MessageCircle className="w-5 h-5" /> },
  { title: "View FAQs", href: "/faqs", icon: <BookOpen className="w-5 h-5" /> },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/faqs?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <Container className="py-10">
      {/* Hero Section */}
      <div className="bg-[#1e2768] dark:bg-[#1e2768] light:bg-gray-100 rounded-lg p-10 text-center text-white dark:text-white light:text-black mb-12">
        <Title className="text-4xl mb-4 text-white dark:text-white light:text-black">How Can We Help?</Title>
        <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-8 max-w-2xl mx-auto">
          Search our help center or browse topics below to find the answers you need.
        </p>
        <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-24 py-6 text-lg bg-white dark:bg-[#161d53] light:bg-white text-black dark:text-white light:text-black border-0"
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#3ab8a3] hover:bg-[#2d9a87]"
          >
            Search
          </Button>
        </form>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="bg-white dark:bg-[#1e2768] light:bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-3 group border dark:border-transparent light:border-gray-200"
          >
            <span className="text-[#3ab8a3]">{action.icon}</span>
            <span className="font-medium text-black dark:text-white light:text-black group-hover:text-[#3ab8a3] transition-colors">
              {action.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Help Topics */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white light:text-black">Browse Help Topics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {helpTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1e2768] light:bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border dark:border-transparent light:border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                {topic.icon}
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white light:text-black">{topic.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 light:text-gray-500">{topic.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {topic.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="flex items-center text-gray-600 dark:text-gray-300 light:text-gray-600 hover:text-[#3ab8a3] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-[#1e2768] to-[#3ab8a3] rounded-lg p-8 text-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-gray-200 mb-6">
              Our dedicated support team is available to assist you with any questions 
              or issues you may have. We typically respond within 24 hours.
            </p>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Live Chat: Available 9 AM - 8 PM EST
              </p>
              <p className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Email: support@shopmatrix.com
              </p>
              <p className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Phone: +1 (504) 958-6485
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Link
              href="/contact"
              className="bg-white text-[#1e2768] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white light:text-black">Popular Help Articles</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "How to track your order", href: "/faqs#orders" },
            { title: "Return and refund policy", href: "/faqs#returns" },
            { title: "Payment methods accepted", href: "/faqs#payments" },
            { title: "Shipping times and costs", href: "/faqs#orders" },
            { title: "How to apply discount codes", href: "/faqs#discounts" },
            { title: "Product warranty information", href: "/faqs#products" },
          ].map((article, index) => (
            <Link
              key={index}
              href={article.href}
              className="bg-white dark:bg-[#1e2768] light:bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between group border dark:border-transparent light:border-gray-200"
            >
              <span className="text-black dark:text-white light:text-black group-hover:text-[#3ab8a3] transition-colors">
                {article.title}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#3ab8a3] transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
