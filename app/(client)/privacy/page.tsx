import Container from "@/components/Container";
import Title from "@/components/Title";
import { Metadata } from "next";
import { Shield, Eye, Lock, Database, UserCheck, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Shop Matrix",
  description: "Learn how Shop Matrix collects, uses, and protects your personal information.",
};

const privacySections = [
  {
    icon: <Database className="w-8 h-8 text-[#3ab8a3]" />,
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, 
    make a purchase, or contact us. This may include your name, email address, shipping address, 
    phone number, and payment information.`,
  },
  {
    icon: <Eye className="w-8 h-8 text-[#3ab8a3]" />,
    title: "How We Use Your Information",
    content: `We use the information we collect to process your orders, communicate with you, 
    improve our services, and send you promotional materials (with your consent). We may also 
    use your information for fraud prevention and security purposes.`,
  },
  {
    icon: <Lock className="w-8 h-8 text-[#3ab8a3]" />,
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your 
    personal information against unauthorized access, alteration, disclosure, or destruction. 
    All payment transactions are encrypted using SSL technology.`,
  },
  {
    icon: <UserCheck className="w-8 h-8 text-[#3ab8a3]" />,
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal information. 
    You may also opt out of receiving marketing communications at any time. To exercise 
    these rights, please contact our privacy team.`,
  },
  {
    icon: <Bell className="w-8 h-8 text-[#3ab8a3]" />,
    title: "Cookies and Tracking",
    content: `We use cookies and similar technologies to enhance your experience on our website. 
    You can control cookie preferences through your browser settings. Some features may not 
    function properly if cookies are disabled.`,
  },
  {
    icon: <Shield className="w-8 h-8 text-[#3ab8a3]" />,
    title: "Third-Party Services",
    content: `We may share your information with trusted third-party service providers who 
    assist us in operating our website and conducting our business. These parties are 
    obligated to keep your information confidential.`,
  },
];

export default function PrivacyPage() {
  return (
    <Container className="py-10">
      <div className="text-center mb-12">
        <Title className="text-4xl mb-4">Privacy Policy</Title>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how we collect, use, and protect 
          your personal information when you use Shop Matrix.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Last updated: December 1, 2025
        </p>
      </div>

      {/* Privacy Sections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {privacySections.map((section, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1e2768] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              {section.icon}
              <h3 className="text-lg font-semibold dark:text-white">{section.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Detailed Sections */}
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">Information Collection Details</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We collect several types of information from and about users of our website:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li><strong>Personal Information:</strong> Name, email, phone number, shipping and billing addresses</li>
            <li><strong>Payment Information:</strong> Credit card details (processed securely by our payment providers)</li>
            <li><strong>Transaction Information:</strong> Purchase history, order details, and preferences</li>
            <li><strong>Technical Information:</strong> IP address, browser type, device information</li>
            <li><strong>Usage Information:</strong> Pages visited, time spent on site, click patterns</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">Data Retention</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We retain your personal information for as long as necessary to fulfill the purposes for 
            which it was collected, including satisfying legal, accounting, or reporting requirements. 
            You may request deletion of your data at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">Children&apos;s Privacy</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our website is not intended for children under 13 years of age. We do not knowingly 
            collect personal information from children under 13. If you are a parent or guardian 
            and believe we have collected information from your child, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">International Transfers</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your information may be transferred to and processed in countries other than your own. 
            We ensure that appropriate safeguards are in place to protect your information in 
            accordance with this privacy policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes 
            by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage 
            you to review this policy periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#3ab8a3] mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have questions or concerns about this privacy policy or our data practices, 
            please contact us:
          </p>
          <div className="bg-[#1e2768] p-6 rounded-lg text-white">
            <p>Privacy Officer: privacy@shopmatrix.com</p>
            <p>Phone: +12 958 648 597</p>
            <p>Address: 123 Tech Street, New Orleans, LA 70112</p>
          </div>
        </section>
      </div>
    </Container>
  );
}
