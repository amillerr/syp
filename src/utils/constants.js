//Объявление переменных

// Попапы
export const popupEdit = document.querySelector(".popup_profile");
export const popupAdd = document.querySelector(".popup_element");
export const popupImage = document.querySelector(".popup_image");
export const popupAvatar = document.querySelector('.popup_avatar')
export const popupConfirm = document.querySelector('.popup_delete')

// Кнопки попапов
export const editBtn = document.querySelector(".profile__edit-btn");
export const addBtn = document.querySelector(".profile__add-btn");
export const avatarBtn = document.querySelector('.profile__avatar_change')

// Поля пользователя
export const newName = popupEdit.querySelector(".popup__input_type_name");
export const newDescription = popupEdit.querySelector(".popup__input_type_description");

// Текущие значения полей
export const nameProfile = document.querySelector(".profile__name");
export const descriptionProfile = document.querySelector(".profile__description");
export const avatarProfile = document.querySelector('.profile__avatar')

// Валидация полей
export const formEdit = popupEdit.querySelector(".popup__form_edit");
export const formAdd = popupAdd.querySelector(".popup__form_add");
export const formAvatar = popupAvatar.querySelector('.popup__form_avatar')

export const userConfig = {
  name: nameProfile,
  about: descriptionProfile,
  avatar: avatarProfile
}

export const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    userId: 'd6bec9d79b47efeaa62430dd',
    headers: {
      authorization: 'c7ea0259-f390-4c4a-ac25-c955c79b8ace',
      'Content-Type': 'application/json'
    }
}