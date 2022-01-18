import React from "react";
import "./Register.css";
import Greeting from "../Greeting/Greeting";
import FooterButton from "../FooterButton/FooterButton";
import useValidation from "../../utils/validation";

function Register({ onRegister }) {
  const loggedIn = false;
  const { values, errors, isValid, handleChange } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
  };

  return (
    <section className="register">
      <div className="register__block">
        <Greeting text="Добро пожаловать!" loggedIn={loggedIn} />
      </div>

      <form className="register__form" onSubmit={handleSubmit} noValidate>
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
          error={errors.name}
          required
        ></input>
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
        ></input>

        <span className="register__input">Пароль</span>
        <input
          className="register__field register__field_password"
          name="password"
          type="password"
          minLength="6"
          required
          autoComplete="off"
          onChange={handleChange}
          value={values.password || ""}
          error={errors.password}
        ></input>
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
