
import React, { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '' })
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getUserInfo()
    .then((userInfo) => {
      setCurrentUser(userInfo);
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });

    // api.getCardsItem() при монтировании компонента
    api.getCardsItem()
      .then((cardsData) => {
        setCards(cardsData)
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [])

  //создали функцию лайка/дизлайка
  function handleCardLike(card) {
    // проверка лайка на карточке методом перебора массива и поиском хотя бы одного удоволетворяющего условия(i._id === currentUser._id) 
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    //делаем запрос к апи
    api.changeLikeCardStatus(card._id, isLiked)
    //обновленное состояние карточки после изменения лайка
    .then((newCard) => {
      // обновили состояние массива cards
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
}

  function handleCardDelete(cardToDelete) {
    //делаем запрос к апи для удаления карточки, передали в параметр card id
    api.deleteCard(cardToDelete._id)
    .then(() => {
      // обновили состояние массива cards исключив удаленную карточку
      setCards((state) => state.filter(card => card._id !== cardToDelete._id))
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
  }

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
    setSelectedCard({ name: '', link: '' })
  }

  function handleUpdateUser({ name, about }) {
    api.sendUserInfo({ name, about })
    .then((onUpdateUser) => {
      setCurrentUser(onUpdateUser)
      closeAllPopups()
    })
    .catch(error => {
      console.error('Ошибка при отправке:', error);
    });
  }

  function handleUpdateAvatar(avatar) {
    api.sendAvatar(avatar)
    .then((onUpdateAvatar) => {
      setCurrentUser(onUpdateAvatar)
      closeAllPopups()
    })
    .catch(error => {
      console.error('Ошибка при отправке:', error);
    });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.sendCard({ name, link })
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch(error => {
      console.error('Ошибка при отправке:', error);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
          
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

          <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да">
          </PopupWithForm>
          <ImagePopup
            isOpen={selectedCard.link !== ''}
            onClose={closeAllPopups}
            selectedCard={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;