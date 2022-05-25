import React from "react";
import "./Login.css";
import Greeting from "../Greeting/Greeting";
import Form from "../Form/Form";
import Input from "../Input/Input";
import FooterButton from "../FooterButton/FooterButton";
import { useValidation } from "../../utils/validation";

const Login = ({ onLogin }) => {

  const loggedIn = false;
  const { values, errors, isValid, handleChange } = useValidation();

  const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(values.email, values.password);
  };


  return (
    <section className="login">
      <div className="login__block">
        <Greeting text="Рады видеть!" loggedIn={loggedIn} />
      </div>

      <Form name="login" onSubmit={handleSubmit} noValidate>
        <Input
                    auth
                    id="email"
                    label="E-mail"
                    name="email"
                    type="email"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email || ""}
                    error={errors.email}
                />
                <Input 
                auth id="password" 
                label="Пароль" 
                name="password" 
                type="password"
                minLength="4"
                placeholder="Пароль" 
                onChange={handleChange} 
                value={values.password || ""} 
                error={errors.password}
                />
        <FooterButton
          disabledButton={!isValid}
          buttonText="Войти"
          paragraph="Еще не зарегистрированы?"
          linkText="Регистрация"
          href="/signup"
          name="login"
        />
        </Form>
    </section>
  );
}

export default Login;
