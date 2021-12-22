import React from "react";
import { Link } from "react-router-dom";
import "./FooterButton.css";

function FooterButton({ buttonText, paragraph, linkText, href, name }) {
  return (
    <div
      className={`footer-button ${
        name === "login" ? "footer-button_login" : ""
      }  ${name === "register" ? "footer-button_register" : ""}`}
    >
      <button className="footer-button__button" type="submit">
        {buttonText}
      </button>
      <div
        className={`footer-button__redirect ${
          name === "login" ? "footer-button__redirect_login" : ""
        }  ${name === "register" ? "footer-button__redirect_register" : ""}`}
      >
        <p className="footer-button__paragraph">{paragraph}</p>
        <Link to={href} className="footer-button__link">
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default FooterButton;
