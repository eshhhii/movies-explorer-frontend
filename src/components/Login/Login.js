import React from "react";
import "./Login.css";
import Greeting from "../Greeting/Greeting";
import FooterButton from "../FooterButton/FooterButton";
import useValidation from "../../utils/validation";

function Login({ onLogin }) {
  const loggedIn = false;
  const { values, errors, isValid, handleChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <section className="login">
      <div className="login__block">
        <Greeting text="Рады видеть!" loggedIn={loggedIn} />
      </div>

      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <span className="login__input">E-mail</span>
        <input
          className="login__field login__field_email"
          name="email"
          type="email"
          pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
          required
          autoComplete="off"
          onChange={handleChange}
          error={errors.email}
          value={values.email || ""}
        ></input>

        <span className="login__input">Пароль</span>
        <input
          className="login__field login__field_password"
          name="password"
          type="password"
          minLength="6"
          required
          autoComplete="off"
          onChange={handleChange}
          error={errors.password}
          value={values.password || ""}
        ></input>
        <FooterButton
          disabledButton={!isValid}
          buttonText="Войти"
          paragraph="Еще не зарегистрированы?"
          linkText="Регистрация"
          href="/signup"
          name="login"
        />
      </form>
    </section>
  );
}

export default Login;
