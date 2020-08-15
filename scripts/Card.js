export default class Card {
  constructor({name, link}, template, handleCardClick) {
    this._name = name
    this._link = link
    this._template = template
    this._handleCardClick = handleCardClick
  }

  //Получаем шаблон из разметки
  _getTemplate() {
    const cardElement = this._template.cloneNode(true)

    return cardElement
  }

  // Устанавливаем слушателей
  _setEventListeners() {
    this._element.querySelector('.element__btn_delete').addEventListener('click', (e) => this._removeElement(e));
    this._element.querySelector('.element__btn_like').addEventListener('click', (e) => this._likeElement(e));
    this._element.querySelector('.element__img').addEventListener('click', (e) => this._handleCardClick(this._name, this._link));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imgName = this._element.querySelector('.element__name')
    imgName.textContent = this._name
    const imgLink = this._element.querySelector('.element__img')
    imgLink.src = this._link
    imgLink.alt = this._name

    return this._element;
  }

  // Кнопка "Нравится"
  _likeElement(e) {
    e.target.classList.toggle('element__btn_like_active');
  }

  // Удаление Элемента
  _removeElement(e) {
    e.target.closest('.element').remove();
  }
}