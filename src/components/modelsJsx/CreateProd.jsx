import { useState } from "react";
import "../../shared/createProd.css";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

const CreateProd = () => {
  const [name, setName] = useState("");
  const [category, setcategory] = useState("");
  const [feed, setFeed] = useState("");
  const [unit, setUnit] = useState("");
  const [coverImage, setCoverImage] = useState();
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const createProdStart = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      category,
      feed,
      unit,
      description,
      coverImage,
      price: parseFloat(price),
    };
    try {
      const response = await fetch(`${API_BASE_URL}/product/create-product`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const result = await response.json();
        setName("");
        setcategory("");
        setDescription("");
        setFeed("");
        setUnit("");
        setCoverImage("");
        setPrice("");
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={createProdStart} className="form-create-position">
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
                onChange={(e) => setcategory(e.target.value)}
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
                <p>Описание</p>
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
        <p>{message}</p>
      <div className="box-btn">
        <button className="carousel-btn">Создать позицию</button>
        </div>
      </form>
    </>
  );
};

export default CreateProd;
