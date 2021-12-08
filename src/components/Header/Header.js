import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../images/main-logo.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="Логотип" />
      {!loggedIn && <Navigation />}
    </header>
  );
}

export default Header;
