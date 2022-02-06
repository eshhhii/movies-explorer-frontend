/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import {
  MAX_CARDS_NUMBER,
  MIN_CARDS_NUMBER,
  ADD_MAX_CARDS_NUMBER,
  ADD_MIN_CARDS_NUMBER,
} from "../../utils/constants";

function MoviesCardList(props) {
  const movies = props.movies || [];
  const size = window.innerWidth;
  const [cardsArray, setCardsArray] = React.useState(0);

  const renderCards = React.useCallback(() => {
    if (size > 768) {
      setCardsArray(MAX_CARDS_NUMBER);
    } else {
      setCardsArray(MIN_CARDS_NUMBER);
    }
  }, [size]);

  const handleAddCardClick = () => {
    if (size > 1020) {
      setCardsArray(cardsArray + ADD_MAX_CARDS_NUMBER);
    } else {
      setCardsArray(cardsArray + ADD_MIN_CARDS_NUMBER);
    }
  };

  React.useEffect(() => renderCards(), [renderCards]);

  React.useEffect(() => {
    window.addEventListener("resize", renderCards);
    return () => {
      window.removeEventListener("resize", renderCards);
    };
  }, []);

  return (
    <section className="list">
      {props.isLoading ? (
        <Preloader />
      ) : (
        <>
          {props.message && <p className="movies-message">{props.message}</p>}
          <ul className="list__list">
            {movies &&
              movies.slice(0, cardsArray).map((movie) => {
                if (
                  props.savedMovies.find((elem) => elem.movieId === movie.id)
                ) {
                  return (
                    <MoviesCard
                      card={movie}
                      key={movie.id}
                      onChangeState={props.onCardUnlike}
                      isMovieSaved={true}
                    />
                  );
                } else {
                  return (
                    <MoviesCard
                      card={movie}
                      key={movie.id}
                      onChangeState={props.onCardLike}
                      isMovieSaved={false}
                    />
                  );
                }
              })}
          </ul>
          {movies.length > cardsArray && (
            <div className="list__container">
              <button
                className="list__button"
                type="button"
                onClick={handleAddCardClick}
              >
                Еще
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
