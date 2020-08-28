export default class Card {
  constructor(data, template, myId,{ handleCardClick, handleConfirmClick, handleAddLike, handleDislike }) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._likes = data.likes;
    this._myId = myId;
    this._owner = data.owner;
    this._handleCardClick = handleCardClick;
    this._handleConfirmClick = handleConfirmClick;
    this._handleAddLike = handleAddLike;
    this._handleDislike = handleDislike;
  }

  //Получаем шаблон из разметки
  _getTemplate() {
    this._cardElement = this._template.cloneNode(true);
    return this._cardElement;
  }

  // Устанавливаем слушателей
  _setEventListeners() {
    this._cardImage = this._cardElement.querySelector(".element__img");
    this._likeCard = this._cardElement.querySelector(".element__btn_like");
    this._removeCard = this._cardElement.querySelector(".element__btn_delete");

    this._removeCard.addEventListener("click", () => this._handleConfirmClick(this._cardElement));
    this._likeCard.addEventListener("click", () => this._isLiked());
    this._cardImage.addEventListener("click", () => this._handleCardClick);
  }

  _isLiked() {
    this._cardElement.classList.contains("element__btn_like_active")
      ? this._handleDislike()
      : this._handleAddLike();
  }

  likeElement() {
    this._cardElement.querySelector('.element__btn_like').classList.toggle("element__btn_like_active");
  }

  likeCounter(likes) {
    const countValue = this._cardElement.querySelector(".element__like_counter")
      countValue.textContent = likes.length;
  }

  removeElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    const imgName = this._cardElement.querySelector(".element__name");
    const imgLink = this._cardElement.querySelector(".element__img");
    const countLike = this._cardElement.querySelector(".element__like_counter");
    const removeCard = this._cardElement.querySelector(".element__btn_delete");

    imgName.textContent = this._name;
    imgLink.src = this._link;
    imgLink.alt = this._name;
    countLike.textContent = `${this._likes.length}`;

    if (this._likes.find((like) => like._id === this._myId)) {
      this._cardElement.querySelector('.element__btn_like').classList.add("element__btn_like_active");
    }

    if (this._owner._id !== this._myId) {
      removeCard.style.display = "none";
    }

    return this._cardElement;
  }
}
