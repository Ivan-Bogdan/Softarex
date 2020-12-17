import React, { useEffect, useState } from "react";
import ImageBlock from "./components/ImageBlock";
import Menu from "./components/Menu";
import TagList from "./components/TagList";

const DropArea = () => {
  const [tagsArray, setTagsArray] = useState([]);
  const [selectedTag, setSelectedTag] = useState();

  const callbackSelectedTag = (value) => {
    setSelectedTag(value);
  };

  const updateData = () => (value) => setTagsArray(value);

  useEffect(() => {}, [selectedTag]);

  return (
    <div className="main-div">
      <Menu />
      <ImageBlock
        callbackTags={updateData()}
        arr={tagsArray}
        sel={selectedTag}
      />
      <TagList
        callback={updateData()}
        list={tagsArray}
        callbackSelectedTag={callbackSelectedTag}
      />
    </div>
  );
};
export default DropArea;
