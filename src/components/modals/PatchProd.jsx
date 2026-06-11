import { useEffect, useState } from "react";
import "../../shared/createProd.css";
import ReactModal from "react-modal";
import { X } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

ReactModal.setAppElement("#root");

const PatchProd = ({ id, isOpenProd, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [feed, setFeed] = useState("");
  const [unit, setUnit] = useState("");
  const [coverImage, setCoverImage] = useState();
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const [hasLoaded, setHasLoaded] = useState(false);

  const loadProduct = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/product/${id}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера (${response.status})`);
      }

      const data = await response.json();
      setName(data.name);
      setCategory(data.category);
      setFeed(data.feed);
      setUnit(data.unit);
      setCoverImage(data.coverImage);
      setPrice(data.price);
      setDescription(data.description);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (isOpenProd && !hasLoaded) {
      loadProduct();
    }
  }, [isOpenProd, hasLoaded, id]);

  useEffect(() => {
    if (!isOpenProd) {
      setHasLoaded(false);
      setName("");
    }
  }, [isOpenProd]);

  const updateProd = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      category,
      feed,
      unit,
      coverImage,
      price,
      description,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const result = await response.json();
        setName(result.name);
        setCategory(result.category);
        setDescription(result.description);
        setFeed(result.feed);
        setUnit(result.unit);
        setCoverImage(result.coverImage);
        setPrice(result.price);
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
        }, 2000);
        onSuccess();
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке:", error.message);
    }
  };

  return (
    <>
      <ReactModal
        isOpen={isOpenProd}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        overlayClassName="modal-overlay"
        className="modal-login-content"
      >
        <form onSubmit={updateProd} className="form-create-position">
          <p className="x-icon-basket">
            <X className="x-i" onClick={onClose} />
          </p>
          <div className="form-create-prod">
            <div className="column-form-create-prod">
              <div className="input-class">
                <label htmlFor="name">
                  <p className="text-prod-create">Наименование продукта</p>
                </label>
                <input
                  className="input-prod-desc"
                  type="text-prod-create"
                  id="name"
                  value={name}
                  placeholder="Например: Комбикорм для Бройлеров"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="input-class">
                <label htmlFor="category">
                  <p className="text-prod-create">Категория</p>
                </label>
                <input
                  className="input-prod-desc"
                  type="text-prod-create"
                  id="category"
                  value={category}
                  placeholder="Например: Комбикорм/ Яйцо/ Мясо птицы"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="input-class">
                <label htmlFor="feed">
                  <p className="text-prod-create">Фаза/ Бройлер/ Несушка</p>
                </label>
                <input
                  className="input-prod-desc"
                  type="text-prod-create"
                  id="feed"
                  value={feed}
                  placeholder="Например: Старт /рост /бройлер/ несушка"
                  onChange={(e) => setFeed(e.target.value)}
                />
              </div>
              <div className="input-class">
                <label htmlFor="unit">
                  <p className="text-prod-create">Единица измерения</p>
                </label>
                <input
                  className="input-prod-desc"
                  type="text-prod-create"
                  id="unit"
                  value={unit}
                  placeholder="Например: меш./ шт./ десяток/"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
              <div className="input-class">
                <label htmlFor="coverImage">
                  <p className="text-prod-create">Изображение</p>
                </label>
                <input
                  className="input-prod-desc"
                  type="text-prod-create"
                  id="coverImage"
                  value={coverImage}
                  required={true}
                  placeholder="URL изображения https://..."
                  onChange={(e) => setCoverImage(e.target.value)}
                />
              </div>
              <div className="input-class">
                <label htmlFor="price">
                  <p className="text-prod-create">Цена</p>
                </label>
                <input
                  className="input-prod-desc"
                  type="number"
                  id="price"
                  value={price}
                  placeholder="Например: 1500"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="textarea-class">
              <label htmlFor="descripton">
                <p className="text-prod-create">Описание</p>
              </label>
              <textarea
                className="input-prod-desc textarea-desc"
                type="text-prod-create"
                id="description"
                value={description}
                placeholder=""
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <p></p>
          </div>
          <p className="text-prod-create">{message}</p>
          <div className="box-btn">
            <button className="carousel-btn">Изменить позицию</button>
          </div>
        </form>
      </ReactModal>
    </>
  );
};

export default PatchProd;
