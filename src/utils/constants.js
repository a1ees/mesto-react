export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
};

export const cardsItems = '#cards__item';
export const cardsContainer = '.cards';

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '0cb664d7-98e3-4fc4-9df8-958b23efa54d',
    'Content-Type': 'application/json'
  }
}
