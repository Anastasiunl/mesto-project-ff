// Включение валидации форм
export const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}


// Установка обработчиков событий для формы
const setEventListeners = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  toggleButtonState(inputs, button, config);
}


// Проверка валидности введённых данных в форму
const checkInputValidity = (form, input, config) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    const errorMessage = getErrorMessage(input);
    showInputError(input, errorElement, errorMessage, config);
  } else {
    hideInputError(input, errorElement, config);
  }
}


// Получение сообщения об ошибке для некорректного поля ввода
const getErrorMessage = (input) => {
  if (input.validity.valueMissing) {
    return input.dataset.requiredError;
  }
  if (input.validity.tooShort) {
    return input.dataset.tooShortError;
  }
  if (input.validity.patternMismatch) {
    return input.dataset.patternError;
  }
  return input.validationMessage;
}


// Показ ошибки для некорректного поля ввода
const showInputError = (input, errorElement, errorMessage, config) => {
  input.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    errorElement.classList.add('popup__input-error_visible');
  }
}


// Скрытие ошибки для корректного поля ввода
const hideInputError = (input, errorElement, config) => {
  input.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
    errorElement.classList.remove('popup__input-error_visible');
  }
}


// Переключение состояния кнопки отправки формы
const toggleButtonState = (inputs, button, config) => {
  const isFormValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isFormValid;
  button.classList.toggle(config.inactiveButtonClass, !isFormValid);
}


// Очистка валидации формы
export const clearValidation = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    hideInputError(input, errorElement, config);
  });

  toggleButtonState(inputs, button, config);
}