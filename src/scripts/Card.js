export default class Card {
  constructor(
    data,
    template,
    myId,
    {
      handleCardClick,
      handleConfirmClick,
      handleAddLike,
      handleDislike
    }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._template = template;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleConfirmClick = handleConfirmClick;
    this._handleAddLike = handleAddLike;
    this._handleDislike = handleDislike;
  }


  //Получаем шаблон из разметки
  _getTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  // Устанавливаем слушателей
  _setEventListeners() {
    this._cardImage = this._card.querySelector(".element__img");
    this._likeCard = this._card.querySelector(".element__btn_like");
    this._removeCard = this._card.querySelector(".element__btn_delete");

    this._removeCard.addEventListener("click", () =>
      this._handleConfirmClick(this._card)
    );
    this._likeCard.addEventListener("click", () => this._isLiked());
    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }

  _isLiked() {
    const userLike = this._card.querySelector(".element__btn_like");
    if (userLike.classList.contains("element__btn_like_active")) {
      this._handleDislike();
    } else {
      this._handleAddLike();
    }
  }

  likeElement() {
    this._card
      .querySelector(".element__btn_like")
      .classList.toggle("element__btn_like_active");
  }

  likeCounter(likes) {
    const countValue = this._card.querySelector(".element__like_counter");
    countValue.textContent = likes.length;
  }

  removeElement() {
    this._card.remove();
    this._card = null;
  }
  generateCard() {
    this._card = this._getTemplate();

    const imgName = this._card.querySelector(".element__name");
    const imgLink = this._card.querySelector(".element__img");
    const countLike = this._card.querySelector(".element__like_counter");

    imgName.textContent = this._name;
    imgLink.src = this._link;
    imgLink.alt = this._name;
    countLike.textContent = `${this._likes.length}`;

    if (this._likes.find((like) => like._id === this._myId)) {
      this._card
        .querySelector(".element__btn_like")
        .classList.add("element__btn_like_active");
    }

    if (this._owner._id === this._myId) {
      this._card
        .querySelector('.element__btn_delete')
        .classList.add("element__btn_delete_active");
    }

    this._setEventListeners();
    return this._card;
  }
}