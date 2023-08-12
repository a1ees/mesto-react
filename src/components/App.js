
import React, { useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopuOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(false)
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopuOpen} onClose={closeAllPopups}>
          <label className="popup__item popup__item_name">
            <input
              id="name-input"
              className="popup__input popup__input_name"
              type="text"
              name="name"
              minLength={2}
              maxLength={40}
              required=""
            />
            <span className="name-input-error popup__input-error" />
          </label>
          <label className="popup__item popup__item_profession">
            <input
              id="profession-input"
              className="popup__input popup__input_profession"
              type="text"
              name="about"
              minLength={2}
              maxLength={200}
              required=""
            />
            <span className="profession-input-error popup__input-error" />
          </label>
          <button type="submit" className="popup__button">
            Сохранить
          </button>
        </PopupWithForm>
        
        <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <label className="popup__item popup__item_place">
            <input
              id="place-input"
              className="popup__input popup__input_place"
              type="text"
              placeholder="Название"
              name="place"
              minLength={2}
              maxLength={30}
              required=""
            />
            <span className="place-input-error popup__input-error">
              Заполните это поле
            </span>
          </label>
          <label className="popup__item popup__item_place-pic">
            <input
              id="place-pic-input"
              className="popup__input popup__input_place-pic"
              type="url"
              placeholder="Ссылка на картинку"
              name="placepic"
              required=""
            />
            <span className="place-pic-input-error popup__input-error">
              Заполните это поле
            </span>
          </label>
          <button
            type="submit"
            className="popup__button popup__button_add-card popup__button_disabled"
            disabled=""
          >
            Сохранить
          </button>
        </PopupWithForm>

        <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <label className="popup__item popup__item_avatar">
            <input
              id="avatar-input"
              className="popup__input popup__input_avatar"
              type="URL"
              name="avatar"
              required=""
            />
            <span className="avatar-input-error popup__input-error" />
          </label>
          <button
            type="submit"
            className="popup__button popup__button_edit-avatar"
          >
            Да
          </button>
        </PopupWithForm>

        <PopupWithForm name="delete-card" title="Вы уверены?">
          <button
            type="submit"
            className="popup__button popup__button_delete-card"
          >
            Да
          </button>
        </PopupWithForm>
        <ImagePopup
          isOpen={selectedCard !== false}  // Change this condition
          onClose={closeAllPopups}
          selectedCard={selectedCard}
        />
      </div>
    </div>
  );
}

export default App;

