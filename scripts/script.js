// // Переменные Profile
// const nameProfile = document.querySelector('.profile__name')
// const descriptionProfile = document.querySelector('.profile__description')
// const openBtn = document.querySelector('.profile__edit-btn')
// const addBtn = document.querySelector('.profile__add-btn')
//
// // Переменные Popup
// const popup = document.querySelector('.popup')
// const form = popup.querySelector('.popup__form')
// const closeBtn = popup.querySelector('.popup__close')
// const newName = document.querySelector('.popup__input_type_name')
// const newDescription = document.querySelector('.popup__input_type_description')
//
// // Переменные elements
// const placeList = document.querySelector('.elements__list')
//
// // Выводим карточки
//
// function showPlace(elem) {
// 	const placeTemplate = document.querySelector('#elements-template').content
// 	const placeElement = placeTemplate.cloneNode(true)
//
// 	placeElement.querySelector('.element__img').src = elem.link
// 	placeElement.querySelector('.element__name').textContent = elem.name
//
// 	placeList.prepend(placeElement)
// }

const popupToggle = function () {
	if (!popup.classList.contains('popup_opened')) {
		  newName.value = nameProfile.textContent
		  newDescription.value = descriptionProfile.textContent
 		}
 	popup.classList.toggle('popup_opened')
};

function formSubmitHandler(e) {
  e.preventDefault()
  
 	 nameProfile.textContent = newName.value
 	descriptionProfile.textContent = newDescription.value
 	popup.classList.remove('popup_opened')
}

// Обработка событий
openBtn.addEventListener('click', popupToggle)
closeBtn.addEventListener('click', popupToggle)
form.addEventListener('submit', formSubmitHandler)

// Перебираем массив
initialElements.forEach(elem => {
	showPlace(elem)
});