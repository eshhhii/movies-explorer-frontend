/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
  onMovieDelete,
  message,
  savedMovies,
  foundSavedMovies,
  filterMovies,
  searchSavedMovie,
  preloader,
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
        <SavedMoviesCardList
          savedMovies={isOn ? shortMovies : movies}
          preloader={preloader}
          onMovieDelete={onMovieDelete}
          message={message}
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
