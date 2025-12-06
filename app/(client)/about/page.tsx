import Container from "@/components/Container";
import Title from "@/components/Title";
import { Metadata } from "next";
import Image from "next/image";
import { Users, Target, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Shop Matrix",
  description: "Learn more about Shop Matrix - Your trusted destination for quality electronics and gadgets.",
};

const teamMembers = [
  {
    name: "John Smith",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
  },
  {
    name: "Michael Chen",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Emily Davis",
    role: "Customer Success",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
];

const values = [
  {
    icon: <Users className="w-10 h-10 text-[#3ab8a3]" />,
    title: "Customer First",
    description: "We prioritize our customers' needs and strive to exceed their expectations with every interaction.",
  },
  {
    icon: <Target className="w-10 h-10 text-[#3ab8a3]" />,
    title: "Quality Products",
    description: "We carefully curate our product selection to ensure only the best quality reaches our customers.",
  },
  {
    icon: <Award className="w-10 h-10 text-[#3ab8a3]" />,
    title: "Excellence",
    description: "We are committed to excellence in everything we do, from product sourcing to customer service.",
  },
  {
    icon: <Heart className="w-10 h-10 text-[#3ab8a3]" />,
    title: "Integrity",
    description: "We operate with transparency and honesty, building trust with our customers and partners.",
  },
];

export default function AboutPage() {
  return (
    <Container className="py-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Title className="text-4xl mb-4">About Shop Matrix</Title>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
          Welcome to Shop Matrix, your premier destination for cutting-edge electronics and gadgets. 
          Since our founding, we&apos;ve been dedicated to bringing you the latest technology at competitive prices.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-[#3ab8a3] mb-4">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Shop Matrix was founded with a simple mission: to make quality electronics accessible to everyone. 
            What started as a small online store has grown into a trusted e-commerce platform serving thousands 
            of customers worldwide.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our team of tech enthusiasts carefully selects each product in our catalog, ensuring that every 
            item meets our high standards for quality, performance, and value. We believe that great technology 
            should be within everyone&apos;s reach.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Today, we continue to expand our product range and improve our services, always keeping our 
            customers&apos; needs at the heart of everything we do.
          </p>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop"
            alt="Shop Matrix Team"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-[#3ab8a3] mb-10">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-[#1e2768] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-[#3ab8a3] mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold dark:text-white">{member.name}</h3>
              <p className="text-[#3ab8a3]">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#1e2768] rounded-lg p-10 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-[#3ab8a3]">10K+</p>
            <p className="text-gray-300">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#3ab8a3]">500+</p>
            <p className="text-gray-300">Products</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#3ab8a3]">50+</p>
            <p className="text-gray-300">Brands</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#3ab8a3]">24/7</p>
            <p className="text-gray-300">Support</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
