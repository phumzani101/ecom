import React from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";

const DashboardCategoriesPage = () => {
  return (
    <div className="dashboard-categories">
      <div className="row">
        <div className="col">
          <h2 className="lead">Create Category</h2>
          <CategoryForm />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="lead">List of Categories</h2>
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default DashboardCategoriesPage;
