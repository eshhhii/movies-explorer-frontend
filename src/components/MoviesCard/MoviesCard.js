import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import iconSaved from "../../images/like_active.svg";
import iconDelete from "../../images/delete.svg";
import iconUnsaved from "../../images/unlike.svg";

const MoviesCard = ({ card, onCardClickButton }) => {


  const location = useLocation();

  const isSavedMoviesPage = location.pathname === "/saved-movies";
  const isMoviesPage = location.pathname === "/movies";

  const savedIcon = <img src={iconSaved} alt="Сохранено" />;
  const deleteIcon = <img src={iconDelete} alt="Удалить" />;
  const unsavedIcon = <img src={iconUnsaved} alt="Не сохранено" />;

  function handleCardClickButton() {
      onCardClickButton(card);
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
          card.isSaved && isMoviesPage ? "moviescard__like_active" : ""
        }`}
        type="button"
        onClick={handleCardClickButton}
      >
        {isMoviesPage && card.isSaved && savedIcon}
        {isMoviesPage && !card.isSaved && unsavedIcon}
        {isSavedMoviesPage && deleteIcon}
      </button>
      </div>
      <div className="moviescard__container">
        <a
          className="moviescard__link"
          href={card.trailer || card.trailerLink}
          target="_blank"
          rel="noreferrer"
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
