import { useState } from "react";

export const useValidation = () => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

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