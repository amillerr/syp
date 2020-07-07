// Переменные Profile
const profile = document.querySelector('.profile')
const nameProfile = profile.querySelector('.profile__name')
const descriptionProfile = profile.querySelector('.profile__description')
const openBtn = profile.querySelector('.profile__edit-btn')
const addBtn = profile.querySelector('.profile__add-btn')

// Переменные Popup Edit
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
  const imgCard = element.querySelector('.element__img')
  element.querySelector('.element__name').textContent = elem.name
  imgCard.src = elem.link
  imgCard.alt = elem.name

  imgCard.addEventListener('click', popupPreview)
  element.querySelector('.element__btn_like').addEventListener('click', likeElement)
  element.querySelector('.element__btn_delete').addEventListener('click', removeElement)

  return element
}

// Отображение элементов массива
function renderCard(elem) {
  const element = showElem(elem)
  placeList.prepend(element)
}
initialElements.forEach(renderCard)

// Открытие попапа
function openPopup (e) {
  e.classList.add('popup_opened');
}

// Закрытие попапа
function closePopup (e) {
  e.classList.remove('popup_opened');
}

// Popup Edit с заполнением
function openPopupEdit() {
  newName.value = nameProfile.textContent
  newDescription.value = descriptionProfile.textContent
  openPopup(popupProfile)
}

// Popup Add пустой
function openPopupAdd() {
  newElementName.value = '';
  newElementLink.value = '';
  openPopup(popupElement)
}

// Добавить новый элемент
function elemSubmitHandler(e) {
  e.preventDefault()
  const addElem = {
    name: newElementName.value,
    link: newElementLink.value,
  }
  renderCard(addElem)
  closePopup(popupElement)
}

// Popup Preview
function popupPreview(e) {
  const elem = e.target
  const elemTitle = e.target.closest('.element')
  elementPreview.src = elem.src
  elementPreview.alt = elem.alt
  elementTitle.textContent = elemTitle.textContent
  openPopup(popupImage)
}

// Кнопка "Нравится"
function likeElement(e) {
  e.target.classList.toggle('element__btn_like_active')
}

// Удаление Элемента
function removeElement(e) {
  const element = e.target.closest('.element')
  element.remove()
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
formAdd.addEventListener('submit', elemSubmitHandler)
formEdit.addEventListener('submit', formSubmitHandler)