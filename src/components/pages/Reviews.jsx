import React, { useEffect, useState } from "react";
import "../../shared/review.css";
import images from "../../javaScript/images.js";
import { useSelector } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

function Review() {
  const authState = useSelector((state) => state.auth);

  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(null);
  const [text, setText] = useState("");

  const [textRes, setTextRes] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [activeReviewId, setActiveReviewId] = useState(null);

  const openModalForReview = (reviewId) => {
    setActiveReviewId(reviewId);
  };

  const handleChangeTextRes = (event) => {
    setTextRes(event.target.value);
  };

  async function submitRes(reviewId) {
    if (!textRes.trim()) {
      return;
    }

    fetch(`${API_BASE_URL}/review/comments/${reviewId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: textRes,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setActiveReviewId(null);
        refetchReviews();
      })
      .catch((error) => {
        console.error("Ошибка отправки:", error);
      });
  }

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/review/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Ошибка при проверке пользователя:", error);
        setMessage("Не авторизован!");
      });
  }, []);

  const reviewSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }
    if (!rating) {
      return;
    }

    const dataToSend = {
      text: text,
      rating: rating,
    };
    fetch(`${API_BASE_URL}/review/create-review`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowForm(false);
        refetchReviews();
      })
      .catch((error) => {
        console.error("Ошибка отправки:", error);
      });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const refetchReviews = () => {
    fetch(`${API_BASE_URL}/review/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Ошибка при проверке пользователя:", error);
        setMessage("Не авторизован!");
      });
  };

  const calculateRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const totalSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    const count = reviews.length;
    const averageRating = Math.round((totalSum / count) * 100) / 100;

    return averageRating;
  };


  return (
    <>
      <div className="container">
        {authState.authenticated  ? (
          showForm ? (
            <form className="formReview" onSubmit={reviewSubmit}>
              <textarea
                className="textarea-review text"
                name="text"
                id="text"
                placeholder="Введите текст"
                value={text}
                onChange={handleChangeText}
              ></textarea>
              <h2 className="caption-review">Поставьте оценку</h2>
              <div className="rating">
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  checked={rating === "5"}
                  onChange={handleChangeRating}
                />
                <label htmlFor="star5" title="Рейтинг 5"></label>
                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                  checked={rating === "4"}
                  onChange={handleChangeRating}
                />
                <label htmlFor="star4" title="Рейтинг 4"></label>
                <input
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                  checked={rating === "3"}
                  onChange={handleChangeRating}
                />
                <label htmlFor="star3" title="Рейтинг 3"></label>
                <input
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                  checked={rating === "2"}
                  onChange={handleChangeRating}
                />
                <label htmlFor="star2" title="Рейтинг 2"></label>
                <input
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                  checked={rating === "1"}
                  onChange={handleChangeRating}
                />
                <label htmlFor="star1" title="Рейтинг 1"></label>
              </div>
              <button className="carousel-btn">Оставить отзыв</button>
            </form>
          ) : (
            <div className="formReview">
              <h2 className="caption-benefits">Ваш отзыв успешно отправлен!</h2>
              <p className="text">Спасибо за отзыв!</p>
            </div>
          )
        ) : (
          <p></p>
        )}

        <div style={{ textAlign: "right" }}>
          <p className="text">Средний рейтинг: {calculateRating(reviews)} ★</p>
        </div>
        <div className="reviews-container">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <>
                <div className="border-bottom">
                  <div className="item-rev-container">
                    <img className="image-review" src={images.chat} alt="" />
                    <div className="review-item" key={review._id}>
                      <div className="star-caption">
                        <h2 className="caption-review">{review.user.name}</h2>
                        <div className="rating-review">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text">{review.text}</p>
                      <p className=" public-text">
                        Опубликовано: {formatDate(review.createdAt)}
                      </p>
                      {authState && authState.user?.isAdmin && (
                        <>
                          <button
                            className="carousel-btn"
                            onClick={() => openModalForReview(review._id)}
                          >
                            Ответить
                          </button>

                          {activeReviewId === review._id && (
                            <div className="overlay-res">
                              <form className="response-review">
                                <textarea
                                  className="textarea-review text"
                                  name="text"
                                  placeholder="Введите текст"
                                  value={textRes}
                                  onChange={handleChangeTextRes}
                                />
                                <button
                                  className="carousel-btn"
                                  onClick={() => submitRes(review._id)}
                                  type="button"
                                >
                                  Отправить
                                </button>
                              </form>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {review.comment && (
                    <div className="review-res">
                      <div className="reviewRes-item">
                        <h2 className="caption-benefits">Администратор</h2>
                        <p className="text">{review.comment}</p>
                      </div>
                      <img className="image-review" src={images.chat} alt="" />
                    </div>
                  )}
                </div>
              </>
            ))
          ) : (
            <p>Отзывов пока нет</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Review;
