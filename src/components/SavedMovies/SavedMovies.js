/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
  onCardClickButton,
  message,
  savedMovies,
  foundSavedMovies,
  filterMovies,
  searchSavedMovie,
  isLoading,
}) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [isOn, setIsOn] = React.useState(false);
  let movies = foundSavedMovies.length > 0 ? foundSavedMovies : savedMovies;
  if (message) {
    movies = [];
  }

  React.useEffect(() => {
    if (isOn && !message) {
      setShortMovies(filterMovies(movies));
    }
  }, [isOn, movies]);
  return (
    <>
      <Header />
      <section className="saved-movies">
        <SearchForm searchMovie={searchSavedMovie} setIsOn={setIsOn} />
        <MoviesCardList
          savedMovies={isOn ? shortMovies : movies}
          isLoading={isLoading}
          onCardClickButton={onCardClickButton}
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
