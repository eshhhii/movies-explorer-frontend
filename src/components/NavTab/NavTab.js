import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <section className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <button className="nav__link">О проекте</button>
        </li>
        <li className="nav__item">
          <button className="nav__link">Технологии</button>
        </li>
        <li className="nav__item">
          <button className="nav__link">Студент</button>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;
