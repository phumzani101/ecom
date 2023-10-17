"use client";
import { CategoryProvider } from "@/store/CategoryContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const PageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CategoryProvider>
        {children}
        <Toaster />
      </CategoryProvider>
    </SessionProvider>
  );
};

export default PageProvider;
