import React from "react";
import "./AboutMe.css";
import Heading from "../Heading/Heading";
import Avatar from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className="about">
      <Heading heading="Студент" />
      <div className="about__container">
        <div className="about__info">
          <h2 className="about__title"> Эмма</h2>
          <p className="about__subtitle">Фронтенд-разработчик, 27 лет</p>
          <p className="about__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about__list">
            <li className="about__item">
              <a className="about__link" target="_blank" rel="noreferrer">
                ссылка
              </a>
            </li>
            <li className="about__item">
              <a className="about__link" target="_blank" rel="noreferrer">
                ссылка
              </a>
            </li>
          </ul>
        </div>
        <img className="about__image" src={Avatar} />
      </div>
    </section>
  );
}

export default AboutMe;
