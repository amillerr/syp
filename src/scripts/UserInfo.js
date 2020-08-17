export default class UserInfo {
  constructor({ user, description }) {
    this._user = user;
    this._description = description;
  }

  getUserInfo() {
    return {
      user: this._user.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(user, description) {
    this._user.textContent = user.value;
    this._description.textContent = description.value;
  }
}