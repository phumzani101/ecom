"use client";

import config from "@/config";
import { CategoryType } from "@/models/CategoryModel";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export type CategoryContextType = {
  name: string;
  updatingCategory: CategoryType | null;
  setUpdatingCategory: (value: any) => void;
  setName: (value: any) => void;
  categories: CategoryType[];
  createCategory: () => void;
  getCategory: (categoryId: string) => void;
  listCategories: () => void;
  updateCategory: () => void;
  deleteCategory: () => void;
};

export const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //create a category
  const [name, setName] = useState("");
  // list categories
  const [categories, setCategories] = useState<CategoryType[]>([]);
  // update and delete
  const [updatingCategory, setUpdatingCategory] = useState<CategoryType | null>(
    null
  );

  const getCategory = async () => {
    try {
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const listCategories = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/admin/categories`);

      const data: {
        categories: CategoryType[];
        message: string;
        error: string;
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        setCategories(data?.categories);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const createCategory = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/admin/categories`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data: { category: CategoryType; message: string; error: string } =
        await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setName("");
        setCategories([data?.category, ...categories]);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const updateCategory = async () => {
    try {
      const res = await fetch(
        `${config.apiUrl}/admin/categories/${updatingCategory?._id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );

      const data: {
        category: CategoryType;
        message: string;
        error: string;
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setCategories(
          categories.map((cat) =>
            cat._id === updatingCategory?._id ? data.category : cat
          )
        );
        setName("");
        setUpdatingCategory(null);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const deleteCategory = async () => {
    try {
      const res = await fetch(
        `${config.apiUrl}/admin/categories/${updatingCategory?._id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        }
      );

      const data: {
        category: CategoryType;
        message: string;
        error: string;
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setCategories(
          categories.filter((cat) => cat._id !== updatingCategory?._id)
        );
        setName("");
        setUpdatingCategory(null);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        updatingCategory,
        setUpdatingCategory,
        categories,
        createCategory,
        getCategory,
        listCategories,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const currentContext = useContext(CategoryContext);

  if (!currentContext) {
    throw new Error(
      "useCategory has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentContext;
};
