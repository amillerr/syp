// Переменные Profile
const profile = document.querySelector('.profile')
const nameProfile = profile.querySelector('.profile__name')
const descriptionProfile = profile.querySelector('.profile__description')
const openBtn = profile.querySelector('.profile__edit-btn')
const addBtn = profile.querySelector('.profile__add-btn')

// Переменные Popup Edit
const popup = document.querySelector('.popup')
const popupProfile = document.querySelector('.popup__profile')
const formEdit = popupProfile.querySelector('.popup__form_edit')
const closeEdit = popupProfile.querySelector('.popup__close_edit')
const newName = popupProfile.querySelector('.popup__input_type_name')
const newDescription = popupProfile.querySelector('.popup__input_type_description')

// Переменные Elements
const placeList = document.querySelector('.elements__list')

// Переменные Template
const elementTemplate = document.querySelector('#elements-template')

// Переменные Popup Element Add
const popupElement = document.querySelector('.popup__element')
const closeAdd = popupElement.querySelector('.popup__close_element')
const formAdd = popupElement.querySelector('.popup__form_add')
const newElementName = popupElement.querySelector('.popup__input_type_place')
const newElementLink = popupElement.querySelector('.popup__input_type_link')

// Переменные Popup Preview
const popupImage = document.querySelector('.popup__image')
const closePreview = popupImage.querySelector('.popup__close_image')
const elementPreview = popupImage.querySelector('.popup__preview')
const elementTitle =  popupImage.querySelector('.popup__image-title')

// Выводим заготовленный массив элементов

function showElem(elem) {
  const element = elementTemplate.content.cloneNode(true)

  element.querySelector('.element__name').textContent = elem.name
  element.querySelector('.element__img').src = elem.link
  element.querySelector('.element__img').alt = elem.name

  placeList.prepend(element)
}

// Перебираем массив
initialElements.forEach(elem => {
  showElem(elem)
})

// Открытие/Закрытие попапа
const popupToggle = function(popup) {
  popup.classList.toggle('popup_opened')
}

// Popup Edit с заполнением
function openPopupEdit() {
  newName.value = nameProfile.textContent
  newDescription.value = descriptionProfile.textContent
  popupToggle(popupProfile)
}

// Popup Add пустой
function openPopupAdd() {
  newElementName.value = '';
  newElementLink.value = '';
  popupToggle(popupElement)
}

// Popup Preview


// Изменение Данных профиля
function formSubmitHandler(e) {
  e.preventDefault()

  nameProfile.textContent = newName.value
  descriptionProfile.textContent = newDescription.value
  popupToggle(popupProfile)
}

// Обработка событий
openBtn.addEventListener('click', openPopupEdit)
addBtn.addEventListener('click', openPopupAdd)
closeEdit.addEventListener('click', () => {popupToggle(popupProfile)})
closeAdd.addEventListener('click', () => {popupToggle(popupElement)})
formEdit.addEventListener('submit', formSubmitHandler)
