import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";

function MoviesCardList ({ cards, pageSavedMovies, buttonMore }) {

    const [isLoading, setLoading] = useState(false);
    const handlePreloader = () => { setLoading(true) };

    return (
        <section className="moviescards">
            <ul className="moviescards__list">
                {cards.map((card) => (
                    <MoviesCard
                        key={card.id}
                        card={card}
                        pageSavedMovies={pageSavedMovies}
                    />
                ))}
            </ul>

            {isLoading ? (<Preloader />) :
                (
                    buttonMore &&
                    (
                        <div className="moviescards__button_container">
                            <button
                                className="moviescards__button"
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
};

export default MoviesCardList; 