import React from "react";

export const useValidation = () => {

    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (evt) => {

        const target = evt.target;
        const name = target.name;
        const value = target.value;

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        
        setIsValid(target.closest("form").checkValidity());
    };

    return {
        values,
        errors,
        isValid,
        handleChange,
        setValues,
    };
};