import React from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

const DashboardProductsPage = () => {
  return (
    <div className="dashboard-categories">
      <div className="row">
        <div className="col">
          <h2 className="lead">Create Product</h2>
          <ProductForm />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="lead">List of Products</h2>
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default DashboardProductsPage;
