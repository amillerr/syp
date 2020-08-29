export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  //Отображение ошибок
  _showInputError(inputElement, errorMessage) {
    const inputError = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._errorClass);
  }

  //Скрытие ошибок
  _hideInputError(inputElement) {
    const inputError = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = "";
  }

  //Проверка input
  _isValid(inputElement) {
    if (!inputElement.checkValidity()) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Если один input невалиден
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.checkValidity());
  }

  // Состояние кнопки submit
  _buttonStateToggle(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  //Обработка событий
  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._buttonStateToggle(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._buttonStateToggle(inputList, buttonElement);
      });
    });
  }

  //Очистка input от ошибок
  resetForm() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(this._inputErrorClass)) {
        this._hideInputError(inputElement);
      }
    });
    this._buttonStateToggle(inputList, buttonElement);
  }

  //Вкл валидацию
  enableValidation() {
    this._setEventListeners();
  }
}
