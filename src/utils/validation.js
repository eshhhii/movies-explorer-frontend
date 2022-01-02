import { useState } from "react";

function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });

    setIsValid(target.closest("form").checkValidity());
  }

  return {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
  };
}

export default useValidation;
