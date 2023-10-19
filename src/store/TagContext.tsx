"use client";

import config from "@/config";
import { TagType } from "@/models/TagModel";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export type TagContextType = {
  name: string;
  tag: TagType | null;
  setTag: (value: any) => void;
  category: string;
  setCategory: (value: any) => void;
  setName: (value: any) => void;
  tags: TagType[];
  createTag: () => void;
  getTag: (tagId: string) => void;
  listTags: () => void;
  updateTag: () => void;
  deleteTag: () => void;
};

export const TagContext = createContext<TagContextType | null>(null);

export const TagProvider = ({ children }: { children: React.ReactNode }) => {
  //create a tag
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  // list tags
  const [tags, setTags] = useState<TagType[]>([]);
  // update and delete
  const [tag, setTag] = useState<TagType | null>(null);

  const getTag = async () => {
    try {
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const listTags = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/admin/tags`);

      const data: {
        tags: TagType[];
        message: string;
        error: string;
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        setTags(data?.tags);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const createTag = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/admin/tags`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, category }),
      });

      const data: { tag: TagType; message: string; error: string } =
        await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setName("");
        setCategory("");
        setTags([data?.tag, ...tags]);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const updateTag = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/admin/tags/${tag?._id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(tag),
      });

      const data: {
        tag: TagType;
        message: string;
        error: string;
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setTags(tags.map((cat) => (cat._id === tag?._id ? data.tag : cat)));
        setName("");
        setTag(null);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  const deleteTag = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/admin/tags/${tag?._id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });

      const data: {
        tag: TagType;
        message: string;
        error: string;
      } = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setTags(tags.filter((cat) => cat._id !== tag?._id));
        setName("");
        setTag(null);
      }
    } catch (error) {
      toast.error("An error occurred. Try again");
    }
  };

  return (
    <TagContext.Provider
      value={{
        name,
        setName,
        category,
        setCategory,
        tag,
        setTag,
        tags,
        createTag,
        getTag,
        listTags,
        updateTag,
        deleteTag,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTag = () => {
  const currentContext = useContext(TagContext);

  if (!currentContext) {
    throw new Error("useTag has to be used within <TagContext.Provider>");
  }

  return currentContext;
};
