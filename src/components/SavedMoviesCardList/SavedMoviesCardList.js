/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";
import "./SavedMoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import { MAX_CARDS_NUMBER, MIN_CARDS_NUMBER } from "../../utils/constants";

function SavedMoviesCardList(props) {
  const savedMovies = props.savedMovies || [];
  const size = window.innerWidth;
  const [cardsArray, setCardsArray] = React.useState(0);

  const renderCards = React.useCallback(() => {
    if (size > 768) {
      setCardsArray(MAX_CARDS_NUMBER);
    } else {
      setCardsArray(MIN_CARDS_NUMBER);
    }
  }, [size]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => renderCards(), [size]);

  React.useEffect(() => {
    window.addEventListener("resize", renderCards);
    return () => {
      window.removeEventListener("resize", renderCards);
    };
  }, []);

  return (
    <section className="savedlist">
      <Preloader preloader={props.preloader} />
      <>
        {props.message && <p className="movies-message">{props.message}</p>}
        <ul className="savedlist__list">
          {savedMovies.slice(0, cardsArray).map((savedMovie) => {
            return (
              <SavedMoviesCard
                card={savedMovie}
                key={savedMovie._id}
                onChangeLike={props.onMovieDelete}
              />
            );
          })}
        </ul>
      </>
    </section>
  );
}

export default SavedMoviesCardList;
