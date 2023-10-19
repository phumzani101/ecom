import React from "react";
import TagForm from "./components/TagForm";
import TagList from "./components/TagList";

const DashboardTagsPage = () => {
  return (
    <div className="dashboard-categories">
      <div className="row">
        <div className="col">
          <h2 className="lead">Create Tag</h2>
          <TagForm />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="lead">List of Tags</h2>
          <TagList />
        </div>
      </div>
    </div>
  );
};

export default DashboardTagsPage;
