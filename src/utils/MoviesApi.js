export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

export const getMovies = () => {
    return fetch(MOVIES_URL, {
        method: 'GET',
    })
        .then(checkResponse);
};
