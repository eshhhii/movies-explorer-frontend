import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import savedMovies from "../../utils/savedMovies.js";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList
        cards={savedMovies}
        savedMoviePage={true}
        moreBtn={false}
      />
    </section>
  );
}

export default SavedMovies;
