/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import movies from "../../utils/movies";

function Movies({
  filterMovies,
  onCardClickButton,
  isLoading,
  message,
  savedMovies,
  searchMovie,
}) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    if (isChecked) {
      setShortMovies(filterMovies(movies));
    }
  }, [isChecked]);
  return (
    <>
      <Header />
      <section className="movies">
        <SearchForm searchMovie={searchMovie} setIsChecked={setIsChecked} />
        <MoviesCardList
          isLoading={isLoading}
          movies={isChecked ? shortMovies : movies}
          savedMovies={savedMovies}
          message={message}
          onCardClickButton={onCardClickButton}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
