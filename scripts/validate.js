const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError(formSelector, inputSelector, errorMessage) {
  const formInputTextError = formSelector.querySelector(`#${inputSelector.id}-error`)

  inputSelector.classList.add(config.inputErrorClass)
  formInputTextError.classList.add(config.errorClass)
  formInputTextError.textContent = errorMessage
}

function hideInputError(formSelector, inputSelector) {
  const formInputTextError = formSelector.querySelector(`#${inputSelector.id}-error`)

  inputSelector.classList.remove(config.inputErrorClass)
  formInputTextError.classList.remove(config.errorClass)
  formInputTextError.textContent = ''
}

function isValid(formSelector, inputSelector) {
  if (!inputSelector.checkValidity()) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage)
  } else {
    hideInputError(formSelector, inputSelector)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.checkValidity()
  })
}

function buttonStateToggle(inputList, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(config.inactiveButtonClass)
    submitButtonSelector.setAttribute('disabled', true)
  } else {
    submitButtonSelector.classList.remove(config.inactiveButtonClass)
    submitButtonSelector.removeAttribute('disabled')
  }
}

function checkInputValidity(form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector))
  return inputList.some((input) => {
    return input.value == ''
  })
}

function setEventListener(formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector))
  const submitButton = formSelector.querySelector(config.submitButtonSelector)
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector)
      buttonStateToggle(inputList, submitButton)
    })
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    setEventListener(formSelector)
  })
}