"use client";
import { useCategory } from "@/store/CategoryContext";
import React, { useCallback, useEffect } from "react";

const CategoryList = () => {
  const { listCategories, categories, setCategory } = useCategory();

  useEffect(() => {
    listCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5">
      {categories?.map((cat) => (
        <div key={cat._id} className="" onClick={() => setCategory(cat)}>
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
