import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: {
    template: "%s - ShopMatrix online store",
    default: "ShopMatrix online store",
  },
  description: "ShopMatrix online store, Your one stop shop for all your needs",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#161d53]">
        <Header />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
