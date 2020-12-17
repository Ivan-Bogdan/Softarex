import React, { useEffect, useState } from "react";

const TagList = ({ list, callback }) => {
  const [array, setArray] = useState([...list]);

  useEffect(() => {
    if (list) setArray(list);
  }, [list]);
  return (
    <div className="list_item">
      <p>Список меток:</p>
      {array.map((item, acc) =>
        item.isSelected ? (
          <li key={acc} className="menu_selected">
            {item.text}
          </li>
        ) : (
          <li
            key={acc}
            onClick={() => {
              array.forEach((item, key) => {
                key === acc
                  ? (item.isSelected = true)
                  : (item.isSelected = false);
              });
              setArray([...array]);
              callback(array);
            }}
          >
            {item.text}
          </li>
        )
      )}
    </div>
  );
};
export default TagList;
