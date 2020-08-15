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

const addCard = new Section({
  items: initialElements,
  renderer: (item) => {
   const card = new Card(item, elementTemplate, handleCardClick)
    const cardElement = card.generateCard()
    addCard.addItem(cardElement)
  }
}, placeList)
addCard.renderer()

const user = new UserInfo({
  name: nameProfile,
  description: descriptionProfile
})

const popupWithImage = new PopupWithImage(popupImage)
function handleCardClick(data) {
  popupWithImage.open(data)
}

const popupEditProfile = new PopupWithForm(popupEdit, () => {
  user.setUserInfo(newName, newDescription)
  popupEditProfile.close()
})

const popupAddCard = new PopupWithForm(popupAdd, (item) => {
  const newCard = new Card(
    { name: item.place_name, link: item.place_link },
    elementTemplate, handleCardClick)
  const cardElement = newCard.generateCard()
  addCard.addItem(cardElement)
  popupAddCard.close()
})

popupEditProfile.setEventListeners()
popupAddCard.setEventListeners()
popupWithImage.setEventListeners()

editBtn.addEventListener('click', () => {
  popupEditProfile.open()
  const infoUser = user.getUserInfo()
  newName.value = infoUser.user_name
  newDescription.value = infoUser.user_description
  editFormValidation.resetForm()
})

addBtn.addEventListener('click', () => {
  popupAddCard.open()
  addFormValidation.resetForm()
})