import React from "react";
import "./AboutMe.css";
import Heading from "../Heading/Heading";
import Avatar from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className="about" id="student">
      <Heading heading="Студент" />
      <div className="about__container">
        <div className="about__info">
          <h2 className="about__title"> Эмма</h2>
          <p className="about__subtitle">Фронтенд-разработчик, 27 лет</p>
          <p className="about__description">
            Я живу в Калининграде, закончила факультет финансового менеджмента.
            Я люблю слушать музыку и смотреть сериалы, а ещё увлекаюсь бегом.
            Недавно начала кодить. С 2016 года работаю в сфере автомобильного
            бизнеса. После того, как пройду курс по веб-разработке, планирую
            уйти работать в новую сферу и уволиться с работы.
          </p>
          <ul className="about__list">
            <li className="about__item">
              <a
                className="about__link"
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com"
              >
                Facebook
              </a>
            </li>
            <li className="about__item">
              <a
                className="about__link"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/eshhhii"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <img className="about__image" src={Avatar} alt="аватар" />
      </div>
    </section>
  );
}

export default AboutMe;
