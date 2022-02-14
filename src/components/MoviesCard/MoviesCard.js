import React from "react";
import "./MoviesCard.css";

function MoviesCard({ card, onChangeLike, isMovieSaved }) {
  function getMovieDuration(card) {
    return `${Math.floor(card?.duration / 60)}ч ${card?.duration % 60}м`;
  }

  function getCardImage(card) {
    if (card.image && card.image.url)
      return `https://api.nomoreparties.co/${card.image.url}`;
    if (card.image) return card.image;
  }

  function handleClickButton() {
    return onChangeLike(card);
  }

  return (
    <section className="moviescard">
      <div className="moviescard__block">
        <div className="moviescard__wrapper">
          <h3 className="moviescard__title">{card.nameRU}</h3>
          <p className="moviescard__duration">{getMovieDuration(card)}</p>
        </div>
        <button
          className={`moviescard__like ${
            isMovieSaved ? "moviescard__like_active" : ""
          }`}
          type="button"
          onClick={handleClickButton}
        ></button>
      </div>
      <div className="moviescard__container">
        <a
          href={card.trailerLink}
          target="_blank"
          rel="noreferrer"
          className="moviescard__link"
        >
          <img
            className="moviescard__image"
            src={getCardImage(card)}
            alt={card.nameRU}
          />
        </a>
      </div>
    </section>
  );
}

export default MoviesCard;
