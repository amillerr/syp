import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmitHandler) {
    super(popup);
    this._formSubmitHandler = formSubmitHandler;
    // this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    this._formValues = {};

    this._inputList.forEach((item) => {
      this._formValues[item.name] = item.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this.loadingHandler('Сохранение...');
      this._formSubmitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }

  open () {
    super.open();
    this.loadingHandler('Сохранить')
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
