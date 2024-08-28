export function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEscape)
  popup.classList.add('popup_is-opened')
}

export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEscape)
  popup.classList.remove('popup_is-opened')
}

function closePopupByEscape(event){
  if (event.key === 'Escape'){
    closePopup(document.querySelector('.popup_is-opened'))
  }
}
export function closePopupByOverlay(popups) {
  popups.forEach(popup =>{
    popup.addEventListener('click', (event) => {
      if(event.target.classList.contains('popup')){
       closePopup(popup)
      }
    })
  })
}

