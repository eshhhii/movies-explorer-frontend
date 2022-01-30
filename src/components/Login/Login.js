import React from "react";
import "./Login.css";
import Greeting from "../Greeting/Greeting";
import FooterButton from "../FooterButton/FooterButton";
import { useFormWithValidation } from "../../utils/validation";

function Login({ onLogin }) {
  const loggedIn = false;
  const [formSavedProcess, setFormSavedProcess] = React.useState(false);
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

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
    const { password, email } = values;
    onLogin({ password, email });
  };

  return (
    <section className="login">
      <div className="login__block">
        <Greeting text="Рады видеть!" loggedIn={loggedIn} />
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <span className="login__input">E-mail</span>
        <input
          className="login__field login__field_email"
          name="email"
          type="email"
          pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
          required
          autoComplete="off"
          onChange={handleChange}
          value={values.email || ""}
          disabled={formSavedProcess ? true : false}
        ></input>
        <span className="login__input-error" id="email-error">
          {errors.email}
        </span>

        <span className="login__input">Пароль</span>
        <input
          className="login__field login__field_password"
          name="password"
          type="password"
          minLength="8"
          required
          autoComplete="off"
          onChange={handleChange}
          value={values.password || ""}
          disabled={formSavedProcess ? true : false}
        ></input>
        <span className="login__input-error" id="email-error">
          {errors.password}
        </span>
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
