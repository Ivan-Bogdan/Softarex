import React, { useState } from "react";

const Modal = ({ isShowing, elem, id, array, onClose, callbackTags2 }) => {
  const [text, setText] = useState("");
  const [tagsArray, setTagsArray] = useState(array);
  const [tagError, setTagError] = useState(false);

  if (!isShowing) return null;

  return (
    <div>
      {" "}
      <div className="modal-overlay" />
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal">
          <div className="modal-header">
            <button
              type="button"
              className="modal-close-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                tagsArray.pop();
                setTagsArray([...tagsArray]);
                onClose();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p className="text_bold">Добавить Тег</p>
          {tagError && <p className="error_font">{tagError}</p>}
          <div>
            <input
              className="input_style"
              placeholder="Метка"
              onChange={(e) => {
                setText(e.target.value);
              }}
              required={true}
            ></input>
            <div className="flex">
              <button
                onClick={() => {
                  tagsArray.pop();
                  setTagsArray([...tagsArray]);
                  onClose();
                  setTagError("");
                }}
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  if (text !== "") {
                    elem["text"] = text;/* 
                    elem["isSelected"] = false; */
                    elem["id"] = Date.now();
                    setTagsArray([...tagsArray]);
                    onClose();
                    setTagError("");
                    setText("");
                    callbackTags2(tagsArray);
                  } else {
                    setTagError("Поле не может быть пустым");
                  }
                }}
              >
                Ок
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
