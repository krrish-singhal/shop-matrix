"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("Please sign in to subscribe to newsletter");
      setTimeout(() => router.push('/'), 1000);
      return;
    }

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubscribed(true);
        toast.success("🎉 Successfully subscribed to our newsletter!");
        setEmail("");
        setName("");
        
        // Reset after 5 seconds
        setTimeout(() => setSubscribed(false), 5000);
      } else {
        toast.error(result.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#161d53] dark:to-[#1e2768] py-16 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[#3ab8a3] rounded-full mb-6"
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to get exclusive deals, new arrivals, and special offers delivered to your inbox. 
            Plus, get <span className="text-[#3ab8a3] font-semibold">10% OFF</span> your first order!
          </p>

          {/* Subscription Form */}
          {!subscribed ? (
            <motion.form
              onSubmit={handleSubscribe}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <Input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-white dark:bg-[#1e2768] border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder:text-gray-500 px-5 py-6 text-base"
                />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white dark:bg-[#1e2768] border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder:text-gray-500 px-5 py-6 text-base"
                />
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-[#3ab8a3] hover:bg-[#2d9a87] text-white font-semibold px-8 py-6 text-base transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  "Subscribing..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Subscribe Now
                  </>
                )}
              </Button>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                🔒 Your email is safe with us. No spam, unsubscribe anytime.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md mx-auto bg-white dark:bg-white/10 backdrop-blur-sm border border-[#3ab8a3]/50 dark:border-[#3ab8a3]/30 rounded-lg p-8"
            >
              <CheckCircle2 className="w-16 h-16 text-[#3ab8a3] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                You&apos;re All Set! 🎉
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check your inbox for a welcome email with your exclusive discount code!
              </p>
            </motion.div>
          )}

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            {[
              { icon: "🔥", title: "Exclusive Deals", desc: "Member-only discounts" },
              { icon: "🎁", title: "New Arrivals", desc: "Be the first to know" },
              { icon: "💡", title: "Expert Tips", desc: "Shopping guides & more" },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h4 className="text-gray-800 dark:text-white font-semibold text-lg mb-1">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
