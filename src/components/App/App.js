/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as utils from "../../utils/utils";
import {
  SERVER_ERROR,
  MOVIES_NOT_FOUND,
  START_SEARCHING,
} from "../../utils/messages";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import successIcon from "../../images/success.png";
import failIcon from "../../images/fail.png";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [info, setInfo] = React.useState({ icon: "", text: "" });
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [movieSearchError, setMovieSearchError] = React.useState("");
  const history = useHistory();

  const location = useLocation();
  const path = location.pathname;

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          setSavedMovies(movies);

          localStorage.setItem("savedMovies", JSON.stringify(movies));
          localStorage.setItem("currentuser", JSON.stringify(userData));
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const handleTokenCheck = React.useCallback(() => {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(`Неверный токен: ${err}`));
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  React.useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleInfoTooltipContainer({ icon, text }) {
    setInfo({ icon: icon, text: text });
  }

  function handleUserRegistration(email, password, name) {
    auth
      .register(email, password, name)
      .then((res) => {
        handleInfoTooltipContainer({
          icon: successIcon,
          text: "Вы успешно зарегистрировались!",
        });
        handleInfoTooltipOpen();

        setTimeout(history.push, 3500, "/signin");
        setTimeout(closeAllPopups, 3000);
        handleUserAuthorization(email, password);
        history.push("/movies");
      })
      .catch((err) => {
        handleInfoTooltipContainer({
          icon: failIcon,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltipOpen();

        setTimeout(closeAllPopups, 3000);

        console.log(err);
      });
  }

  function handleUserAuthorization(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        handleTokenCheck();
        setLoggedIn(true);
        handleInfoTooltipContainer({
          icon: successIcon,
          text: "Вы успешно авторизовались!",
        });
        handleInfoTooltipOpen();
        setTimeout(history.push, 3500, "/");
        setTimeout(closeAllPopups, 3000);
        history.push("/movies");
      })
      .catch((err) => {
        handleInfoTooltipContainer({
          icon: failIcon,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltipOpen();

        setTimeout(closeAllPopups, 3000);

        console.log(err);
      });
  }

  function handleUserSignOut() {
    mainApi
      .signOut()
      .then(() => {
        setLoggedIn(false);
        localStorage.clear();
        setCurrentUser({});
        setSavedMovies([]);
        history.push("/");
      })
      .catch((err) => {
        console.log(`Ошибка при выходе из приложения. ${err}`);
      });
  }

  function getAllMovies() {
    setMovieSearchError("");
    setIsLoading(true);

    moviesApi
      .getMovies()
      .then((movies) => {
        localStorage.setItem("allMovies", JSON.stringify(movies));

        setMovies(utils.checkSavedMovies(movies, savedMovies));
        setMovieSearchError(MOVIES_NOT_FOUND);
      })
      .catch((err) => {
        setMovieSearchError(SERVER_ERROR);
        console.log(utils.getErrors(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUserInfo(email, name) {
    mainApi
      .editUserInfo(email, name)
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          handleInfoTooltipContainer({
            icon: successIcon,
            text: "Вы успешно обновили данные!",
          });
          handleInfoTooltipOpen();
          setTimeout(history.push, 3500, "/");
          setTimeout(closeAllPopups, 3000);
        }
      })
      .catch((err) => {
        handleInfoTooltipContainer({
          icon: failIcon,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltipOpen();

        setTimeout(closeAllPopups, 3000);

        console.log(err);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .addMovieCard(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(utils.getErrors(err));
      });
  }

  function handleDeleteMovie(movie) {
    const movieId = movie.id || movie.movieId;
    const userMovie = savedMovies.find(
      (savedMovie) => savedMovie.movieId === String(movieId)
    );

    mainApi
      .deleteMovieCard(userMovie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (savedMovie) => savedMovie.movieId !== String(movieId)
        );

        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(utils.getErrors(err));
      });
  }

  function handleCardClickButton(movie) {
    if (!movie.isSaved && !movie._id) {
      handleSaveMovie(movie);
    } else {
      handleDeleteMovie(movie);
    }
  }

  React.useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem("allMovies"));

    if (allMovies) {
      setMovies(utils.checkSavedMovies(allMovies, savedMovies));
      setMovieSearchError(MOVIES_NOT_FOUND);
    } else {
      setMovieSearchError(START_SEARCHING);
      setMovies([]);
    }
  }, [savedMovies]);

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoading={isLoading}
            cards={movies}
            loggedIn={loggedIn}
            onGetMovies={getAllMovies}
            onCardClickButton={handleCardClickButton}
            movieSearchError={movieSearchError}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            onCardClickButton={handleCardClickButton}
          />
          <Route path="/signup">
            <Register onRegister={handleUserRegistration} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleUserAuthorization} />
          </Route>
          <ProtectedRoute
            path="/profile"
            component={Profile}
            onSignOut={handleUserSignOut}
            loggedIn={loggedIn}
            onUpdate={handleUpdateUserInfo}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          info={info}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
