import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavigationLoggedIn.css";
import menuBurger from "../../images/burger-menu.svg";
import close from "../../images/close.svg";

function NavigationLoggedIn() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => setMenu(!menu);
  return (
    <nav className="burger">
      <button className="burger__button" type="button" onClick={toggleMenu}>
        <img className="burger__image" src={menuBurger} alt="" />
      </button>

      <div
        className={`burger__container ${
          menu ? "burger__container_visible" : ""
        }`}
      >
        <div
          className={`burger__burger ${menu ? "burger__burger_visible" : ""}`}
        >
          <div className="nav-log__menu_container">
            <button
              className="nav-log__close"
              type="button"
              onClick={toggleMenu}
            >
              <img className="nav-log__image" src={close} alt="" />
            </button>
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
          <NavLink
            to="/profile"
            className="nav-log__link nav-log__link_profile"
            activeClassName="nav-log__link_active"
          >
            Аккаунт
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavigationLoggedIn;
