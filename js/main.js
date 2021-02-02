const getRandomInteger = function(parameter1, parameter2) {
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

getRandomInteger(1, 20);

const checkStringLength = function(checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

checkStringLength('проверка', 15);
