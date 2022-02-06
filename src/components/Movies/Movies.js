/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({
  movies,
  savedMovies,
  filterMovies,
  onCardLike,
  onCardUnlike,
  isLoading,
  message,
  searchMovie,
}) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [isOn, setIsOn] = React.useState(false);

  React.useEffect(() => {
    if (isOn) {
      setShortMovies(filterMovies(movies));
    }
  }, [isOn]);
  return (
    <>
      <Header />
      <section className="movies">
        <SearchForm searchMovie={searchMovie} setIsOn={setIsOn} />
        <MoviesCardList
          isLoading={isLoading}
          movies={isOn ? shortMovies : movies}
          savedMovies={savedMovies}
          message={message}
          onCardLike={onCardLike}
          onCardUnlike={onCardUnlike}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
