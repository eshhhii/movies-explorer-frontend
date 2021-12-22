import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <section className="navtab">
      <ul className="navtab__list">
        <li className="navtab__item">
          <a
            className="navtab__link"
            href="#aboutProject"
            target="_self"
            rel="noopener noreferrer"
          >
            О проекте
          </a>
        </li>
        <li className="navtab__item">
          <a
            className="navtab__link"
            href="#techs"
            target="_self"
            rel="noopener noreferrer"
          >
            Технологии
          </a>
        </li>
        <li className="navtab__item">
          <a
            className="navtab__link"
            href="#student"
            target="_self"
            rel="noopener noreferrer"
          >
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;
