"use client";

import { useProduct } from "@/store/ProductContext";
import React, { useCallback, useEffect } from "react";

const ProductList = () => {
  const { listProducts, products, setProduct } = useProduct();

  useEffect(() => {
    listProducts({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5">
      {products?.map((product) => (
        <div key={product._id} className="" onClick={() => setProduct(product)}>
          {product.name}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
