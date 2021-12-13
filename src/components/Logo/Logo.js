import React from "react";
import { Link } from "react-router-dom";

import RegisterLogo from "./../../images/logo.svg";
import './Logo.css';


function Logo() {
  return (
    <Link to="/signup">
      <img className="logo" src={RegisterLogo} alt="лого" />
    </Link>
  );
}
export default Logo;