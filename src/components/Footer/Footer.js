import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <header className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__copyright"> © {new Date().getFullYear()}</p>
        <nav>
          <ul className="footer__list">
            <li className="footer__item">
              <a
                className="footer__link"
                className="footer__link"
                href="https://praktikum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item">
              <a
                className="footer__link"
                className="footer__link"
                href="https://github.com/yandex-praktikum"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__item">
              <a
                className="footer__link"
                className="footer__link"
                href="https://www.facebook.com/yandex.praktikum"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Footer;
