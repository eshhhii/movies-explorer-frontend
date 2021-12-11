import React from 'react';
import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";

function SearchForm () {
    return (
    <section className="search">
        <form className="search__form">
        <div className="search__container">
    <input className="search__input" placeholder="Фильм" type="text" required></input>
<button className="search__button" type="submit">Найти</button>
</div>
</form>
<FilterCheckBox />
         </section>
    );
};

export default SearchForm; 