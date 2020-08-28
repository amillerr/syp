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

  setUserInfo(name, description, avatar) {
    this._user.textContent = name;
    this._description.textContent = description;
    this._avatar.src = avatar;
  }
  // setUserInfo(data) {
  //   this._user.textContent = data.user;
  //   this._description.textContent = data.description;
  //   this._avatar.src = data.avatar;
  // }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}