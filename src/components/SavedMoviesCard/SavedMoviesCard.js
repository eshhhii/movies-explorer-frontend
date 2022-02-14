import React from "react";
import "./SavedMoviesCard.css";

function SavedMoviesCard({ card, onChangeLike }) {
  function getMovieDuration(card) {
    return `${Math.floor(card?.duration / 60)}ч ${card?.duration % 60}м`;
  }

  function handleClickButton() {
    onChangeLike({ id: card.movieId });
  }

  return (
    <section className="savedmoviescard">
      <div className="savedmoviescard__block">
        <div className="savedmoviescard__wrapper">
          <h3 className="savedmoviescard__title">{card.nameRU}</h3>
          <p className="savedmoviescard__duration">{getMovieDuration(card)}</p>
        </div>
        <button
          className="savedmoviescard__like_delete"
          type="button"
          onClick={handleClickButton}
        ></button>
      </div>
      <div className="savedmoviescard__container">
        <a
          href={card.trailerLink}
          target="_blank"
          rel="noreferrer"
          className="savedmoviescard__link"
        >
          <img
            className="savedmoviescard__image"
            src={card.thumbnail}
            alt={card.nameRU}
          />
        </a>
      </div>
    </section>
  );
}

export default SavedMoviesCard;
