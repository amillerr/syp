export default class Api {
  constructor({userId, baseUrl, headers }) {
    this.userId = userId
    this._url = baseUrl;
    this._headers = headers;
  }

  _getStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getStatus);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getStatus);
  }

  setUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.user,
        about: data.description,
      }),
    }).then(this._getStatus);
  }

  createCard(item) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      }),
    }).then(this._getStatus);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getStatus);
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getStatus);
  }

  dislikeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getStatus);
  }

  changeAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    }).then(this._getStatus);
  }
}