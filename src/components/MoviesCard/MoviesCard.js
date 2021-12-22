import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router";

function MoviesCard({ card }) {
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);
  const location = useLocation();
  const moviePage = location.pathname === "/movies";
  const savedMoviePage = location.pathname === "/saved-movies";

  function handleMovieSave() {
    setIsMovieSaved(!isMovieSaved);
  }

  function handleMovieDelete(evt) {
    evt.target.closest(".moviecard").remove();
  }

  return (
    <section className="moviescard">
      <div className="moviescard__block">
        <div className="moviescard__wrapper">
          <h3 className="moviescard__title">{card.title}</h3>
          <p className="moviescard__duration">{card.duration}</p>
        </div>
        {moviePage &&
          (isMovieSaved ? (
            <button
              className="moviescard__like moviescard__like_active"
              type="button"
              onClick={handleMovieSave}
            ></button>
          ) : (
            <button
              className="moviescard__like"
              type="button"
              onClick={handleMovieSave}
            ></button>
          ))}
        {savedMoviePage && (
          <button
            className="moviescard__like moviescard__like_delete"
            type="button"
            onClick={handleMovieDelete}
          ></button>
        )}
      </div>
      <div className="moviescard__container">
        <img className="moviescard__image" src={card.image} alt={card.title} />
      </div>
    </section>
  );
}

export default MoviesCard;
