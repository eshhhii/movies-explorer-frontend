import React from "react";
import { Link } from "react-router-dom";

import "./Greeting.css";
import Logo from "../../images/logo.svg";

function Greeting({ text, loggedIn, name }) {
  return (
    <div className={`greeting ${name === "profile" ? "greeting_profile" : ""}`}>
      {!loggedIn && (
        <Link to="/" className="greeting__link">
          <img className="greeting__logo" src={Logo} alt="Лого"></img>
        </Link>
      )}
      <h1
        className={`greeting__text ${
          name === "profile" ? "greeting__text_profile" : ""
        }`}
      >
        {text}
      </h1>
    </div>
  );
}

export default Greeting;
