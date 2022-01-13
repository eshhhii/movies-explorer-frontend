import { SHORT } from "./messages";

export const checkSavedMovies = (allMovies, savedMovies) => {
  savedMovies.forEach((savedMovie) => {
    const movie = allMovies.find((item) => item.nameRU === savedMovie.nameRU);
    movie.isSaved = true;
  });
  return allMovies;
};

export const searchMovie = (movies, value) =>
  movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(value.toLowerCase());
  });

export const removeWhiteSpace = (value) => {
  return value.trim();
};

export const filterMovies = (movies, checked) => {
  return movies.filter((movie) => (checked ? movie.duration <= SHORT : Number));
};

export const getMoviesCount = () => {
  switch (true) {
    case window.innerWidth >= 944:
      return 12;
    case window.innerWidth >= 570:
      return 8;
    default:
      return 5;
  }
};

export const loadMovies = () => {
  if (window.innerWidth >= 944) {
    return 3;
  }
  return 2;
};

export const getErrors = (err) => {
  if (err === "Ошибка: 400" || err.message === "Ошибка: 400")
    return "Не верно заполнено одно из полей";
  if (err === "Ошибка: 401" || err.message === "Ошибка: 401")
    return "Неправильные почта или пароль";
  if (err === "Ошибка: 403" || err.message === "Ошибка: 403")
    return "Недостаточно прав";
  if (err === "Ошибка: 404" || err.message === "Ошибка: 404")
    return "Данные не найдены";
  if (err === "Ошибка: 409" || err.message === "Ошибка: 409")
    return "Пользователь с таким email уже существует";
  if (err === "Ошибка: 429" || err.message === "Ошибка: 429")
    return "Слишком много запросов. Попробуйте позже";
  return "Ошибка сервера";
};
