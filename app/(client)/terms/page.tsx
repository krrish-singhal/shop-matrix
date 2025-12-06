import Container from "@/components/Container";
import Title from "@/components/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Shop Matrix",
  description: "Read our terms and conditions for using Shop Matrix services.",
};

export default function TermsPage() {
  return (
    <Container className="py-10">
      <Title className="text-4xl mb-8">Terms & Conditions</Title>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Last updated: December 1, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Welcome to Shop Matrix. These Terms and Conditions govern your use of our website and services. 
            By accessing or using our website, you agree to be bound by these terms. If you disagree with 
            any part of these terms, you may not access our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">2. Use of Our Services</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You must be at least 18 years old to use our services. By using our website, you represent 
            that you are at least 18 years of age. You are responsible for maintaining the confidentiality 
            of your account and password.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>You agree to provide accurate and complete information when creating an account</li>
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must notify us immediately of any unauthorized use of your account</li>
            <li>We reserve the right to terminate accounts that violate these terms</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">3. Products and Pricing</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All products displayed on our website are subject to availability. Prices are subject to change 
            without notice. We strive to display accurate product information, but we do not warrant that 
            descriptions are error-free.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Prices are displayed in USD unless otherwise stated</li>
            <li>We reserve the right to limit quantities of any products</li>
            <li>Promotional offers may be subject to additional terms</li>
            <li>We may refuse or cancel any order for any reason</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">4. Orders and Payment</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            By placing an order, you are making an offer to purchase products. We reserve the right to 
            accept or decline your order. Payment must be received before order processing begins.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>We accept major credit cards and other payment methods as displayed</li>
            <li>All payments are processed securely through our payment partners</li>
            <li>You agree to pay all charges incurred by you or your account</li>
            <li>We are not responsible for unauthorized transactions on your payment method</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">5. Shipping and Delivery</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Shipping times and costs vary depending on your location and chosen shipping method. 
            We are not responsible for delays caused by shipping carriers or customs.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Estimated delivery times are not guaranteed</li>
            <li>Risk of loss passes to you upon delivery to the carrier</li>
            <li>International orders may be subject to import duties and taxes</li>
            <li>Free shipping may be available for qualifying orders</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">6. Returns and Refunds</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We offer a 30-day return policy for most products. Items must be returned in original 
            condition with all packaging and accessories. Some items may not be eligible for return.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Refunds will be processed to the original payment method</li>
            <li>Return shipping costs may be the responsibility of the customer</li>
            <li>Damaged or defective items will be replaced or refunded</li>
            <li>Please contact customer service to initiate a return</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">7. Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All content on our website, including text, graphics, logos, and images, is the property 
            of Shop Matrix and is protected by copyright and trademark laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Shop Matrix shall not be liable for any indirect, incidental, special, or consequential 
            damages arising from your use of our services. Our liability is limited to the amount 
            you paid for the product or service in question.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">9. Changes to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We reserve the right to modify these terms at any time. Changes will be effective 
            immediately upon posting to our website. Continued use of our services after changes 
            constitutes acceptance of the modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">10. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <div className="bg-[#1e2768] p-6 rounded-lg text-white">
            <p>Email: legal@shopmatrix.com</p>
            <p>Phone: +1 (504) 958-6485</p>
            <p>Address: 123 Tech Street, New Orleans, LA 70112</p>
          </div>
        </section>
      </div>
    </Container>
  );
}
