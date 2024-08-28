import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { createCard } from './components/card.js'
import { openPopup, closePopup, closePopupByOverlay  } from './components/modal'

const placeList = document.querySelector('.places__list')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const profileEditBtn = document.querySelector('.profile__edit-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const profileAddBtn = document.querySelector('.profile__add-button')
const closePopupBtns = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll('.popup')
const editForm = document.querySelector('.popup__form')
const editFormNameInput = editForm.querySelector('.popup__input_type_name')
const editFormDescInput = editForm.querySelector('.popup__input_type_description')
const profileTitle = document.querySelector('.profile__title')
const profileDesc =  document.querySelector('.profile__description')
const newCardForm = popupTypeNewCard.querySelector('.popup__form')
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name')
const newCardUrlInput = newCardForm.querySelector('.popup__input_type_url')


initialCards.forEach(card => {
  placeList.prepend(createCard(card, openPopupImage))
})


profileEditBtn.addEventListener('click', () => openPopup(popupTypeEdit))
profileAddBtn.addEventListener('click', () => openPopup(popupTypeNewCard))

function openPopupImage(name, link) {
  const popupTypeImage = document.querySelector('.popup_type_image')
  const popupImage = popupTypeImage.querySelector('.popup__image')
  const popupCaption = popupTypeImage.querySelector('.popup__caption')

  popupImage.src = link
  popupImage.alt = name
  popupCaption.textContent = name

  openPopup(popupTypeImage)
}

closePopupBtns.forEach(buttons => {
  buttons.addEventListener('click', () => {
    const popup = buttons.closest('.popup')
    closePopup(popup)
  })
})


function editFormSubmit(event){
  event.preventDefault()

  const nameValue = editFormNameInput.value
  const descValue = editFormDescInput.value

  profileTitle.textContent = nameValue
  profileDesc.textContent = descValue

  closePopup(popupTypeEdit)
}
editForm.addEventListener('submit', editFormSubmit)

function newCardFormSubmit(event){
  event.preventDefault()
 
  const nameValue = newCardNameInput.value
  const urlValue = newCardUrlInput.value

  const card = {
    name: nameValue,
    link: urlValue
  }
 placeList.prepend(createCard(card))
 closePopup(popupTypeNewCard)
 newCardForm.replaceWith()
}
newCardForm.addEventListener('submit', newCardFormSubmit)

document.addEventListener('DOMContentLoaded', () => {
  popups.forEach(popup =>{
    if(!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated')
    }
  }) 
})


closePopupByOverlay(popups)
