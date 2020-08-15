export default class Popup {
  constructor(popup) {
    this._popup = popup
  }

  // Открытие попапа
  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  // Закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие по Esc
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close()
    }
  }

  setEventListeners() {
  this._popup.querySelector('.popup__close').addEventListener('click', () => this.close())
    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        this.close()
      }
    })
  }
}