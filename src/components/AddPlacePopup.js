import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    })
    setName('');
    setLink('');
  }

  return(
    <PopupWithForm name="add-card" title="Новое место" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
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
        onChange={handleNameChange}
        value={name}
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
        onChange={handleLinkChange}
        value={link}
      />
      <span className="place-pic-input-error popup__input-error">
        Заполните это поле
      </span>
    </label>
  </PopupWithForm>
  )
}

export default AddPlacePopup;