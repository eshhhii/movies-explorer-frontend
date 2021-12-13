import React from 'react';
import "./MoviesCard.css";
import Avatar from "../../images/avatar.jpg";


function MoviesCard ({ card, pageSavedMovies, handleLikeClick}) {

  return (
    <section className="moviescard">
      <div className="moviescard__block">
        <h3 className="moviescard__title">название</h3>
        <p className="moviescard__duration">врем я</p>
      <button
        className="moviescard__like"
        type="button"
        onClick={handleLikeClick}>
      </button>
      </div>
      <div moviescard__container>
      <a
        href=""
        target="_blank"
        rel="noreferrer"
        className="moviescard__link"
      >
        <img
          className="moviescard__image" src={Avatar}
        />
      </a>
      </div>
    </section>
  );
}

export default MoviesCard;