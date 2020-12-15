import React, { useState } from "react";
import "../App.css";

const Tag = ({ x, y, text }) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
      className="container-point"
      style={{ left: `${x - 5}px`, top: `${y - 2}px` }}
    >
      {isShown && (
        <div className="relative">
          <div className="tag_item">{text}</div>
        </div>
      )}
    </div>
  );
};

export default Tag;
