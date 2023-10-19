"use client";

import { useTag } from "@/store/TagContext";
import React, { useCallback, useEffect } from "react";

const TagList = () => {
  const { listTags, tags, setTag } = useTag();

  useEffect(() => {
    listTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5">
      {tags?.map((tag) => (
        <div key={tag._id} className="" onClick={() => setTag(tag)}>
          {tag.name}
        </div>
      ))}
    </div>
  );
};

export default TagList;
