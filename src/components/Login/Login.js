import React from "react";
import "./Login.css";
import Greeting from "../Greeting/Greeting";
import FooterButton from "../FooterButton/FooterButton";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailSubmit(e) {
    setEmail(e.target.value);
  }

  function handlePasswordSubmit(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <section className="login">
      <div className="login__block">
        <Greeting text="Рады видеть!" />
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <span className="login__input">E-mail</span>
        <input
          className="login__field login__field_email"
          name="email"
          type="email"
          required
          autoComplete="off"
          onSubmit={handleEmailSubmit}
        ></input>

        <span className="login__input">Пароль</span>
        <input
          className="login__field login__field_password"
          name="password"
          type="password"
          required
          autoComplete="off"
          onSubmit={handlePasswordSubmit}
        ></input>
        <FooterButton
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
