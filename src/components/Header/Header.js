import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import NavigationLoggedIn from "../NavigationLoggedIn/NavigationLoggedIn";
import "./Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header() {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <header className="header">
      <Logo />
      {!currentUser.email && <Navigation />}
      {currentUser.email && <NavigationLoggedIn />}
    </header>
  );
}

export default Header;
