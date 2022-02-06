/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import {
  SERVER_ERROR,
  MOVIES_NOT_FOUND,
  INVALID_DATA,
  CONFLICT_EMAIL,
  AUTH_ERROR,
  PROFILE_UPDATE_ERROR,
  SUCCSESS_UPDATE,
  MOVIES_SERVER_ERROR,
  SHORT,
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

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); //это загрузка всех фильмов
  const [userData, setUserData] = React.useState(true);
  const [isSavedMoviesLoading, setIsSavedMoviesLoading] = React.useState(true);
  const [movies, setMovies] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const history = useHistory();

  const resetMessage = () => {
    setMessage(null);
  };

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
          })
          .catch((err) =>
            console.log("Невозможно получить данные с сервера", err)
          );
      } else {
        setCurrentUser(JSON.parse(userLocalStorage));
      }

      if (!moviesLocalStorage) {
        moviesApi
          .getMovies()
          .then((res) => {
            localStorage.setItem("movies", JSON.stringify(res || []));
            setMovies(res || []);
            setIsLoading(false);
          })
          .catch((err) => {
            if (err === "500") {
              setMessage(MOVIES_SERVER_ERROR);
            }
            console.log(err);
          });
      } else {
        setMovies(JSON.parse(moviesLocalStorage));
        setIsLoading(false);
      }

      if (!savedMoviesLocalStorage) {
        mainApi
          .getUserMovies()
          .then((res) => {
            localStorage.setItem("savedMovies", JSON.stringify(res || []));
            setSavedMovies(res || []);
            setIsSavedMoviesLoading(false);
          })
          .catch((err) => {
            if (err === "500") {
              setMessage(MOVIES_SERVER_ERROR);
            }
            console.log(err);
          });
      } else {
        setSavedMovies(JSON.parse(savedMoviesLocalStorage));
        setIsSavedMoviesLoading(false);
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
          setLoggedIn(true);
          setUserData(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setUserData(false);
        console.log(`Error: ${err}`);
      });
  }, []);

  React.useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  function handleUserRegistration(data) {
    auth
      .register(data)
      .then((res) => {
        if (res) {
          handleUserAuthorization(data);
        }
      })
      .then(() => history.push("/movies"))
      .catch((err) => {
        if (err === "400") {
          return showAnswer(INVALID_DATA);
        } else if (err === "409") {
          return showAnswer(CONFLICT_EMAIL);
        } else if (err === "500") {
          return showAnswer(SERVER_ERROR);
        }
        console.log(err);
      });
  }

  function handleUserAuthorization(data) {
    auth
      .authorize(data)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/movies");
          localStorage.setItem("loggedIn", true);
          handleTokenCheck();
        }
      })
      .catch((err) => {
        if (err === "400") {
          return showAnswer(INVALID_DATA);
        } else if (err === "401") {
          return showAnswer(AUTH_ERROR);
        } else if (err === "500") {
          return showAnswer(SERVER_ERROR);
        }
        console.log(err);
      });
  }

  function handleUpdateUserInfo({ name, email }) {
    mainApi
      .editUserInfo(name, email)
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res));
        setCurrentUser(res);
        showAnswer(SUCCSESS_UPDATE);
      })
      .catch((err) => {
        if (err === "500") {
          return showAnswer(SERVER_ERROR);
        } else if (err === "400") {
          return showAnswer(PROFILE_UPDATE_ERROR);
        }
        console.log(err);
      });
  }

  function handleUserSignOut() {
    mainApi
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({
          name: "",
          email: "",
        });
        localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        console.log(`При выходе из приложения произошла ошибка ${err}`);
      });
  }

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

  function handleDeleteMovie(movie) {
    const movieId = movie.id || movie.movieId;
    const savedMovie = savedMovies.find(
      (element) => element.movieId === String(movieId)
    );
    mainApi
      .deleteMovieCard(savedMovie._id)
      .then(() => {
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
        console.log(err);
        console.error(`Фильм невозможно удалить из-за ошибки ${err}`);
      });
  }

  function handleMovieSearch(request) {
    const searchWord = request.toLowerCase();

    const movieSearchResult = movies.filter((value) => {
      return value.nameRU.toLowerCase().includes(searchWord);
    });
    if (movieSearchResult.length === 0) {
      setMessage(MOVIES_NOT_FOUND);
      setFoundMovies([]);
    } else {
      setFoundMovies(movieSearchResult);
      resetMessage();
    }
  }

  function handleSavedMovieSearch(request) {
    const searchWord = request.toLowerCase();
    if (searchWord === "") {
      setFoundSavedMovies([]);
      resetMessage();
      return;
    }
    const savedMovieSearchResult = savedMovies.filter((value) => {
      return value.nameRU.toLowerCase().includes(searchWord);
    });
    if (savedMovieSearchResult.length === 0) {
      setMessage(MOVIES_NOT_FOUND);
      setFoundSavedMovies([]);
    } else {
      setFoundSavedMovies(savedMovieSearchResult);
      resetMessage();
    }
  }

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
            isLoading={isLoading}
            message={message}
            movies={foundMovies}
            savedMovies={savedMovies}
            loggedIn={loggedIn}
            searchMovie={handleMovieSearch}
            filterMovies={filterMovies}
            userData={userData}
            onCardLike={handleSaveMovie}
            onCardUnlike={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoading={isSavedMoviesLoading}
            loggedIn={loggedIn}
            message={message}
            userData={userData}
            savedMovies={savedMovies}
            searchSavedMovie={handleSavedMovieSearch}
            filterMovies={filterMovies}
            foundSavedMovies={foundSavedMovies}
            onCardLike={handleSaveMovie}
            onCardUnlike={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            message={message}
            userData={userData}
            isLoading={userData}
            onSignOut={handleUserSignOut}
            loggedIn={loggedIn}
            onUpdate={handleUpdateUserInfo}
          />
          <Route path="/signup">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register onRegister={handleUserRegistration} message={message} />
            )}
          </Route>
          <Route path="/signin">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login onLogin={handleUserAuthorization} message={message} />
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
