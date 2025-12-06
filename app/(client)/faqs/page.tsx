"use client";

import Container from "@/components/Container";
import Title from "@/components/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Truck, CreditCard, RotateCcw, Headphones } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    id: "orders",
    title: "Orders & Shipping",
    icon: <Truck className="w-6 h-6" />,
    faqs: [
      {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive an email with a tracking number. You can also track your order by logging into your account and viewing your order history.",
      },
      {
        question: "What are the shipping options available?",
        answer: "We offer Standard Shipping (5-7 business days), Express Shipping (2-3 business days), and Same-Day Delivery in select areas. Shipping costs vary based on your location and order value.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping times and costs vary by location. Import duties and taxes may apply and are the responsibility of the customer.",
      },
      {
        question: "How long does delivery take?",
        answer: "Delivery times depend on your location and chosen shipping method. Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Pricing",
    icon: <CreditCard className="w-6 h-6" />,
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers.",
      },
      {
        question: "Can I pay in installments?",
        answer: "Yes, we offer installment payment options through our partner services like Affirm and Klarna for eligible orders. You can select this option at checkout.",
      },
      {
        question: "Why was my payment declined?",
        answer: "Payment can be declined for various reasons including insufficient funds, incorrect card details, or bank security measures. Please contact your bank or try a different payment method.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    icon: <RotateCcw className="w-6 h-6" />,
    faqs: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most products. Items must be unused, in original packaging, and with all accessories included. Some products like opened software or personalized items cannot be returned.",
      },
      {
        question: "How do I initiate a return?",
        answer: "To initiate a return, log into your account, go to your order history, select the order, and click 'Request Return'. You can also contact our customer service team for assistance.",
      },
      {
        question: "How long does it take to receive a refund?",
        answer: "Once we receive your returned item, we will inspect it and process your refund within 5-7 business days. The refund will be credited to your original payment method.",
      },
      {
        question: "Do you offer exchanges?",
        answer: "Yes, we offer exchanges for items of equal or greater value. If the new item costs more, you will need to pay the difference. Contact our support team to arrange an exchange.",
      },
    ],
  },
  {
    id: "products",
    title: "Products & Stock",
    icon: <ShoppingCart className="w-6 h-6" />,
    faqs: [
      {
        question: "Are all products genuine and original?",
        answer: "Yes, all products sold on Shop Matrix are 100% genuine and sourced directly from manufacturers or authorized distributors. We guarantee authenticity on every purchase.",
      },
      {
        question: "What if a product is out of stock?",
        answer: "If a product is out of stock, you can sign up for email notifications to be alerted when it becomes available again. You can also check back regularly as we restock popular items frequently.",
      },
      {
        question: "Do products come with warranty?",
        answer: "Yes, all products come with manufacturer warranty. Warranty periods vary by product and brand. Warranty information is displayed on each product page.",
      },
      {
        question: "Can I request a product that's not listed?",
        answer: "Yes! Contact our customer service team with your product request. We'll do our best to source it for you or suggest alternatives that meet your needs.",
      },
    ],
  },
  {
    id: "support",
    title: "Customer Support",
    icon: <Headphones className="w-6 h-6" />,
    faqs: [
      {
        question: "How can I contact customer support?",
        answer: "You can reach us via email at support@shopmatrix.com, phone at +1 (504) 958-6485, or through our live chat feature available on the website. Our team is available Monday-Saturday, 9 AM - 8 PM EST.",
      },
      {
        question: "What are your customer service hours?",
        answer: "Our customer service team is available Monday through Friday from 9:00 AM to 8:00 PM EST, and Saturday-Sunday from 10:00 AM to 6:00 PM EST.",
      },
      {
        question: "How do I report a problem with my order?",
        answer: "If you have any issues with your order, please contact our support team immediately with your order number and a description of the problem. We'll work to resolve it as quickly as possible.",
      },
      {
        question: "Can I change or cancel my order?",
        answer: "You can modify or cancel your order within 1 hour of placing it. After that, if the order hasn't shipped yet, contact our support team and we'll try our best to accommodate your request.",
      },
    ],
  },
];

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.faqs.length > 0);

  return (
    <Container className="py-10">
      <div className="text-center mb-12">
        <Title className="text-4xl mb-4">Frequently Asked Questions</Title>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Find answers to common questions about orders, shipping, returns, and more. 
          Can&apos;t find what you&apos;re looking for? Contact our support team.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 dark:bg-[#1e2768] dark:border-[#3ab8a3]/30 dark:text-white"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-[#1e2768] rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#3ab8a3]">{category.icon}</span>
              <h2 className="text-xl font-bold dark:text-white">{category.title}</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {category.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`${category.id}-${index}`}>
                  <AccordionTrigger className="text-left dark:text-white hover:text-[#3ab8a3]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Still Need Help */}
      <div className="mt-12 bg-[#1e2768] rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-gray-300 mb-6">
          Our customer support team is here to assist you with any questions or concerns.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="bg-[#3ab8a3] hover:bg-[#2d9a87] px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </a>
          <a
            href="mailto:support@shopmatrix.com"
            className="border border-[#3ab8a3] hover:bg-[#3ab8a3]/10 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Email Support
          </a>
        </div>
      </div>
    </Container>
  );
}
