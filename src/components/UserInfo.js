export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._user = name;
    this._description = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._user.textContent,
      about: this._description.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {
    this._user.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}