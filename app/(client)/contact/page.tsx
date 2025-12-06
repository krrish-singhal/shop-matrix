"use client";

import Container from "@/components/Container";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6 text-[#3ab8a3]" />,
    title: "Visit Us",
    details: ["123 Tech Street", "New Orleans, LA 70112", "United States"],
  },
  {
    icon: <Phone className="w-6 h-6 text-[#3ab8a3]" />,
    title: "Call Us",
    details: ["+1 (504) 958-6485", "+1 (504) 123-4567"],
  },
  {
    icon: <Mail className="w-6 h-6 text-[#3ab8a3]" />,
    title: "Email Us",
    details: ["support@shopmatrix.com", "sales@shopmatrix.com"],
  },
  {
    icon: <Clock className="w-6 h-6 text-[#3ab8a3]" />,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 8:00 PM", "Sat - Sun: 10:00 AM - 6:00 PM"],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-10">
      {/* Header */}
      <div className="text-center mb-16">
        <Title className="text-4xl mb-4">Contact Us</Title>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have a question or need assistance? We&apos;re here to help! Reach out to us through any of the 
          channels below or fill out the contact form.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1e2768] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              {info.icon}
              <h3 className="text-lg font-semibold dark:text-white">{info.title}</h3>
            </div>
            {info.details.map((detail, idx) => (
              <p key={idx} className="text-gray-600 dark:text-gray-300 text-sm">
                {detail}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Contact Form & Map */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white dark:bg-[#1e2768] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Your Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="dark:bg-[#161d53] dark:border-[#3ab8a3]/30 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Your Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="dark:bg-[#161d53] dark:border-[#3ab8a3]/30 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Subject
              </label>
              <Input
                type="text"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="dark:bg-[#161d53] dark:border-[#3ab8a3]/30 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Message
              </label>
              <Textarea
                placeholder="Tell us more about your inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="dark:bg-[#161d53] dark:border-[#3ab8a3]/30 dark:text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#3ab8a3] hover:bg-[#2d9a87] text-white"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Map */}
        <div className="bg-white dark:bg-[#1e2768] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-6">Find Us</h2>
          <div className="w-full h-80 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110541.95573887389!2d-90.13547369999999!3d29.9510658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a454b2118265%3A0xdb065be85e22d3b4!2sNew%20Orleans%2C%20LA%2C%20USA!5e0!3m2!1sen!2sin!4v1701234567890!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
            Visit our store for a hands-on experience with our products. Our friendly staff is ready to 
            assist you with any questions.
          </p>
        </div>
      </div>
    </Container>
  );
}
