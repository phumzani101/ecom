import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "@/components/PageNavbar";
import PageProvider from "@/components/PageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecom",
  description: "Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageProvider>
          <PageNavbar />
          {children}
        </PageProvider>
      </body>
    </html>
  );
}
