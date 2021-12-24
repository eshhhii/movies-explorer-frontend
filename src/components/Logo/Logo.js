import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
import MainLogo from "./../../images/logo.svg";

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={MainLogo} alt="лого" />
    </Link>
  );
}
export default Logo;
