"use client";

import config from "@/config";
import { ProductType } from "@/models/ProductModel";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export type ProductContextType = {
  name: string;
  product: ProductType | null;
  setProduct: (value: any) => void;
  category: string;
  setCategory: (value: any) => void;
  setName: (value: any) => void;
  products: ProductType[];
  createProduct: () => void;
  getProduct: (productId: string) => void;
  listProducts: (value: any) => void;
  updateProduct: () => void;
  deleteProduct: () => void;
};

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //create a product
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  // list products
  const [products, setProducts] = useState<ProductType[]>([]);
  const [updatingProducts, setUpdatingProducts] = useState<ProductType | null>(
    null
  );
  // update and delete
  const [product, setProduct] = useState<ProductType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [uploading, setUploading] = useState(false);

  const getProduct = async () => {
    try {
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const listProducts = async ({ page = 1 }) => {
    try {
      const res = await fetch(`${config.apiUrl}/admin/products?page=${page}`, {
        method: "GET",
      });

      const data: {
        products: ProductType[];
        message: string;
        totalPages: number;
        page: number;
        error: string;
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        setProducts(data?.products);
        setCurrentPage(data?.page);
        setTotalPages(data?.totalPages);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const createProduct = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/admin/products`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(product),
      });

      const data: { product: ProductType; message: string; error: string } =
        await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setName("");
        setCategory("");
        setProducts([data?.product, ...products]);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const updateProduct = async () => {
    try {
      const res = await fetch(
        `${config.apiUrl}/admin/products/${product?._id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      const data: {
        product: ProductType;
        message: string;
        error: string;
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setProducts(
          products.map((cat) => (cat._id === product?._id ? data.product : cat))
        );
        setName("");
        setProduct(null);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const deleteProduct = async () => {
    try {
      const res = await fetch(
        `${config.apiUrl}/admin/products/${product?._id}`,
        {
          method: "DELETE",
        }
      );

      const data: {
        product: ProductType;
        message: string;
        error: string;
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setProducts(products.filter((cat) => cat._id !== product?._id));
        setName("");
        setProduct(null);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        name,
        setName,
        category,
        setCategory,
        product,
        setProduct,
        products,
        createProduct,
        getProduct,
        listProducts,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const currentContext = useContext(ProductContext);

  if (!currentContext) {
    throw new Error(
      "useProduct has to be used within <ProductContext.Provider>"
    );
  }

  return currentContext;
};
