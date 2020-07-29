import { initialElements } from './assets.js'
import { FormValidator, config } from './FormValidator.js'
import { Card } from './Card.js'

// Переменные Profile
const profile = document.querySelector('.profile')
const nameProfile = profile.querySelector('.profile__name')
const descriptionProfile = profile.querySelector('.profile__description')
const openBtn = profile.querySelector('.profile__edit-btn')
const addBtn = profile.querySelector('.profile__add-btn')

// Переменные Popup Edit
const popupProfile = document.querySelector('.popup_profile')
const formEdit = popupProfile.querySelector('.popup__form_edit')
const closeEdit = popupProfile.querySelector('.popup__close_edit')
const newName = popupProfile.querySelector('.popup__input_type_name')
const newDescription = popupProfile.querySelector('.popup__input_type_description')

// Переменные Elements
export const placeList = document.querySelector('.elements__list')

// Переменные Template
export const elementTemplate = document.querySelector('#elements-template')

// Переменные Popup Element Add
const popupElement = document.querySelector('.popup_element')
const closeAdd = popupElement.querySelector('.popup__close_element')
const formAdd = popupElement.querySelector('.popup__form_add')
const newElementName = popupElement.querySelector('.popup__input_type_place')
const newElementLink = popupElement.querySelector('.popup__input_type_link')

// Переменные Popup Preview
const popupImage = document.querySelector('.popup_image')
const closePreview = popupImage.querySelector('.popup__close_image')
export const elementPreview = popupImage.querySelector('.popup__preview')
export const elementTitle =  popupImage.querySelector('.popup__image-title')

const editFormValidation = new FormValidator(config, formEdit)
const enableValidationEdit = editFormValidation.enableValidation()
const addFormValidation = new FormValidator(config, formAdd)
const enableValidationAdd = addFormValidation.enableValidation()

// Добавление нового элемента
function addCard(e) {
  e.preventDefault()
  const card = new Card(newElementLink.value, newElementName.value)
  const cardElement = card.generateCard()
  placeList.prepend(cardElement)
  closePopup(popupElement)
}

// Отобразить массив элементов
function renderCard() {
  initialElements.reverse().forEach((item) => {
    const card = new Card(item.name, item.link)
    const cardElement = card.generateCard()
    placeList.prepend(cardElement)
  })
}

// Открытие попапа
export function openPopup (event) {
  event.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc)
}

// Закрытие попапа
function closePopup (event) {
  event.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
}

// Закрытие по Esc
function handleEsc (event) {
  if (event.key === "Escape") { 
    closePopup(document.querySelector('.popup_opened'))
  }
}

// Закрытие по Overlay
function handleOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(popupProfile)
    closePopup(popupElement)
    closePopup(popupImage)
  }
}

// Popup Edit с заполнением
function openPopupEdit() {
  newName.value = nameProfile.textContent
  newDescription.value = descriptionProfile.textContent
  openPopup(popupProfile)
  editFormValidation.resetForm()
}

// Popup Add пустой
function openPopupAdd() {
  newElementName.value = '';
  newElementLink.value = '';
  openPopup(popupElement)
  addFormValidation.resetForm()
}

// Popup Preview
export function popupPreview(e) {
  const elem = e.target
  const elemTitle = e.target.closest('.element')
  elementPreview.src = elem.src
  elementPreview.alt = elem.alt
  elementTitle.textContent = elemTitle.textContent
  openPopup(popupImage)
}

// Изменение Данных профиля
function formSubmitHandler(e) {
  e.preventDefault()
  nameProfile.textContent = newName.value
  descriptionProfile.textContent = newDescription.value
  closePopup(popupProfile)
}

// Обработка событий
openBtn.addEventListener('click', openPopupEdit)
addBtn.addEventListener('click', openPopupAdd)
closeEdit.addEventListener('click', () => closePopup(popupProfile))
closeAdd.addEventListener('click', () => closePopup(popupElement))
closePreview.addEventListener('click', () => closePopup(popupImage))
formAdd.addEventListener('submit', addCard)
formEdit.addEventListener('submit', formSubmitHandler)

renderCard()
popupProfile.addEventListener('click', handleOverlay)
popupElement.addEventListener('click', handleOverlay)
popupImage.addEventListener('click', handleOverlay)