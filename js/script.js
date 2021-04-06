const popupEl = document.querySelector('.popup')
const mainButton = document.querySelector('.start-page__btn');
const closeBtn = document.querySelector('.popup__close');

const popup = new Popup(popupEl, mainButton, closeBtn);

popup.setListeners();