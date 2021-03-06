import React, { useEffect, useState } from "react";

const TagList = ({ list, callback, callbackSelectedTag, sel }) => {
  const [array, setArray] = useState([...list]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    if (list) setArray(list);
    callbackSelectedTag(selectedTag);
  }, [list, callbackSelectedTag, selectedTag]);

  return (
    <div className="list_item">
      <p>Список меток:</p>
      {array.map((item, acc) =>
        item.id === selectedTag ? (
          <li key={acc} className="menu_selected">
            {item.text}
          </li>
        ) : (
          <li
            key={acc}
            onClick={() => {
              setArray([...array]);
              callback(array);
              setSelectedTag(item.id);
              callbackSelectedTag(selectedTag);
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
