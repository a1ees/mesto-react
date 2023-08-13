import { apiConfig } from "./constants";


class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  deleteLike(deleteId) {
    return fetch(`${this.baseUrl}/cards/${deleteId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  sendLike(likeId) {
    return fetch(`${this.baseUrl}/cards/${likeId}/likes`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({})
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  sendCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
  }

  sendUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  sendAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatar)
    })
    .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  getCardsItem() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(this._checkResponse)
  }
}

export const api = new Api(apiConfig);
