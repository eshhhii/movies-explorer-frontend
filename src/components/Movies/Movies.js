import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from "../../utils/movies";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList cards={movies} savedMoviePage={false} moreBtn={true} />
    </section>
  );
}

export default Movies;
