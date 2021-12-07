import React from "react";
import "./Techs.css";
import Heading from "../Heading/Heading";

function Techs() {
  return (
    <section className="techs">
      <Heading heading="Технологии" />
      <div className="techs__container">
        <h2 className="techs__title"> 7 технологий</h2>
        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__item">
            <h4 className="techs__text">HTML</h4>
          </li>
          <li className="techs__item">
            <p className="techs__text">CSS</p>
          </li>
          <li className="techs__item">
            <p className="techs__text">JS</p>
          </li>
          <li className="techs__item">
            <p className="techs__text">React</p>
          </li>
          <li className="techs__item">
            <p className="techs__text">Git</p>
          </li>
          <li className="techs__item">
            <p className="techs__text">Express.js</p>
          </li>
          <li className="techs__item">
            <p className="techs__text">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
