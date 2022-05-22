import React, { useState } from 'react';
import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";

import { ENTER_KEYWORD } from "../../utils/constants";
import { removeWhiteSpace } from "../../utils/utils";

const SearchForm = ({
    onSearchSubmit,
    isOn,
    handleToggle }) => {

    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    function handleChange(evt) {
        setValue(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        if (!value) {
            setError(ENTER_KEYWORD);
        } else {
            setError("");
            onSearchSubmit(removeWhiteSpace(value));
        }
    }

  return (
    <section className="search">
      <div className="search-wrapper">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            value={value}
            onChange={handleChange}
            required
            autoComplete="off"
            minLength="2"
            maxLength="200"
          ></input>
          <button className="search__button" type="submit">
            Найти
          </button>
        </div>
      </form>
      {error && <span className="search__error">{error}</span>}
        </div>
        <FilterCheckBox i
                isOn={isOn}
                handleToggle={handleToggle}
            />
      <div className="search__line"></div>
    </section>
  );
}

export default SearchForm;
