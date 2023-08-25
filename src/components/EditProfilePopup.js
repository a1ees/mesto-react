import React, { useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [about, setAbout] = useState('')

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser])
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: about,
    });
  } 

  return(
    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
    <label className="popup__item popup__item_name">
      <input
        id="name-input"
        className="popup__input popup__input_name"
        type="text"
        name="name"
        minLength={2}
        maxLength={40}
        required=""
        value={name}
        onChange={handleNameChange}
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
        value={about}
        onChange={handleAboutChange}
      />
      <span className="profession-input-error popup__input-error" />
    </label>
  </PopupWithForm>
  )
}

export default EditProfilePopup;