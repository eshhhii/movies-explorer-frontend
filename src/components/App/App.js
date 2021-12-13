import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={<Header loggedIn={false} />}
          element={<Main />}
          element={<Footer />}
        ></Route>
        <Route
          path="/movies"
          element={<Header />}
          element={<Movies />}
          element={<Footer />}
        ></Route>
        <Route
          path="/saved-movies"
          element={<Header loggedIn={true} />}
          element={<SavedMovies />}
          element={<Footer />}
        ></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route
          path="/profile"
          element={<Header loggedIn={true} />}
          element={<Profile />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
