export default class Api {
  constructor(config) {
      this.url = config.url;
      this.headers = config.headers;
  }

  getUserInfo(token) {
      return fetch(`${this.url}/users/me`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      })
          .then((res) => this._checkResponse(res));
  }

  updateProfile({ name, email }) {
      const token = localStorage.getItem('token');
      return fetch(`${this.url}/users/me`, {
          method: 'PATCH',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email }),
      })
          .then((res) => this._checkResponse(res));
  }

  addNewCard(movie) {
      const token = localStorage.getItem('token');
      return fetch(`${this.url}/movies`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
              country: movie.country,
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: `https://api.nomoreparties.co${movie.image.url}`,
              thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
              trailer: movie.trailerLink,
              movieId: movie.id,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
          }),
      })
          .then((res) => this._checkResponse(res));
  }

  deleteMovie(movieId) {
      const token = localStorage.getItem('token');
      return fetch(`${this.url}/movies/${movieId}`, {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      })
          .then((res) => {
              return this._checkResponse(res);
          });
  }

  getSavedMovies(token) {
      return fetch(`${this.url}/movies`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      })
          .then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(new Error(`Ошибка! ${res.status}`));
  }
}

export const mainApi = new Api({
  url: 'https://api.eshhhii-diploma.nomoredomains.rocks',
  headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
  },
});