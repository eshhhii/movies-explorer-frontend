import React from "react";
import "./Greeting.css";
import Logo from "../Logo/Logo";

function Greeting({ text, loggedIn, name }) {
  return (
    <div className={`greeting ${name === "profile" ? "greeting_profile" : ""}`}>
      {!loggedIn && <Logo />}
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
