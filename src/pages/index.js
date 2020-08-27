import "./index.css";
import {
  popupEdit,
  popupAdd,
  popupImage,
  editBtn,
  addBtn,
  placeList,
  elementTemplate,
  formEdit,
  formAdd,
  newName,
  newDescription,
  userConfig,
  popupAvatar,
  avatarBtn, formAvatar,
} from "../utils/constants";
import Card from "../scripts/Card";
import FormValidator, { config } from "../scripts/FormValidator.js";
import Section from "../scripts/Section";
import PopupWithForm from "../scripts/PopupWithForm";
import PopupWithImage from "../scripts/PopupWithImage";
import UserInfo from "../scripts/UserInfo";
import PopupConfirm from "../scripts/PopupConfirm";
import Api from "../scripts/Api.js";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "c7ea0259-f390-4c4a-ac25-c955c79b8ace",
    "Content-Type": "application/json"
  }
})


Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([data, res]) => {
    user.setUserInfo(data);
    serverCards.renderer(res);
  })
  .catch(err => console.log(err))

// Валидация форм
const editFormValidation = new FormValidator(config, formEdit);
editFormValidation.enableValidation();
const addFormValidation = new FormValidator(config, formAdd);
addFormValidation.enableValidation();
const avatarFormValidation = new FormValidator(config, formAvatar);
avatarFormValidation.enableValidation()

const popupConfirm = new PopupConfirm('.popup_delete')

const serverCards = new Section({
  renderer: (item => renderCards(item))
}, placeList)

function renderCards(item) {
  const card = new Card(item, elementTemplate, id, {
    handleCardClick: () => {
      popupWithImage.open(data)
    },
    handleConfirmClick: () => {
      popupWithConfirm.open()
      popupWithConfirm.setConfirmHandler(() => {
        api.deleteCard(card._id)
          .then(() => {
            card.removeElement()
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    handleAddLike: () => {
      api.likeCard(item._id)
        .then((item) => {
          card.likeCounter(item)
          card.likeElement()
        })
        .catch((err) => {
          console.log(err)
        })
     },
    handleDislike: () => {
      api.dislikeCard(item._id)
        .then((item) => {
          card.likeCounter(item)
          card.likeElement()
        })
        .catch((err) => {
          console.log(err)
        })
      }
  })
  serverCards.addItem(card.generateCard())
}
const user = new UserInfo(userConfig)

const popupChangeAvatar = new PopupWithForm(popupAvatar, {
  formSubmitHandler: (item) => {
    api.changeAvatar(item)
      .then((data) => {
        user.setUserAvatar(data)
        popupChangeAvatar.close()
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

const popupWithConfirm = new PopupConfirm(popupConfirm)

const popupWithImage = new PopupWithImage(popupImage);

const popupEditProfile = new PopupWithForm(popupEdit, {
  formSubmitHandler: (item) => {
    api.setUserData(item)
      .then((res) => {
        user.setUserInfo(res)
        popupEditProfile.close()
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

const popupAddCard = new PopupWithForm(popupAdd, {
  formSubmitHandler: (item) => {
    api.createCard(item)
      .then((item) => {
        renderCards(item)
        popupAddCard.close()
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
popupChangeAvatar.setEventListeners()
popupWithConfirm.setEventListeners()
popupEditProfile.setEventListeners()
popupAddCard.setEventListeners()
popupWithImage.setEventListeners()

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

avatarBtn.addEventListener('click', () => {
  popupChangeAvatar.open()
  avatarFormValidation.resetForm()
})
