"use client";

import { useCategory } from "@/store/CategoryContext";
import { ProductContextType, useProduct } from "@/store/ProductContext";
import React, { useEffect } from "react";

const ProductForm = () => {
  const {
    name,
    setName,
    category,
    setCategory,
    product,
    setProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  }: ProductContextType = useProduct();
  const { listCategories, categories } = useCategory();

  useEffect(() => {
    listCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5">
      <form>
        <div className="col-12">
          <input
            type="text"
            value={product ? product?.name : name}
            onChange={(e) =>
              product
                ? setProduct({
                    ...product,
                    name: e.target.value,
                  })
                : setName(e.target.value)
            }
            className="form-control p-2 my-2"
          />
        </div>
        <div className="col-12">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)}
            value={product?.category ? (product?.category as string) : category}
          >
            <option value="">Select category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button
            className={`btn btn-${product ? "info" : "primary"}`}
            onClick={(e) => {
              e.preventDefault();
              product ? updateProduct() : createProduct();
            }}
            type="submit"
          >
            {product ? "Edit" : "Create"}
          </button>

          {product && (
            <>
              <button
                className="btn bg-danger text-light"
                onClick={(e) => {
                  e.preventDefault();
                  deleteProduct();
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-light"
                onClick={(e) => {
                  e.preventDefault();
                  setProduct(null);
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

export default ProductForm;
