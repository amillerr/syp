export default class Api {
  constructor ({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  _getStatus(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }

  getInititalCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(res => this._getStatus(res))
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(res => this._getStatus(res))
  }

  setUserInfo(user, description) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: user,
        about: description
      })
    })
      .then(res => this._getStatus(res))
  }

  createCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._getStatus(res))
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._getStatus(res))
  }

  likeCard(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => this._getStatus(res))
  }

  dislikeCard(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._getStatus(res))
  }

  changeAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._getStatus(res))
  }
}