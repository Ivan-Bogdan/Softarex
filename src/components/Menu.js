import React, { useState } from "react";

const Menu = () => {
  const [pages, setPages] = useState([
    { text: "Page1", isSelected: false },
    { text: "Page2", isSelected: false },
    { text: "Page3", isSelected: false },
  ]);
  return (
    <div className="menu_container">
      {pages.map((item, acc) =>
        item.isSelected ? (
          <li key={acc} className="menu_selected">
            {item.text}
          </li>
        ) : (
          <li
            key={acc}
            onClick={() => {
              pages.forEach((item, key) => {
                key === acc
                  ? (item.isSelected = true)
                  : (item.isSelected = false);
              });
              setPages([...pages]);
            }}
          >
            {item.text}
          </li>
        )
      )}
    </div>
  );
};
export default Menu;
