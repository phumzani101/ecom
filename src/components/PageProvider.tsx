"use client";
import { CategoryProvider } from "@/store/CategoryContext";
import { ProductProvider } from "@/store/ProductContext";
import { TagProvider } from "@/store/TagContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const PageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CategoryProvider>
        <TagProvider>
          <ProductProvider>
            {children}
            <Toaster />
          </ProductProvider>
        </TagProvider>
      </CategoryProvider>
    </SessionProvider>
  );
};

export default PageProvider;
