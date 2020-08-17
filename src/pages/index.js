import "./index.css";

import Card from "../scripts/Card";
import FormValidator, { config } from "../scripts/FormValidator.js";
import { initialElements } from "../utils/assets";
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
  newDescription,
} from "../utils/constants";
import PopupWithForm from "../scripts/PopupWithForm";
import PopupWithImage from "../scripts/PopupWithImage";
import UserInfo from "../scripts/UserInfo";

// Валидация форм
const editFormValidation = new FormValidator(config, formEdit);
editFormValidation.enableValidation();
const addFormValidation = new FormValidator(config, formAdd);
addFormValidation.enableValidation();

function createCard(item) {
  const card = new Card(item, elementTemplate, handleCardClick);
  return card.generateCard();
}

const addCard = new Section(
  {
    items: initialElements,
    renderer: (item) => {
      addCard.addItem(createCard(item));
    },
  },
  placeList
);
addCard.renderer();

const user = new UserInfo({
  user: nameProfile,
  description: descriptionProfile,
});

const popupWithImage = new PopupWithImage(popupImage);
function handleCardClick(data) {
  popupWithImage.open(data);
}

const popupEditProfile = new PopupWithForm(popupEdit, () => {
  user.setUserInfo(newName, newDescription);
  popupEditProfile.close();
});

const popupAddCard = new PopupWithForm(popupAdd, (data) => {
  addCard.addItem(createCard(data));
  popupAddCard.close();
});

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupWithImage.setEventListeners();

editBtn.addEventListener("click", () => {
  popupEditProfile.open();
  const infoUser = user.getUserInfo();
  newName.value = infoUser.user;
  newDescription.value = infoUser.description;
  editFormValidation.resetForm();
});

addBtn.addEventListener("click", () => {
  popupAddCard.open();
  addFormValidation.resetForm();
});
