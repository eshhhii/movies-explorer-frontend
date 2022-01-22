import React from "react";
import "./Profile.css";
import Greeting from "../Greeting/Greeting";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/validation";

function Profile({ onSignOut, onUpdate }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [formSavedProcess, setFormSavedProcess] = React.useState(false);
  const [visibleSubmitButton, setVisibleSubmitButton] = React.useState(false);
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
    onUpdate({ email: values.email, name: values.name });
    setVisibleSubmitButton(false);
  }
  function handleClickEditButton() {
    setVisibleSubmitButton(true);
  }

  return (
    <>
      <Header />
      <section className="profile">
        <Greeting text={currentUser.name} loggedIn={true} name="profile" />
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
              value={values.name || currentUser.name}
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
              value={values.email || currentUser.email}
              disabled={formSavedProcess ? true : false}
              required
            ></input>
          </div>
          <span className="login__input-error" id="name-error">
            {errors.email}
          </span>
          <div className="profile__container">
            {!visibleSubmitButton && (
              <>
                <button
                  className="profile__button"
                  type="submit"
                  onClick={handleClickEditButton}
                >
                  Редактировать
                </button>
                <button
                  className="profile__button_exit"
                  type="button"
                  onClick={onSignOut}
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
            {visibleSubmitButton && (
              <button
                type="submit"
                className={`profile__button-submit ${
                  !isValid ? "profile__button-submit_disabled" : ""
                }`}
                disabled={!isValid}
              >
                Сохранить
              </button>
            )}
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
