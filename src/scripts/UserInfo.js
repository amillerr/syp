export default class UserInfo {
  constructor ({ name, description }) {
    this._name = name
    this._description = description
  }

  getUserInfo() {
    return {
      user_name: this._name.textContent,
      user_description: this._description.textContent
    }
  }

  setUserInfo(user_name, user_description) {
    this._name.textContent = user_name.value
    this._description.textContent = user_description.value
  }
}