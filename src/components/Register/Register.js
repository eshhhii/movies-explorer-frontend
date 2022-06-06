import React from "react";
import "./Register.css";
import Greeting from "../Greeting/Greeting";
import Form from "../Form/Form";
import Input from "../Input/Input";
import FooterButton from "../FooterButton/FooterButton";
import { useValidation } from "../../utils/validation";

const Register = ({ onRegister }) => {

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

      <Form
                name="register"
                onSubmit={handleSubmit}
                noValidate
            >
                <Input
                    auth
                    id="name"
                    label="Имя"
                    name="name"
                    type="text"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="30"
                    onChange={handleChange}
                    value={values.name || ""}
                    error={errors.name}
                />
                <Input
                    auth
                    id="email"
                    label="E-mail"
                    name="email"
                    type="email"
                    required
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email || ""}
                    error={errors.email}
                />

                <Input
                    auth
                    id="password"
                    label="Пароль"
                    name="password"
                    type="password"
                    minLength="4"
                    required
                    placeholder="Введите пароль"
                    onChange={handleChange}
                    value={values.password || ""}
                    error={errors.password}
                />
              
        <FooterButton
          disabledButton={!isValid}
          buttonText="Зарегистрироваться"
          paragraph="Уже зарегистрированы?"
          linkText="Войти"
          href="/signin"
          name="register"
        />
      </Form>
    </section>
  );
}

export default Register;
