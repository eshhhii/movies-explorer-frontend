/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import {
  MOVIES_NOT_FOUND,
  PROFILE_UPDATE_ERROR,
  SUCCSESS_UPDATE,
  MOVIES_SERVER_ERROR,
  SHORT,
} from "../../utils/messages";
import { getErrors } from "../../utils/errors";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NotFound from "../NotFound/NotFound";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [preloader, setPreloader] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
  const [isFormSending, setIsFormSending] = React.useState(false);
  const history = useHistory();

  function resetMessage() {
    setMessage(null);
  }

  React.useEffect(() => {
    if (loggedIn) {
      const userLocalStorage = localStorage.getItem("currentUser");
      const moviesLocalStorage = localStorage.getItem("movies");
      const savedMoviesLocalStorage = localStorage.getItem("savedMovies");

      if (!userLocalStorage) {
        mainApi
          .getUserInfo()
          .then((res) => {
            localStorage.setItem("currentUser", JSON.stringify(res || {}));
            setCurrentUser(res || {});
            setLoggedIn(true);
          })
          .catch((err) =>
            console.log("Невозможно получить данные с сервера", err)
          );
        setLoggedIn(false);
      } else {
        setCurrentUser(JSON.parse(userLocalStorage));
      }
      if (!moviesLocalStorage) {
        setPreloader(true);
        moviesApi
          .getMovies()
          .then((res) => {
            localStorage.setItem("movies", JSON.stringify(res || []));
            setMovies(res || []);
          })
          .catch((err) => {
            if (err === "500") {
              setMessage(MOVIES_SERVER_ERROR);
            }
            console.log(err);
          })
          .finally(() => {
            setPreloader(false);
          });
      } else {
        setMovies(JSON.parse(moviesLocalStorage));
      }

      if (!savedMoviesLocalStorage) {
        mainApi
          .getUserMovies()
          .then((res) => {
            localStorage.setItem("savedMovies", JSON.stringify(res || []));
            setSavedMovies(res || []);
          })
          .catch((err) => {
            if (err === "500") {
              setMessage(MOVIES_SERVER_ERROR);
            }
            console.log(err);
          });
      } else {
        setSavedMovies(JSON.parse(savedMoviesLocalStorage));
      }
    }
  }, [loggedIn]);

  React.useEffect(() => {
    resetMessage();
  }, []);

  function showAnswer(message) {
    setMessage(message);
    setTimeout(() => setMessage(""), 10000);
  }

  const handleTokenCheck = React.useCallback(() => {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setCurrentUser({});
        console.log(`Неверный токен: ${err}`);
      });
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  React.useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  function handleUserRegistration(data) {
    setIsFormSending(true);
    return auth
      .register(data)
      .then((res) => {
        if (res) {
          handleUserAuthorization(data);
        }
      })
      .then(() => history.push("/movies"))
      .catch((err) => {
        showAnswer(getErrors(err));
        console.log(err);
      })
      .finally(() => setIsFormSending(false));
  }

  function handleUserAuthorization(data) {
    setIsFormSending(true);
    return auth
      .authorize(data)
      .then((res) => {
        if (res) {
          handleTokenCheck();
          setLoggedIn(true);
          setFoundMovies([]);
        }
      })
      .catch((err) => {
        showAnswer(getErrors(err));
        console.log(err);
      })
      .finally(() => setIsFormSending(false));
  }

  function handleUpdateUserInfo(name, email) {
    setIsFormSending(true);
    return mainApi
      .editUserInfo(name, email)
      .then((updateUser) => {
        localStorage.setItem("currentUser", JSON.stringify(updateUser));
        setCurrentUser(updateUser);
        showAnswer(SUCCSESS_UPDATE);
      })
      .catch((err) => {
        showAnswer(PROFILE_UPDATE_ERROR);
        console.log(getErrors(err));
      })
      .finally(() => setIsFormSending(false));
  }

  function handleUserSignOut() {
    return auth
      .signOut()
      .then(() => {
        setCurrentUser({});
        setLoggedIn(false);
        setMovies([]);
        setFoundMovies([]);
        setFoundSavedMovies([]);
        localStorage.clear();

        history.push("/");
      })
      .catch((err) => {
        console.log(`При выходе из приложения произошла ошибка ${err}`);
      });
  }
  //сохраняем фильм
  function handleSaveMovie(movie) {
    mainApi
      .addMovieCard(movie)
      .then((res) => {
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([res, ...savedMovies])
        );
        setSavedMovies([res, ...savedMovies]);
        setFoundSavedMovies([res, ...savedMovies]);
        setMessage("");
      })
      .catch((err) => {
        console.log(`Невозможно сохранить фильм. Код ошибки ${err}`);
        setMessage(err);
      });
  }

  //удаляем фильм
  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find((elem) => elem.movieId === movie.id);

    if (!savedMovie) {
      console.error("Фильм не был сохранен, удаление невозможно", movie);
      return;
    }
    mainApi
      .deleteMovieCard(savedMovie._id)
      .then((res) => {
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(savedMovies.filter((i) => i._id !== savedMovie._id))
        );

        setSavedMovies(savedMovies.filter((i) => i._id !== savedMovie._id));
        setFoundSavedMovies(
          savedMovies.filter((i) => i._id !== savedMovie._id)
        );
      })
      .catch((err) => {
        console.log(getErrors(err));
      });
  }

  //поиск по фильмам
  function handleMovieSearch(request) {
    const searchWord = request.toLowerCase();

    const foundedMovies = movies.filter((value) => {
      return value.nameRU.toLowerCase().includes(searchWord);
    });
    if (foundedMovies.length === 0) {
      setMessage(MOVIES_NOT_FOUND);
      setFoundMovies([]);
    } else {
      setFoundMovies(foundedMovies);
      resetMessage();
    }
  }

  //поиск по сохраненным фильмам
  function handleSavedMovieSearch(request) {
    const searchWord = request.toLowerCase();
    if (searchWord === "") {
      setFoundSavedMovies([]);
      resetMessage();
      return;
    }
    const savedFoundedMovies = savedMovies.filter((value) => {
      return value.nameRU.toLowerCase().includes(searchWord);
    });
    if (savedFoundedMovies.length === 0) {
      setMessage(MOVIES_NOT_FOUND);
      setFoundSavedMovies([]);
    } else {
      setFoundSavedMovies(savedFoundedMovies);
      resetMessage();
    }
  }

  //фильруем короткометражки
  function filterMovies(movies) {
    return movies.filter((movie) => movie.duration <= SHORT);
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
            preloader={preloader}
            message={message}
            movies={foundMovies}
            savedMovies={savedMovies}
            loggedIn={loggedIn}
            searchMovie={handleMovieSearch}
            filterMovies={filterMovies}
            onMovieLike={handleSaveMovie}
            onMovieDelete={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            message={message}
            savedMovies={savedMovies}
            searchSavedMovie={handleSavedMovieSearch}
            filterMovies={filterMovies}
            foundSavedMovies={foundSavedMovies}
            onMovieDelete={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            message={message}
            handleUserSignOut={handleUserSignOut}
            loggedIn={loggedIn}
            onUpdate={handleUpdateUserInfo}
            isSending={isFormSending}
          />
          <Route path="/signup">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register
                onRegister={handleUserRegistration}
                message={message}
                isSending={isFormSending}
              />
            )}
          </Route>
          <Route path="/signin">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login
                onLogin={handleUserAuthorization}
                message={message}
                isSending={isFormSending}
              />
            )}
          </Route>
          <Route path="*">
            <NotFound loggedIn={loggedIn} />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
