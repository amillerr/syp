import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor (popup, formSubmitHandler) {
    super(popup)
    this._formSubmitHandler = formSubmitHandler
    this._form = this._popup.querySelector('.popup__form')
  }

  _getInputValues() {
    this._inputList = this._popup.querySelector('.popup__input')
    this._formValues = {}

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  setEventListeners () {
    super.setEventListeners();
    this._popup.addEventListener('submit', (e) => {
      e.preventDefault()
      this._formSubmitHandler(this._getInputValues())
    })
  }

  close () {
    super.close();
    this._form.reset()
  }
}