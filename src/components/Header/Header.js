import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../images/main-logo.svg";
import Navigation from "../Navigation/Navigation";
import NavigationLoggedIn from "../NavigationLoggedIn/NavigationLoggedIn";
import "./Header.css";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo_link">
        <img src={headerLogo} className="header__logo" alt="Лого" />
      </Link>
      {!loggedIn && <Navigation />}
      {loggedIn && <NavigationLoggedIn />}
    </header>
  );
}

export default Header;
