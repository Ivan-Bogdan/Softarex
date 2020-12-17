import React, { useState, useEffect, useCallback } from "react";
import Modal from "./Modal";
import Tag from "./Tag";

const ImageBlock = ({ callbackTags }) => {
  const [image, setImage] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [err, setErr] = useState("");
  const [tagsArray, setTagsArray] = useState([]);

  useEffect(() => {
    if (image) setErr("");/* 
    callbackTags(tagsArray); */
  }, [tagsArray, image]);

  const toggleModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const updateData = () => (value) => {
    setTagsArray(value);
    callbackTags(tagsArray);
  };

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
    <div className="main-div-column">
      {!image && <input type="file" onChange={(e) => _handleImageChange(e)} />}
      {err && <p>{err}</p>}
      <div
        id="main"
        className="picture main"
        onClick={(e) => {
          if (image === false) {
            alert("Поместите изображение");
          } else {
            setModalOpen(true);
            const x = e.pageX;
            const y = e.pageY;
            tagsArray.push({ x: x, y: y });
            setTagsArray([...tagsArray]);
          }
        }}
      >
        {image && <img className="picture" alt="Pictures" src={image} />}
        {tagsArray.map((item, acc) => (
          <Tag key={acc} item={item}></Tag>
        ))}
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
      {isModalOpen && (
        <Modal
          isShowing={isModalOpen}
          elem={tagsArray[tagsArray.length - 1]}
          id={tagsArray.length - 1}
          array={tagsArray}
          onClose={toggleModal}
          callbackTags2={updateData()}
        >
          {/*  <div className="modal-overlay" />
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
                        setTagError("");
                        setText("");
                        callbackTags(tagsArray);
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
          </div> */}
        </Modal>
      )}
    </div>
  );
};
export default ImageBlock;
