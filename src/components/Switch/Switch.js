import React from 'react';
import "./Switch.css";

const Switch = ({ isOn, handleToggle }) => {
    return (
        <>
            <input
                className="switch"
                type="checkbox"
                checked={isOn}
                onChange={handleToggle}
                id="switch-toggle"
            />
            <label
                className={`switch__label ${isOn ? "switch__label_is_on" : ""}`}
                htmlFor="switch-toggle"
            >
                <span className="switch__slider" />
            </label>
        </>
    );
};

export default Switch;