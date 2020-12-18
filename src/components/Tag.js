import React, { useState } from "react";
import "../App.css";

const Tag = ({ item, sel }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
      className={
        item.id === sel ? "container-point green_color" : "container-point"
      }
      style={{ left: `${item.x - 5}px`, top: `${item.y - 2}px` }}
    >
      {isShown && (
        <div className="relative">
          <div className="tag_item">{item.text}</div>
        </div>
      )}
    </div>
  );
};

export default Tag;
