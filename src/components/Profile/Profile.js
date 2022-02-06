import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Greeting from "../Greeting/Greeting";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/validation";

function Profile({ onSignOut, onUpdate, message }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [formSavedProcess, setFormSavedProcess] = React.useState(false);
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
      setTimeout(() => {
        setFormSavedProcess(false);
      }, 3000);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(e) {
    setFormSavedProcess(true);
    e.preventDefault();
    onUpdate({
      name: values.name || currentUser.name,
      email: values.email || currentUser.email,
    });
  }

  return (
    <>
      <Header />
      <section className="profile">
        <Greeting
          text={`Привет, ${currentUser.name}!`}
          loggedIn={true}
          name="profile"
        />
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__wrapper">
            <span className="profile__name">Имя</span>
            <input
              className="profile__input_name"
              name="name"
              type="text"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              pattern="^[А-Яа-яЁёA-Za-z]+-? ?[А-Яа-яЁёA-Za-z]+$"
              onChange={handleChange}
              value={values.name || ""}
              disabled={formSavedProcess ? true : false}
              required
            ></input>
          </div>
          <span className="login__input-error" id="name-error">
            {errors.name}
          </span>

          <div className="profile__wrapper">
            <span className="profile__email">E-mail</span>
            <input
              className="profile__input_email"
              name="email"
              type="email"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
              value={values.email || ""}
              disabled={formSavedProcess ? true : false}
              required
            ></input>
          </div>
          <span className="login__input-error" id="name-error">
            {errors.email}
          </span>
          <span className="profile__input-message">{message}</span>

          <button
            type="submit"
            className={`profile__button
          ${!isValid && "profile__button_disabled"}
          ${
            values.email === currentUser.email &&
            values.name === currentUser.name &&
            "profile__button_disabled"
          }`}
          >
            Редактировать
          </button>
          <Link to="/">
            <button
              className="profile__button-exit"
              type="button"
              onClick={onSignOut}
            >
              Выйти из аккаунта
            </button>
          </Link>
        </form>
      </section>
    </>
  );
}

export default Profile;
