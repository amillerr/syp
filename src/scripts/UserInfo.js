export default class UserInfo {
  constructor({ user, description, avatar }) {
    this._user = user;
    this._description = description;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      user: this._user.textContent,
      description: this._description.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo(data) {
    this._user.textContent = data.user;
    this._description.textContent = data.description;
    this._avatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar
  }
}