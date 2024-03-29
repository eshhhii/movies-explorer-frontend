/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import * as utils from "../../utils/utils";

const Movies = ({
  cards,
  isLoading,
  onGetMovies,
  onCardClickButton,
  movieSearchError,
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isSwitchOn, setSwitchOn] = React.useState(false);
  const [moviesCount, setMoviesCount] = React.useState(utils.getMoviesCount());
  const [allMovies, setAllMovies] = React.useState([]);
  const [currentMovies, setCurrentMovies] = React.useState([]);

  const handleSearchSubmit = (value) => {
      setSearchValue(value);
      if (!cards.length) {
          onGetMovies();
      }
  }

  const handleToggleSwitch = () => {
      setSwitchOn(!isSwitchOn);
  };

  const handleClickMoreButton = () => {
      setMoviesCount(moviesCount + utils.loadMovies());
  };

  React.useEffect(() => {

      const moviesFound = utils.searchMovie(cards, searchValue);
      const moviesFiltered = utils.filterMovies(moviesFound, isSwitchOn);

      setAllMovies(moviesFiltered);
      setCurrentMovies(moviesFiltered.slice(0, moviesCount));

  }, [cards, searchValue, isSwitchOn, moviesCount]);

  React.useEffect(() => {

      const handleResize = () => {
          setTimeout(() => {
              setMoviesCount(utils.getMoviesCount());
              setCurrentMovies(allMovies.slice(0, utils.getMoviesCount()));
          }, 1000);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);

  }, [allMovies]);
  return (
    <>
      <Header />
      <section className="movies">
        <SearchForm onSearchSubmit={handleSearchSubmit} isOn={isSwitchOn} handleToggle={handleToggleSwitch} />
        {isLoading && <Preloader />}
        <MoviesCardList
        cards={currentMovies}
        isSavedMoviesPage={false}
        buttonMore={currentMovies.length < allMovies.length}
        onClickMoreButton={handleClickMoreButton}
        onCardClickButton={onCardClickButton}
        movieSearchError={movieSearchError}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
