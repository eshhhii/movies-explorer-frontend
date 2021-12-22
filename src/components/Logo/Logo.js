import React from "react";
import { Link } from "react-router-dom";

import MainLogo from "./../../images/logo.svg";
import "./Logo.css";

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={MainLogo} alt="лого" />
    </Link>
  );
}
export default Logo;
