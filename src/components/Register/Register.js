import React from "react";
import "./Register.css";
import Greeting from "../Greeting/Greeting";
import FooterButton from "../FooterButton/FooterButton";
import { useValidation } from "../../utils/validation";

function Register({ onRegister, message }) {
  const loggedIn = false;
  const [formSavedProcess, setFormSavedProcess] = React.useState(false);
  const { values, handleChange, resetForm, errors, isValid } =
    useValidation();

  React.useEffect(() => {
    resetForm({});
    setTimeout(() => {
      setFormSavedProcess(false);
    }, 3000);
  }, [resetForm]);

  const handleSubmit = (e) => {
    setFormSavedProcess(true);
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    const { name, email, password } = values;
    onRegister({ name, email, password });
  };

  return (
    <section className="register">
      <div className="register__block">
        <Greeting text="Добро пожаловать!" loggedIn={loggedIn} />
      </div>

      <form className="register__form" onSubmit={handleSubmit}>
        <span className="register__input">Имя</span>
        <input
          className="register__field register__field_name"
          name="name"
          type="text"
          autoComplete="off"
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.name || ""}
          required
          disabled={formSavedProcess ? true : false}
        ></input>
        <span className="register__input-error" id="name-error">
          {errors.name}
        </span>
        <span className="register__input">E-mail</span>
        <input
          className="register__field register__field_email"
          name="email"
          type="email"
          pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
          required
          autoComplete="off"
          onChange={handleChange}
          value={values.email || ""}
          error={errors.email}
          disabled={formSavedProcess ? true : false}
        ></input>
        <span className="register__input-error" id="name-error">
          {errors.email}
        </span>

        <span className="register__input">Пароль</span>
        <input
          className="register__field register__field_password"
          name="password"
          type="password"
          minLength="8"
          required
          autoComplete="off"
          onChange={handleChange}
          value={values.password || ""}
          disabled={formSavedProcess ? true : false}
        ></input>
        <span className="register__input-error" id="email-error">
          {errors.password}
        </span>
        <span className="register__input-error">{message}</span>
        <FooterButton
          disabledButton={!isValid}
          buttonText="Зарегистрироваться"
          paragraph="Уже зарегистрированы?"
          linkText="Войти"
          href="/signin"
          name="register"
        />
      </form>
    </section>
  );
}

export default Register;
