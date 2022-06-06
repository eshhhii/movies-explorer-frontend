import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import * as utils from "../../utils/utils";

const MoviesCardList = ({
    cards,
    buttonMore,
    onClickMoreButton,
    onCardClickButton,
    movieSearchError, }) => {
    const visibilityCards = cards.length > 0;

    return (
        <section className="list">

            {!visibilityCards && <p className="list__message">{movieSearchError}</p>}

            {visibilityCards && (
                <ul className="list__list">
                    {cards.map((card) => (
                        <MoviesCard
                            key={utils.getMovieKey(card)}
                            card={card}
                            onCardClickButton={onCardClickButton}
                        />
                    ))}
                </ul>
            )}

            {buttonMore && (
                <div className="list__container">
                    <button
                        className="list__button"
                        type="button"
                        name="more"
                        onClick={onClickMoreButton}
                    >
                        Ещё
                    </button>
                </div>

            )}

        </section>
    );
};

export default MoviesCardList;
