"use client";

import { useCategory } from "@/store/CategoryContext";
import { TagContextType, useTag } from "@/store/TagContext";
import React, { useEffect } from "react";

const TagForm = () => {
  const {
    name,
    setName,
    category,
    setCategory,
    tag,
    setTag,
    createTag,
    updateTag,
    deleteTag,
  }: TagContextType = useTag();
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
            value={tag ? tag?.name : name}
            onChange={(e) =>
              tag
                ? setTag({
                    ...tag,
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
            value={tag?.category ? (tag?.category as string) : category}
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
            className={`btn btn-${tag ? "info" : "primary"}`}
            onClick={(e) => {
              e.preventDefault();
              tag ? updateTag() : createTag();
            }}
            type="submit"
          >
            {tag ? "Edit" : "Create"}
          </button>

          {tag && (
            <>
              <button
                className="btn bg-danger text-light"
                onClick={(e) => {
                  e.preventDefault();
                  deleteTag();
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-light"
                onClick={(e) => {
                  e.preventDefault();
                  setTag(null);
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

export default TagForm;
