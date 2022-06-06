import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import * as utils from "../../utils/utils";

import { NOT_FOUND, NO_SAVED_MOVIES } from "../../utils/constants";

const SavedMovies = ({ savedMovies, onCardClickButton }) => {

    const [searchValue, setSearchValue] = React.useState("");
    const [isSwitchOn, setSwitchOn] = React.useState(false);
    const [movies, setMovies] = React.useState(savedMovies);

    const handleSearchSubmit = (value) => {
        setSearchValue(value);
    };

    const handleToggleSwitch = () => {
        setSwitchOn(!isSwitchOn);
    };

    React.useEffect(() => {

        const moviesFound = utils.searchMovie(savedMovies, searchValue);
        const moviesFiltered = utils.filterMovies(moviesFound, isSwitchOn);

        setMovies(moviesFiltered);

    }, [savedMovies, searchValue, isSwitchOn]);


    return (
        <>
            <Header />

            <section className="saved-movies">

                <SearchForm
                    onSearchSubmit={handleSearchSubmit}
                    isOn={isSwitchOn}
                    handleToggle={handleToggleSwitch}
                />

                <MoviesCardList
                    cards={movies}
                    isSavedMoviesPage={true}
                    buttonMore={false}
                    onCardClickButton={onCardClickButton}
                    movieSearchError={savedMovies.length < 1 ? NO_SAVED_MOVIES : NOT_FOUND}
                />

            </section>
            <Footer />
        </>
    );
}

export default SavedMovies;