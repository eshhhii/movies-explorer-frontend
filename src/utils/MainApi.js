class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка! ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  getUserMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  editUserInfo({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  addMovieCard(data) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country: data.country || " ",
        director: data.director || " ",
        duration: data.duration || " ",
        year: data.year || " ",
        description: data.description || " ",
        image: `https://api.nomoreparties.co${data.image.url}` || " ",
        thumbnail:
          `https://api.nomoreparties.co${data.image.formats.thumbnail.url}` ||
          " ",
        trailer: data.trailerLink || " ",
        movieId: data.id || " ",
        nameRU: data.nameRU || " ",
        nameEN: data.nameEN || " ",
      }),
    }).then(this._checkResponse);
  }

  deleteMovieCard(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }
}

const mainApi = new Api({
  url: "https://api.eshhhii-diploma.nomoredomains.rocks",
  headers: {
    "content-type": "application/json",
  },
});

export default mainApi;
