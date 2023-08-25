import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null);

  //сделал заготовку для валидации
  const handleAvatarChange = () => {
 
  };

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = avatarRef.current.value;
    props.onUpdateAvatar({
      avatar: inputValue,
    });
    avatarRef.current.value = "";
  } 

  return(
    <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Да">
    <label className="popup__item popup__item_avatar">
      <input
        ref={avatarRef}
        id="avatar-input"
        className="popup__input popup__input_avatar"
        type="URL"
        name="avatar"
        required=""
        onChange={handleAvatarChange}
      />
      <span className="avatar-input-error popup__input-error" />
    </label>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;