import React from "react";
import "./Profile.css";

function Profile() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {name}!</h2>
      <form className="profile__form">
        <div className="profile__wrapper">
          <span className="profile__name">Имя</span>
          <input
            className="profile__input_name"
            name="name"
            onChange={handleNameChange}
            type="text"
            autoComplete="off"
            minLength="2"
            maxLength="40"
            required
          ></input>
        </div>

        <div className="profile__wrapper">
          <span className="profile__email">E-mail</span>
          <input
            className="profile__input_email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            pattern="^[А-Яа-яЁёA-Za-z]+-? ?[А-Яа-яЁёA-Za-z]+$"
            autoComplete="off"
            minLength="2"
            maxLength="40"
            required
          ></input>
        </div>
        <div className="profile__container">
          <button className="profile__button" type="submit">
            Редактировать
          </button>
          <button className="profile__button_exit" type="button">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
