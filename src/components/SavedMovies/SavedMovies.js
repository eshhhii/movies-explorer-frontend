/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import savedMovies from "../../utils/savedMovies.js";

function SavedMovies({ loggedIn, onCardClickButton, message, foundSavedMovies, filterMovies, searchSavedMovie, isLoading }) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  let movies = foundSavedMovies.length > 0 ? foundSavedMovies : savedMovies;
  if (message) {
    movies = [];
  }

  React.useEffect(() => {
    if (isChecked && !message) {
      setShortMovies(filterMovies(movies));
    }
  }, [isChecked, movies]);
  return (
    <>
      <Header />
      <section className="saved-movies">
        <SearchForm 
        searchMovie={searchSavedMovie}
        setIsChecked={setIsChecked}
        />
        <MoviesCardList
          savedMovies={isChecked ? shortMovies : movies}
          isLoading={isLoading}
          moreBtn={false}
          onCardClickButton={onCardClickButton}
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
