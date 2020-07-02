// Переменные Profile
const nameProfile = document.querySelector('.profile__name')
const descriptionProfile = document.querySelector('.profile__description')
const openBtn = document.querySelector('.profile__edit-btn')
const addBtn = document.querySelector('.profile__add-btn')

// Переменные Popup
const popup = document.querySelector('.popup')
const form = popup.querySelector('.popup__form')
const closeBtn = popup.querySelector('.popup__close')
const newName = document.querySelector('.popup__input_type_name')
const newDescription = document.querySelector('.popup__input_type_description')

// Переменные elements
const placeList = document.querySelector('.elements__list')

// Подгружаем карточки

const initialElements = [
	{
		name: 'Изельтвальд, Швейцария',
		link: 'https://c.radikal.ru/c35/2007/c5/e524155a627b.jpg'
	},
	{
		name: 'Нордфьорд, Норвегия',
		link: 'https://d.radikal.ru/d25/2007/81/19e2d8774bf6.jpg'
	},
	{
		name: 'Брайес, Италия',
		link: 'https://c.radikal.ru/c40/2007/2b/1124c465418d.jpg'
	},
	{
		name: 'Майя Бэй, Тайланд',
		link: 'https://c.radikal.ru/c04/2007/b3/e5dfcb88ee71.jpg'
	},
	{
		name: 'Рейкьявик, Исландия',
		link: 'https://a.radikal.ru/a29/2007/bd/b87e7fafa9c9.jpg'
	},
	{
		name: 'Перито-Морено, Аргентина',
		link: 'https://c.radikal.ru/c18/2007/6a/c1f3fcc3c624.jpg'
	}
]

// Выводим карточки 

function showPlace(elem) {
	const placeTemplate = document.querySelector('#elements-template').content
	const placeElement = placeTemplate.cloneNode(true)
	console.log(elem)
	placeElement.querySelector('.element__img').src = elem.link
	placeElement.querySelector('.element__name').textContent = elem.name

	placeList.prepend(placeElement)
}

const popupToggle = function () {
	if (!popup.classList.contains('popup_opened')) {
		  newName.value = nameProfile.textContent
		  newDescription.value = descriptionProfile.textContent
 		}
 	popup.classList.toggle('popup_opened')
};

function formSubmitHandler(evt) {
  evt.preventDefault()
  
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