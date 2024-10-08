import './pages/index.css'
import { createCard } from './components/card.js'
import { openPopup, closePopup, closePopupByOverlay  } from './components/modal'
import { enableValidation, clearValidation } from './components/validation.js'
import { updateAvatar, getProfileInfo, editProfileInfo, getInitialCards, addCard
} from './components/api.js'


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
const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaptionTypeImage = popupTypeImage.querySelector('.popup__caption')
const profileAvatar = document.querySelector('.profile__image')
let userId;
const popupTypeAvatar = document.querySelector('.popup_type_avatar')
const avatarForm = popupTypeAvatar.querySelector('.popup__form')
const avatarFormInput = avatarForm.querySelector('.popup__input_type_url')
const profileOverlay = document.querySelector('.profile__overlay')


Promise.all([getInitialCards(), getProfileInfo()])
.then(([cards, profileData]) => {
userId = profileData;
cards.forEach(card => {
  placeList.append(createCard(card, openPopupImage, profileData._id))
  profileProcessing(profileData)
})
})
.catch((error) => {
  console.log(error)
})

function profileProcessing(profileData){
profileTitle.textContent = profileData.name
profileDesc.textContent = profileData.about
profileAvatar.src = profileData.avatar
}
profileEditBtn.addEventListener('click', () => {
  openPopup(popupTypeEdit) 
  editFormNameInput.value = profileTitle.textContent
  editFormDescInput.value = profileDesc.textContent
  clearValidation(editForm, validationConfig)
} )
profileAddBtn.addEventListener('click', () => openPopup(popupTypeNewCard))

function openPopupImage(name, link) {
  popupImage.src = link
  popupImage.alt = name
  popupCaptionTypeImage.textContent = name

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
  const formButton = editForm.querySelector('.popup__button')
  const nameValue = editFormNameInput.value
  const descValue = editFormDescInput.value
  const initialTextButton = formButton.textContent
  formButton.textContent = 'Сохранение...'

  editProfileInfo(nameValue,descValue)
  .then(profileData => {
    profileProcessing(profileData)
    closePopup(popupTypeEdit)
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    formButton.textContent = initialTextButton
  })
}
editForm.addEventListener('submit', editFormSubmit)

function submitNewCardForm(event){
  event.preventDefault()
  const formButton = newCardForm.querySelector('.popup__button')
  const nameValue = newCardNameInput.value
  const urlValue = newCardUrlInput.value
  const initialTextButton = formButton.textContent
  formButton.textContent = 'Сохранение...'
 addCard(nameValue, urlValue)
 .then(card => {
  placeList.prepend(createCard(card, openPopupImage))
  closePopup(popupTypeNewCard)
  newCardForm.reset()
 })
 .catch((error) => {
  console.log(error)
})
 .finally(() => {
  formButton.textContent = initialTextButton
})
}
newCardForm.addEventListener('submit', submitNewCardForm)

document.addEventListener('DOMContentLoaded', () => {
  popups.forEach(popup =>{
    if(!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated')
    }
  }) 
})

closePopupByOverlay(popups)

function editAvatar(event){
  event.preventDefault()
  const formButton = avatarForm.querySelector('.popup__button')
  const initialTextButton = formButton.textContent
  formButton.textContent = 'Сохранение...'

  const urlValue = avatarFormInput.value;
  updateAvatar(urlValue)
  .then( profileData => {
    profileAvatar.src = profileData.avatar;
    closePopup(popupTypeAvatar)
  })
  .catch((error) => {
    console.log(error)
  })
   .finally(() => {
    formButton.textContent = initialTextButton
  })
}
avatarForm.addEventListener('submit', editAvatar)
profileOverlay.addEventListener('click', () => openPopup(popupTypeAvatar))
// Включение валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorVisibleClass: 'popup__input-error_visible'
};
enableValidation(validationConfig)