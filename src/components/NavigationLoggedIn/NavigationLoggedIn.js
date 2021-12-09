import React from "react";
import { Link } from "react-router-dom";
import "./NavigationLoggedIn.css";

function NavigationLoggedIn() {
  return (
    <nav className="nav">
      <ul className="nav__menu">
        <li className="nav__link">
          <Link to="/signup" className="nav__signup">
            Регистрация
          </Link>
        </li>
        <li className="nav__link">
          <Link to="/signin" className="nav__signin">
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationLoggedIn;