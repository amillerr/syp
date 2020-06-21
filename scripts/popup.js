const popup = document.querySelector('.popup');
const openBtn = document.querySelector('.profile__edit-btn');
const closeBtn = popup.querySelector('.popup__close');
const form = popup.querySelector('.popup__form');

let newName = document.querySelector('.popup__input_type_name');
let newDescription = document.querySelector('.popup__input_type_description');
let nameProfile = document.querySelector('.profile__name');
let descriptionProfile = document.querySelector('.profile__description');


const popupToggle = function () {
	if (popup.classList.contains('popup_opened')) {
		  newName.value = nameProfile.textContent;
		 	newDescription.value = descriptionProfile.textContent;
 		}
 	popup.classList.toggle('popup_opened');
};


function formSubmitHandler(evt) {
  evt.preventDefault();
  
  nameProfile.textContent = newName.value;
 	descriptionProfile.textContent = newDescription.value;
 	popup.classList.remove('popup_opened');
}

openBtn.addEventListener('click', popupToggle)
closeBtn.addEventListener('click', popupToggle)
form.addEventListener('submit', formSubmitHandler)