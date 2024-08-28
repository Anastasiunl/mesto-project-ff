const TOKEN   = 'afd167e5-7dcd-4ab3-a43d-c151ad16b65c'
const COHORT  = 'wff-cohort-21'

// Конфигурационный объект для API-запросов
const config = {
  baseUrl: `https://nomoreparties.co/v1/${COHORT}`,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}

/* Проверка получения данных */

function checkResponse(res) {
  if (res.ok) return res.json();

  return Promise.reject(`Ошибка: ${res.status}`);
}

/* Отправка обновленого аватара */

function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => checkResponse(res));
}

/* Получение данных профиля */

function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

/* Отправка отредактированных данных профиля */

function editProfileInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => checkResponse(res));
}

/* Получение всех карточек с сервера */

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

/* Отправка новой карточки */

function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkResponse(res));
}

/* Удаление текущей карточки */

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

/* Лайк текущей карточки */

function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

/* Дизлайк текущей карточки */

function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

export {
  updateAvatar,
  getProfileInfo,
  editProfileInfo,
  getInitialCards,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard
};