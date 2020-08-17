export default class Card {
  constructor(data, template, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  //Получаем шаблон из разметки
  _getTemplate() {
    this._cardElement = this._template.cloneNode(true);
    return this._cardElement;
  }

  // Устанавливаем слушателей
  _setEventListeners() {
    this._cardElement
      .querySelector(".element__btn_delete")
      .addEventListener("click", (e) => this._removeElement(e));
    this._cardElement
      .querySelector(".element__btn_like")
      .addEventListener("click", (e) => this._likeElement(e));
    this._cardElement
      .querySelector(".element__img")
      .addEventListener("click", () => this._handleCardClick(this._data));
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    const imgName = this._cardElement.querySelector(".element__name");
    imgName.textContent = this._name;
    const imgLink = this._cardElement.querySelector(".element__img");
    imgLink.src = this._link;
    imgLink.alt = this._name;

    return this._cardElement;
  }

  // Кнопка "Нравится"
  _likeElement(e) {
    e.target.classList.toggle("element__btn_like_active");
  }

  // Удаление Элемента
  _removeElement(e) {
    e.target.closest(".element").remove();
  }
}
