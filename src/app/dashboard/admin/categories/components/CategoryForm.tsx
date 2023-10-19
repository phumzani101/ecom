"use client";
import { CategoryContextType, useCategory } from "@/store/CategoryContext";
import React from "react";

const CategoryForm = () => {
  const {
    name,
    setName,
    category,
    setCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  }: CategoryContextType = useCategory();

  return (
    <div className="my-5">
      <form>
        <input
          type="text"
          value={category ? category?.name : name}
          onChange={(e) =>
            category
              ? setCategory({
                  ...category,
                  name: e.target.value,
                })
              : setName(e.target.value)
          }
          className="form-control p-2 my-2"
        />

        <div className="d-flex justify-content-between">
          <button
            className={`btn btn-${category ? "info" : "primary"}`}
            onClick={(e) => {
              e.preventDefault();
              category ? updateCategory() : createCategory();
            }}
            type="submit"
          >
            {category ? "Edit" : "Create"}
          </button>

          {category && (
            <>
              <button
                className="btn bg-danger text-light"
                onClick={(e) => {
                  e.preventDefault();
                  deleteCategory();
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-light"
                onClick={(e) => {
                  e.preventDefault();
                  setCategory(null);
                }}
              >
                Clear
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
