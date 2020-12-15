import React, { useState, useEffect } from "react";
import MenuItem from "./components/MenuItem";
import Modal from "./components/Modal";
import Tag from "./components/Tag";

const DropArea = () => {
  const [image, setImage] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [tagError, setTagError] = useState(false);
  const [tagsArray, setTagsArray] = useState([]);
  const [text, setText] = useState("");
  const [pages, setPages] = useState([
    { text: "Page1", isSelected: false },
    { text: "Page2", isSelected: false },
    { text: "Page3", isSelected: false },
  ]);

  useEffect(() => {
    if (image) setErr(false);
    const container = document.getElementById("main");
    if (image === false) {
      container.onclick = () => {
        alert("Поместите изображение");
      };
    } else {
      container.onclick = (e) => {
        setModalOpen(true);
        const x = e.pageX;
        const y = e.pageY;
        tagsArray.push({ x: x, y: y });
        setTagsArray([...tagsArray]);
      };
    }
  }, [tagsArray, image]);

  const removeChild = () => {
    setTagsArray([]);
  };

  const _handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    const { size, type } = file;
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!fileTypes.includes(type)) {
      setErr("Формат файла должен быть png или jpg.");
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      setErr("Размер файла превышает предел 2 Мб");
      return false;
    }
    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      {!image && <input type="file" onChange={(e) => _handleImageChange(e)} />}
      {err && <p>{err}</p>}
      <div className="main-div">
        <div className="menu_container">
          {pages.map((item, acc) => (
            <MenuItem key={acc}>
              {item.isSelected ? (
                <li className="menu_selected">{item.text}</li>
              ) : (
                <li
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
              )}
            </MenuItem>
          ))}
        </div>
        <div className="main-div">
          <div id="main" className="picture main">
            {image && <img className="picture" alt="Pictures" src={image} />}
            {tagsArray.map((item, acc) => (
              <Tag key={acc} x={item.x} y={item.y} text={item.text}></Tag>
            ))}
          </div>
          <div className="list_item">
            <p>Список меток:</p>
            {tagsArray.map((item, acc) => (
              <li key={acc}>
                {acc + 1}){item.text}
              </li>
            ))}
          </div>
          {isModalOpen && (
            <Modal
              isShowing={isModalOpen}
              elem={tagsArray[tagsArray.length - 1]}
              id={tagsArray.length - 1}
            >
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
                        setModalOpen(false);
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
                          setModalOpen(false);
                          setTagError("");
                        }}
                      >
                        Отмена
                      </button>
                      <button
                        onClick={() => {
                          if (text !== "") {
                            tagsArray[tagsArray.length - 1]["text"] = text;
                            setTagsArray([...tagsArray]);

                            setModalOpen(false);
                            setTagError(false);
                            setText("");
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
            </Modal>
          )}
        </div>
      </div>
      <div className="button-wrapper">
        {image && (
          <button
            onClick={() => {
              setImage(false);
              removeChild();
            }}
          >
            Удалить пикчу
          </button>
        )}
      </div>
    </div>
  );
};
export default DropArea;
