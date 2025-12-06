"use client";

import React, { useState } from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, rating }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thank you for your feedback! We appreciate it.");
        setFeedback("");
        setRating(0);
      } else {
        toast.error(data.error || "Failed to send feedback. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#161d53] dark:bg-[#161d53] light:bg-white border-t border-[#3ab8a3]/20 light:border-gray-200 animate-fade-in-up">
      <Container className="text-black dark:text-white light:text-black">
        <div className="mt-8" />
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 animate-fade-in-left">
            <Logo />
            <SubText className="text-white dark:text-white light:text-black transition-all duration-300 hover:text-[#3ab8a3]">
              Discover curated electronics and gadgets at ShopMatrix, blending
              quality and innovation to elevate your tech lifestyle.
            </SubText>
            <SocialMedia
              className="text-white/60 dark:text-white/60 light:text-black/60"
              iconClassName="border-white/60 dark:border-white/60 light:border-black/60 hover:border-[#3ab8a3] hover:text-[#3ab8a3] transition-all duration-300 hover:scale-110 hover:rotate-12"
              tooltipClassName="bg-black dark:bg-[#232b5c] light:bg-white text-white dark:text-white light:text-black"
            />
          </div>
          <div className="animate-fade-in-up delay-200">
            <SubTitle className="text-white dark:text-white light:text-black">Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item, index) => (
                <li key={item?.title} className="animate-fade-in-left" style={{ animationDelay: `${index * 50}ms` }}>
                  <Link
                    href={item?.href}
                    className="text-white dark:text-white light:text-black hover:text-[#3ab8a3] hoverEffect font-medium transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 animate-fade-in-right delay-300">
            <SubTitle className="text-white dark:text-white light:text-black">Share Your Feedback</SubTitle>
            <SubText className="text-white dark:text-white light:text-black">
              We value your opinion! Let us know how we&apos;re doing
            </SubText>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <textarea 
                placeholder="Enter your feedback..." 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required 
                rows={4}
                className="w-full px-4 py-3 rounded-md bg-white dark:bg-[#232b5c] border border-gray-300 dark:border-[#3ab8a3]/30 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3ab8a3] transition-all duration-300"
              />
              <div className="space-y-2">
                <SubText className="text-white dark:text-white light:text-black text-sm">Rate your experience:</SubText>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="text-3xl transition-all duration-200 hover:scale-125 focus:outline-none"
                    >
                      <span className={`${
                        star <= (hoveredRating || rating) 
                          ? 'text-[#fbbf24]' 
                          : 'text-gray-400 dark:text-gray-600'
                      }`}>
                        {star <= (hoveredRating || rating) ? '⭐' : '☆'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3ab8a3] hover:bg-[#2d9a87] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {isSubmitting ? "Sending..." : "Give Feedback"}
              </Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t border-[#3ab8a3]/20 text-center text-sm text-white dark:text-white light:text-black">
          <div>
            © {new Date().getFullYear()} ShopMatrix All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
