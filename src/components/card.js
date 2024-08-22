export function createCard(card, openPopupImage) {
  const cardTemplate = document.querySelector('#card-template').content
  const cloneCard = cardTemplate.querySelector('.card').cloneNode(true)
  const cardDeleteBtn = cloneCard.querySelector('.card__delete-button')
  const cardImage = cloneCard.querySelector('.card__image')
  const cardTitle = cloneCard.querySelector('.card__title')
  const likeButton = cloneCard.querySelector('.card__like-button')

  likeButton.addEventListener('click', likeCard)

  cardDeleteBtn.addEventListener('click', () => deleteCard(cloneCard))
  cardImage.addEventListener('click', () => openPopupImage(card.name, card.link))

  cardImage.src = card.link
  cardImage.alt = card.name
  cardTitle.textContent = card.name

  return cloneCard
}

function deleteCard(card) {
  card.remove()
}

function likeCard(event){
  event.target.classList.toggle('card__like-button_is-active')
}