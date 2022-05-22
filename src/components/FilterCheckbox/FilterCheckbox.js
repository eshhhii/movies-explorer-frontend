import React from "react";
import "./FilterCheckbox.css";

import Switch from "../Switch/Switch";

const FilterCheckBox = ({ isOn, handleToggle }) => {

    return (
        <div className="filter-checkbox">
                        <Switch 
                isOn={isOn} 
                handleToggle={handleToggle} 
            />
            <span className="filter-checkbox__title">Короткометражки</span>
        </div>
    );
};

export default FilterCheckBox;
