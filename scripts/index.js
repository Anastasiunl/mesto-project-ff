const cardTemplate = document.querySelector('#card-template').content
const placesList = document.querySelector('.places__list')

function createCard(card) {
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true)
  const cardDeleteBtn = cardClone.querySelector('.card__delete-button')

  cardDeleteBtn.addEventListener('click', function() {
  cardDelete(cardClone)
})
 
const cardImage = cardClone.querySelector('.card__image')
const cardTitle = cardClone.querySelector('.card__title')

cardImage.scr = card.link
cardImage.alt = card.name
cardTitle.textContent = card.name

return cardClone
}

function cardDelete(card) {
  card.remove()
}

initialCards.forEach(cards => {
  placesList.prepend(createCard(cards))
})