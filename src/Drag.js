import React, { useState, useEffect } from "react";
import MenuItem from "./components/MenuItem";
import Modal from "./components/Modal";
import Tag from "./components/Tag";

const DropArea = () => {
  const [data, setData] = useState(false);
  const [file, setFile] = useState(false);
  const [modal, setModal] = useState(false);
  const [err, setErr] = useState(false);
  const [error, setError] = useState(false);
  const [arr, setArr] = useState([]);
  const [text, setText] = useState("");
  const [pages, setPages] = useState([
    { text: "Page1", isSelected: false },
    { text: "Page2", isSelected: false },
    { text: "Page3", isSelected: false },
  ]);

  useEffect(() => {
    if (data) setErr(false);
    const container = document.getElementById("main");
    if (data === false) {
      container.onclick = () => {
        alert("Поместите изображение");
      };
    } else {
      container.onclick = (e) => {
        setModal(true);

        const x = e.pageX;
        const y = e.pageY;

        arr.push({ x: x, y: y });
        setArr([...arr]);
      };
    }
  }, [arr, data]);

  const removeChild = () => {
    setArr([]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    console.log(file);
    const { length } = files;
    const reader = new FileReader();
    if (length === 0) {
      return false;
    }
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { size, type } = files[0];
    setData(false);
    if (!fileTypes.includes(type)) {
      setErr("Формат файла должен быть png или jpg.");
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      setErr("File size exceeded the limit of 2MB");
      return false;
    }
    setErr(false);

    reader.readAsDataURL(files[0]);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target.result);
    };
  };

  const onDragOver = (e) => {
    e.preventDefault();
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
      setErr("File size exceeded the limit of 2MB");
      return false;
    }
    reader.onloadend = () => {
      setFile(file);
      setData(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      {!data && (
        <input
          style={{ marginBottom: "15px" }}
          type="file"
          onChange={(e) => _handleImageChange(e)}
        />
      )}
      {err && <p>{err}</p>}
      <div style={{ overflow: "hidden", display: "flex" }}>
        <div style={{ maxWidth: "300px", textAlign: "left" }}>
          {pages.map((item, acc) => (
            <MenuItem key={acc}>
              {item.isSelected ? (
                <li style={{ backgroundColor:"#80808080" }}>
                  {item.text}
                </li>
              ) : (
                <li
                  onClick={() => {
                    pages.forEach((item, key) => {
                      if (key === acc) {
                        item.isSelected = true;
                      } else {
                        item.isSelected = false;
                      }
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
          <div
            id="main"
            className="picture main"
            onDrop={(e) => onDrop(e)}
            onDragOver={(e) => onDragOver(e)}
          >
            {data && <img className="picture" alt="Pictures" src={data} />}
            {arr.map((item, acc) => (
              <Tag key={acc} x={item.x} y={item.y} text={item.text}></Tag>
            ))}
          </div>
          <div className="list_item">
            <p>Список меток:</p>
            {arr.map((item, acc) => (
              <li key={acc}>
                {acc + 1}){item.text}
              </li>
            ))}
          </div>
          {modal && (
            <Modal
              isShowing={modal}
              elem={arr[arr.length - 1]}
              id={arr.length - 1}
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
                        arr.pop();
                        setArr([...arr]);
                        setModal(false);
                      }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <p style={{ fontWeight: "900" }}>Добавить Тег</p>
                  {error && <p style={{ color: "red" }}>{error}</p>}
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
                          arr.pop();
                          setArr([...arr]);
                          setModal(false);
                          setError("");
                        }}
                      >
                        Отмена
                      </button>
                      <button
                        onClick={() => {
                          if (text !== "") {
                            arr[arr.length - 1]["text"] = text;
                            setArr([...arr]);

                            setModal(false);
                            setError(false);
                            setText("");
                          } else {
                            setError("Поле не может быть пустым");
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
        {data && (
          <button
            onClick={() => {
              setData(false);
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
