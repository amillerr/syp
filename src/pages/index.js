import "./index.css";
import FormValidator, { config } from "../components/FormValidator";
import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import PopupConfirm from "../components/PopupConfirm";
import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import {
  addBtn,
  apiConfig,
  avatarBtn,
  editBtn,
  formAdd,
  formAvatar,
  formEdit,
  newDescription,
  newName,
  popupAdd,
  popupAvatar,
  popupConfirm,
  popupEdit,
  popupImage,
  userConfig,
} from "../utils/constants";

const api = new Api(apiConfig);
const myId = api.userId;
const user = new UserInfo(userConfig);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, res]) => {
    user.setUserInfo(userData);
    serverCards.renderCards(res);
  })
  .catch((err) => console.log(err));

// Валидация форм
const editFormValidation = new FormValidator(config, formEdit);
editFormValidation.enableValidation();
const addFormValidation = new FormValidator(config, formAdd);
addFormValidation.enableValidation();
const avatarFormValidation = new FormValidator(config, formAvatar);
avatarFormValidation.enableValidation();

const popupWithConfirm = new PopupConfirm(popupConfirm);

const serverCards = new Section(
  {
    renderer: (item) => renderCards(item),
  },
  ".elements__list"
);

function renderCards(item) {
  const card = new Card(item, "#elements-template", myId, {
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
    },
    handleConfirmClick: () => {
      popupWithConfirm.open();
      popupWithConfirm.setConfirmHandler(() => {
        api
          .deleteCard(card._id)
          .then(() => {
            card.removeElement();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleAddLike: () => {
      api
        .likeCard(item._id)
        .then((item) => {
          card.likeCounter(item.likes);
          card.likeElement();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDislike: () => {
      api
        .dislikeCard(item._id)
        .then((item) => {
          card.likeCounter(item.likes);
          card.likeElement();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  serverCards.addItem(card.generateCard());
}

const popupChangeAvatar = new PopupWithForm(popupAvatar, {
  submitForm: (item) => {
    api
      .changeAvatar(item)
      .then((data) => {
        user.setUserAvatar(data);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupWithImage = new PopupWithImage(popupImage);

const popupEditProfile = new PopupWithForm(popupEdit, {
  submitForm: (item) => {
    api
      .setUserData(item)
      .then((res) => {
        user.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupAddCard = new PopupWithForm(popupAdd, {
  submitForm: (item) => {
    api
      .createCard(item)
      .then((item) => {
        renderCards(item);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

popupChangeAvatar.setEventListeners();
popupWithConfirm.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupWithImage.setEventListeners();

editBtn.addEventListener("click", () => {
  const infoUser = user.getUserInfo();
  newName.value = infoUser.name;
  newDescription.value = infoUser.about;
  editFormValidation.resetForm();
  popupEditProfile.open();
});

addBtn.addEventListener("click", () => {
  addFormValidation.resetForm();
  popupAddCard.open();
});

avatarBtn.addEventListener("click", () => {
  avatarFormValidation.resetForm();
  popupChangeAvatar.open();
});
