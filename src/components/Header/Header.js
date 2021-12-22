import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import NavigationLoggedIn from "../NavigationLoggedIn/NavigationLoggedIn";
import "./Header.css";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <Logo />
      {!loggedIn && <Navigation />}
      {loggedIn && <NavigationLoggedIn />}
    </header>
  );
}

export default Header;
