import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavigationLoggedIn.css";

function NavigationLoggedIn() {
  const [menu, setMenu] = React.useState(false);
  const toggleMenu = () => setMenu(!menu);

  return (
    <nav className="nav-log">
      <button
        className="nav-log__burger-btn"
        type="button"
        onClick={toggleMenu}
      ></button>

      <div
        className={`nav-log__container ${
          menu ? "nav-log__container_visible" : ""
        }`}
      >
        <div
          className={`nav-log__burger ${menu ? "nav-log__burger_visible" : ""}`}
        >
          <div className="nav-log__menu-container">
            <button
              className="nav-log__close"
              type="button"
              onClick={toggleMenu}
            ></button>

            <ul className="nav-log__menu">
              <li className="nav-log__item nav-log__item_main ">
                <Link to="/" className="nav-log__link">
                  Главная
                </Link>
              </li>
              <li className="nav-log__item">
                <NavLink
                  to="/movies"
                  className="nav-log__link"
                  activeClassName="nav-log__link_active"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="nav-log__item">
                <NavLink
                  to="/saved-movies"
                  className="nav-log__link"
                  activeClassName="nav-log__link_active"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/profile" className="nav-log__profile-btn">
            Аккаунт
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavigationLoggedIn;
