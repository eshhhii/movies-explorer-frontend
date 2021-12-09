import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleToggle }) {
  const [isChecked, setChecked] = React.useState(false);
  function onChange(e) {
    handleToggle(!isChecked);
    setChecked(e.target.checked);
  }

  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input
          className="checkbox__input"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChange(e)}
        />
        <span className="checkbox__slider" />
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;