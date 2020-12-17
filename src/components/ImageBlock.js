import React, { useState, useEffect, useCallback } from "react";
import Modal from "./Modal";
import Tag from "./Tag";

const ImageBlock = ({ callbackTags, sel }) => {
  const [image, setImage] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [err, setErr] = useState("");
  const [tagsArray, setTagsArray] = useState([]);

  useEffect(() => {
    if (image) setErr("");
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
          <Tag key={acc} item={item} sel={sel}></Tag>
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
        />
      )}
    </div>
  );
};
export default ImageBlock;
