import {Popup} from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup)
  }

  open(name, link) {
    super.open()

    const image = this._popup.querySelector('.popup__preview')
    const title = this._popup.querySelector('.popup__image-title')

    image.src = link
    image.alt = name
    title.textContent = name
  }
}