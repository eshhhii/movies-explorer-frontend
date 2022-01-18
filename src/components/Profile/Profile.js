import React from "react";
import "./Profile.css";
import Greeting from "../Greeting/Greeting";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidation from "../../utils/validation";

function Profile({ onSignOut, onUpdate }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValues } = useValidation();

  const [visibleSubmitButton, setVisibleSubmitButton] = React.useState(false);
  const [isDisabledInput, setDisabledInput] = React.useState(true);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdate({
      name: values.name || currentUser.name,
      email: values.email || currentUser.email,
    });

    setVisibleSubmitButton(false);
    setDisabledInput(true);
  }

  function handleClickEditButton() {
    setDisabledInput(false);
    setVisibleSubmitButton(true);
  }

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  return (
    <>
      <Header />
      <section className="profile">
        <Greeting text={currentUser.name} loggedIn={true} name="profile" />
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <div className="profile__wrapper">
            <span className="profile__name">Имя</span>
            <input
              className="profile__input_name"
              name="name"
              type="text"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={values.name || ""}
              error={errors.name}
              disabled={isDisabledInput}
              required
            ></input>
          </div>

          <div className="profile__wrapper">
            <span className="profile__email">E-mail</span>
            <input
              className="profile__input_email"
              name="email"
              type="email"
              pattern="^[А-Яа-яЁёA-Za-z]+-? ?[А-Яа-яЁёA-Za-z]+$"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={values.email || ""}
              error={errors.email}
              disabled={isDisabledInput}
              required
            ></input>
          </div>
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
