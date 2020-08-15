import './index.css'

import Card from "../scripts/Card";
import FormValidator, { config } from '../scripts/FormValidator.js'
import { initialElements} from "../utils/assets";
import Section from "../scripts/Section";

import {
  popupEdit,
  popupAdd,
  popupImage,
  editBtn,
  addBtn,
  nameProfile,
  descriptionProfile,
  placeList,
  elementTemplate,
  formEdit,
  formAdd,
  newName,
  newDescription
} from '../utils/constants'
import PopupWithForm from "../scripts/PopupWithForm";
import PopupWithImage from "../scripts/PopupWithImage";
import UserInfo from "../scripts/UserInfo";

// Валидация форм
const editFormValidation = new FormValidator(config, formEdit)
editFormValidation.enableValidation()
const addFormValidation = new FormValidator(config, formAdd)
addFormValidation.enableValidation()

function addCard(data) {
  return new Card(data, elementTemplate, popupImage).generateCard()
}

const section = new Section({
  items: initialElements,
  renderer: (item) => {
    section.addItem(addCard(item))
  }
}, placeList)
section.renderItems()

const user = new UserInfo({name: newName, description: newDescription})

const popupWithImage = new PopupWithImage(popupImage)
popupWithImage.setEventListeners()

const popupEditProfile = new PopupWithForm(popupEdit, () => {
  new user.setUserInfo(user.getUserInfo())
})
popupEditProfile.setEventListeners()

const popupAddCard = new PopupWithForm(popupAdd, (data) => {
  section.addItem(addCard(data))
})
popupAddCard.setEventListeners()

editBtn.addEventListener('click', () => {
  newName.value = nameProfile.textContent
  newDescription.value = descriptionProfile.textContent
  editFormValidation.resetForm()
  popupEditProfile.open()
})

addBtn.addEventListener('click', () => {
  popupAddCard.open()
  addFormValidation.resetForm()
})