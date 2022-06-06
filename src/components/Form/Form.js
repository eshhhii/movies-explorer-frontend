import React from 'react';
import "./Form.css";

const Form = ({
    name,
    onSubmit,
    noValidate,
    children,
}) => {

    return (
        <form
            className={`form ${name === "profile" ? "form_in_profile" : ""}`}
            name={name}
            onSubmit={onSubmit}
            noValidate={noValidate}
        >
            {children}
        </form>
    );
};

export default Form;