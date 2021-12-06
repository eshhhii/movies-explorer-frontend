import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../images/main-logo.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="Логотип" />
      <div className="header__container">
        <Link to="/signup" className="header__signup">
          Регистрация
        </Link>
        <Link to="/signin" className="header__signin">
          <button className="header__button"> Войти </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
