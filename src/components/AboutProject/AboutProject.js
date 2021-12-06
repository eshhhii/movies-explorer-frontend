import React from "react";
import "./AboutProject.css";
import Heading from "../Heading/Heading";

function AboutProject() {
  return (
    <section className="project">
      <Heading heading="О проекте" />
      <ul className="project__list">
        <li className="project__item">
          <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
          <p className="project__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="project__item">
          <h3 className="project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="project__timeline">
        <li className="project__time project__time_color_black">1 неделя</li>
        <li className="project__time project__time_color_grey">4 недели</li>
      </ul>

      <ul className="project__parts">
        <li className="project__part">Back-end</li>
        <li className="project__part">Front-end</li>
      </ul>
    </section>
  );
}

export default AboutProject;
