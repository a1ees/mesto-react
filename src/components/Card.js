import React from "react"

export default function Card(props) {
  return(
    <div className="cards__item">
      <button type="button" className="cards__remove-btn cards__remove-btn_active" />
        <img className="cards__image" 
        src={props.card.link}
        onClick={props.onCardClick}
       />
      <div className="cards__content">
        <h2 className="cards__title">{props.card.name}</h2>
        <div className="cards__like">
           <button type="button" className="cards__btn" />
           <div className="cards__like-sum" />{props.card.likes.length}</div>
       </div>
    </div>
  )
}