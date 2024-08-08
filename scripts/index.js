const cardTemplate = document.querySelector('#card-template').content
const placesList = document.querySelector('.places__list')

function createCard(card, cardDelete) {
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true)
  const deleteCardBtn = cardClone.querySelector('.card__delete-button')

  deleteCardBtn.addEventListener('click', function() {
   cardDelete(cardClone)
})
 
const cardImage = cardClone.querySelector('.card__image')
const cardTitle = cardClone.querySelector('.card__title')

cardImage.src = card.link
cardImage.alt = card.name
cardTitle.textContent = card.name

return cardClone
}

function cardDelete(card) {
  card.remove()
}

initialCards.forEach(cards => {
  placesList.prepend(createCard(cards, cardDelete))
})