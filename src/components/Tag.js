import React, { useState } from "react";
import "../App.css";

const Tag = ({ x, y, text }) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
      className="container-point"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {isShown && (<div style={{position:"relative"}}><div style={{position:"absolute",marginLeft:"13px",marginTop:"-10px", background:"wheat" , border:"2px solid black", borderRadius:"15%", zIndex:"1"}}>{text}</div></div>)}
    </div>
    
  );
};

export default Tag;
