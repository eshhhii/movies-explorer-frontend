import React from "react";
import { Switch, Route } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../utils/auth.js";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Footer from "../Footer/Footer";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import successIcon from "../../images/sucsess.png";
import failIcon from "../../images/fail.png";

function App() {
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={false} />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header loggedIn={true} />
            <Movies />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header loggedIn={true} />
            <SavedMovies />
            <Footer />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/profile">
            <Header loggedIn={true} />
            <Profile />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          info={info}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
