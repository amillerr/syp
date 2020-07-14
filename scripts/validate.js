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

  inputSelector.classList.add('popup__input_type_error')
  formInputTextError.classList.add('popup__error_visible')
  formInputTextError.textContent = errorMessage
}

function hideInputError(formSelector, inputSelector) {
  const formInputTextError = formSelector.querySelector(`#${inputSelector.id}-error`)

  inputSelector.classList.remove('popup__input_type_error')
  formInputTextError.classList.remove('popup__error_visible')
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
    submitButtonSelector.classList.add('popup__button_disabled')
    submitButtonSelector.setAttribute('disabled', true)
  } else {
    submitButtonSelector.classList.remove('popup__button_disabled')
    submitButtonSelector.removeAttribute('disabled')
  }
}

function checkInputValidity(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'))
  return inputList.some((input) => {
    return input.value == ''
  })
}

function actualButtonState(form) {
  if (checkInputValidity(form)) {
    form.querySelector('.popup__button').setAttribute('disabled', true)
    form.querySelector('.popup__button').classList.add('popup__button_disabled')
  } else {
    form.querySelector('.popup__button').removeAttribute('disabled')
    form.querySelector('.popup__button').classList.remove('popup__button_disabled')
  }
}

function setEventListener(formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'))
  const submitButton = formSelector.querySelector('.popup__button')
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector)
      buttonStateToggle(inputList, submitButton)
    })
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    setEventListener(formSelector)
  })
}