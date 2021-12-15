import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesCard from "../../utils/movies";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList
        cards={moviesCard}
        pageSavedMovies={false}
        buttonMore={true}
      />
    </section>
  );
}

export default Movies;
