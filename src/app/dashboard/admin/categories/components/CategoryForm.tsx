"use client";
import { CategoryContextType, useCategory } from "@/store/CategoryContext";
import React from "react";

const CategoryForm = () => {
  const {
    name,
    setName,
    updatingCategory,
    setUpdatingCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  }: CategoryContextType = useCategory();

  return (
    <div className="my-5">
      <form>
        <input
          type="text"
          value={updatingCategory ? updatingCategory?.name : name}
          onChange={(e) =>
            updatingCategory
              ? setUpdatingCategory({
                  ...updatingCategory,
                  name: e.target.value,
                })
              : setName(e.target.value)
          }
          className="form-control p-2 my-2"
        />
      </form>
    </div>
  );
};

export default CategoryForm;
