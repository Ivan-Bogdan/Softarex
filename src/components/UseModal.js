import React, { useState } from "react";
import "../App.css";

const UseModal = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="App">
      <button
        onMouseOver={() => setIsShown(true)}
        onMouseOut={() => setIsShown(false)}
      >
        Hover over me!
      </button>
      {isShown && <div>I'll appear when you hover over the button.</div>}
    </div>
  );
};

export default UseModal;
