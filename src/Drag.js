import React, { useState } from "react";
import ImageBlock from "./components/ImageBlock";
import Menu from "./components/Menu";
import TagList from "./components/TagList";

const DropArea = () => {
  const [tagsArray, setTagsArray] = useState([]);

  const updateData = () => (value) => setTagsArray(value);

  return (
    <div className="main-div">
      <Menu></Menu>
      <ImageBlock callbackTags={updateData()} arr={tagsArray}></ImageBlock>
      <TagList callback={updateData()} list={tagsArray}></TagList>
    </div>
  );
};
export default DropArea;
