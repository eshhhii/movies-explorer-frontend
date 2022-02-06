import React from "react";
import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ searchMovie, setIsOn }) {
  const [searchWord, setSearchWord] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    setErrorMessage("");
  }, [searchWord]);

  function handleToggle(on) {
    setIsShortMovies(on);
    setIsOn(!isShortMovies);
  }

  function onChange(e) {
    setSearchWord(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!searchWord) {
      setErrorMessage("Необходимо ввести ключевое слово");
      return;
    }

    searchMovie(searchWord);
  }
  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            value={searchWord}
            onChange={onChange}
            type="text"
            autoComplete="off"
            minLength="2"
            maxLength="200"
          ></input>
          <p className="search__input_error">{errorMessage}</p>
          <button className="search__button" type="submit">
            Найти
          </button>
        </div>
      </form>
      <FilterCheckBox handleToggle={handleToggle} />
      <div className="search__line"></div>
    </section>
  );
}

export default SearchForm;
