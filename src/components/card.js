import { deleteCard, likeCard, dislikeCard } from './api';

/* Функция генерации карточки */

function createCard(cardData, onOpenImage, userId) {
  const cardTemplate = document.querySelector("#card-template").content,
    card = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = card.querySelector(".card__image"),
    cardTitle = card.querySelector(".card__title"),
    cardLikeButton = card.querySelector(".card__like-button"),
    cardLikeCounter = card.querySelector(".card__like-counter"),
    deleteButton = card.querySelector(".card__delete-button");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeCounter.textContent = cardData.likes.length;

     if (cardData.owner._id === userId) {
       deleteButton.classList.remove('card__delete-button-hidden')
     } else {
       deleteButton.classList.add('card__delete-button-hidden')
     }
     if (cardData.likes.some(like => like._id === userId )){
       cardLikeButton.classList.add('card__like-button_is-active')
     }

    cardImage.addEventListener('click', () => onOpenImage(cardData.name, cardData.link) )

    deleteButton.addEventListener('click', () => deleteMyCard(card, cardData._id))
     cardLikeButton.addEventListener('click', (event) => changeLike(event, cardData._id, cardLikeCounter))
  return card;
}

/* Функция лайка карточки */

function changeLike(event, cardId, cardLikeCounter) {
  if (event.target.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardId)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        event.target.classList.remove("card__like-button_is-active");
      })
      .catch((error) =>
        console.error("Ошибка при добавлении карточки:", error)
      );
  } else {
    likeCard(cardId)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        event.target.classList.add("card__like-button_is-active");
      })
      .catch((error) =>
        console.error("Ошибка при добавлении карточки:", error)
      );
  }
}

/* Функция удаления карточки */

function deleteMyCard(card, cardId) {
  deleteCard(cardId)
  .then( () => {
    card.remove();
  })
  .catch((error) => {
    console.log(error)
  })
}
export { createCard, changeLike, deleteMyCard };