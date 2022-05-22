import React from 'react';
import "./Input.css";

const Input = ({
    id,
    label,
    name,
    type,
    placeholder,
    minLength,
    maxLength,
    onChange,
    value,
    defaultValue,
    error,
    auth,
    editProfile,
    disabled
}) => {

    return (
        <>
            {auth &&
                (
                    <>
                        <label
                            className="input__label"
                            htmlFor={name}
                        >
                            {label}
                        </label>
                        <input
                            className={`input input_in_auth ${error ? "input__error" : ""}`}
                            id={id}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            minLength={minLength}
                            maxLength={maxLength}
                            onChange={onChange}
                            value={value}
                            error={error}
                            required
                            autoComplete="off"
                        />
                    </>
                )
            }

            {editProfile &&
                (
                    <div className="input__container">
                        <label
                            className="input__label_in_profile"
                            htmlFor="name"
                        >
                            {label}
                        </label>
                        <input
                            className={`input input_in_profile ${error ? "input__error" : ""}`}
                            id={id}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            minLength={minLength}
                            maxLength={maxLength}
                            onChange={onChange}
                            value={value}
                            defaultValue={defaultValue}
                            error={error}
                            required
                            autoComplete="off"
                            disabled={disabled}
                        />
                    </div>
                )
            }
            {error && <span className="input__error-message">{error}</span>}
        </>
    );
};

export default Input;