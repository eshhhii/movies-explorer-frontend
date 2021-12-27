import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ cards, savedMoviePage, moreBtn }) {
  const [isLoading, setLoading] = useState(false);
  const handlePreloader = () => {
    setLoading(true);
  };

  return (
    <section className="list">
      <ul className="list__list">
        {cards.slice(0, 7).map((card) => (
          <MoviesCard
            key={card.id}
            card={card}
            pageSavedMovies={savedMoviePage}
          />
        ))}
      </ul>

      {isLoading ? (
        <Preloader />
      ) : (
        moreBtn && (
          <div className="list__container">
            <button
              className="list__button"
              type="button"
              name="more"
              onClick={handlePreloader}
            >
              Ещё
            </button>
          </div>
        )
      )}
    </section>
  );
}

export default MoviesCardList;
