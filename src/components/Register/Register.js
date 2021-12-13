import React from "react";
import "./Register.css";
import Greeting from "../Greeting/Greeting";
import FooterButton from "../FooterButton/FooterButton";

function Register({ onRegister }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <section className="register">
      <div className="register__block">
        <Greeting text="Добро пожаловать!" />
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
          onSubmit={handleNameChange}
          required
        ></input>
        <span className="register__input">E-mail</span>
        <input
          className="register__field register__field_email"
          name="email"
          type="email"
          required
          autoComplete="off"
          onSubmit={handleEmailChange}
        ></input>

        <span className="register__input">Пароль</span>
        <input
          className="register__field register__field_password"
          name="password"
          type="password"
          required
          autoComplete="off"
          onSubmit={handlePasswordChange}
        ></input>
        <FooterButton
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
