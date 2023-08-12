import { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import avatarLogo from '../images/logo/avatarlogo.svg';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([])

  useEffect(() => {
    // Вызываем api.getUserInfo() и api.getCardsItem() при монтировании компонента
    Promise.all([api.getUserInfo(), api.getCardsItem()])
      .then(([userInfo, cardsData]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(cardsData)
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  return(
  <main className="content">
    <section className="profile">
      <div className="profile__avatar-container">
        <img
        onClick={props.onEditAvatar}
          alt="Редактор"
          src={avatarLogo}
          className="profile__avatar-edit"
        />
        <img alt="Аватар" src={userAvatar} className="profile__avatar" />
      </div>
      <div className="profile__info">
        <h1 className="profile__name">{userName}</h1>
        <button
          onClick={props.onEditProfile}
          type="button" 
          className="profile__edit-button" 
        />
        <p className="profile__profession">{userDescription}</p>
      </div>
      <button
        onClick={props.onAddPlace}
        type="button" 
        className="profile__add-button" 
      />
    </section>
    <section className="cards">
    {cards.map((card) => (
      <Card key={card.id} card={card} onCardClick={() => props.onCardClick(card)} />
    ))}

    </section>
  </main>
  )
}

export default Main;