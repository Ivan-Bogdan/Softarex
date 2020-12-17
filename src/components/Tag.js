import React, { useState } from "react";
import "../App.css";

const Tag = ({ item }) => {
  const [isShown, setIsShown] = useState(false);

  return item.isSelected ? (
    <div
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
      className="container-point"
      style={{
        left: `${item.x - 5}px`,
        top: `${item.y - 2}px`,
        background: "green",
      }}
    >
      {isShown && (
        <div className="relative">
          <div className="tag_item">{item.text}</div>
        </div>
      )}
    </div>
  ) : (
    <div
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
      className="container-point"
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
