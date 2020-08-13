import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor (popup) {
    super(popup)
  }

  open() {
    super.open()
    this._popup.querySelector('.popup__preview').src = data.link
    this._popup.querySelector('.popup__preview').src = data.name
    this._popup.querySelector('.popup__image-title').textContent = data.name
  }
}