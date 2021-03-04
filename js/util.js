const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (parameter1, parameter2) => {
  if(parameter1 >= 0 && parameter2 >= 0) {
    if(parameter1 <= parameter2) {
      parameter1 = Math.ceil(parameter1);
      parameter2 = Math.floor(parameter2);
      return Math.floor(Math.random() * (parameter2 - parameter1 + 1)) + parameter1;
    } else {
      alert('Допущена ошибка! Первый аргумент должен быть меньше или равен второму.');
    }
  } else {
    alert('Диапазон может быть только положительным.');
  }
}

const checkStringLength = (checkedString, maxLength) => {
  return checkedString.length <= maxLength;
}

checkStringLength('проверка', 15);

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomInteger, checkStringLength, getRandomArrayElement, isEscEvent, isEnterEvent, showAlert};
