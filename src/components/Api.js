export default class Api {
  constructor({ baseUrl, userId, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this.userId = userId;
  }

  getStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error! : ${res.status}`);
    }
  }
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.getStatus);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.getStatus);
  }

  setUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this.getStatus);
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    }).then(this.getStatus);
  }

  createCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.title,
        link: item.url,
      }),
    }).then(this.getStatus);
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.getStatus);
  }

  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.getStatus);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.getStatus);
  }
}
