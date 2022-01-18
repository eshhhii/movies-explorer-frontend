import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isOn, handleToggle }) {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input
          className="checkbox__input"
          type="checkbox"
          checked={isOn}
          onChange={handleToggle}
        />
        <span className="checkbox__slider" />
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
