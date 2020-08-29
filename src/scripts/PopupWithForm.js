import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, {submitForm}) {
    super(popup);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._formValue = {};
    this._inputList.forEach(item => {
      this._formValue[item.name] = item.value;
    });
    return this._formValue
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.loadingHandler('Сохранение...');
      this._submitForm(this._getInputValues())
    });
    super.setEventListeners();
  }

  open() {
    super.open();
    this.loadingHandler('Сохранить');
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
