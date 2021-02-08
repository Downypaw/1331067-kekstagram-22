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

const getRandomArrayElement = function(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const PHOTO_DESCRIPTION_COUNT = 25;
const COMMENT_COUNT = 6;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Кузя',
  'Оскар',
  'Мурзик',
  'Ричард',
  'Тихиро',
  'Феликс',
  'Барсик',
  'Гарфилд',
  'Снежок',
  'Дымка',
  'Сабрина',
];

const createComment = function() {
  return {
    id: getRandomInteger(0, 999),
    avatar: 'img/avatar' + getRandomInteger(0, 6) + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
}

const createPhotoDescription = function() {
  return {
    id: null,
    url: null,
    description: 'Фотография, опублекованная на сайте Кекстаграм',
    likes: getRandomInteger(15, 200),
    comments: new Array(COMMENT_COUNT).fill(null).map(function() {
      createComment();
    }),
  }
}

let comments = [];
while(comments.length <= COMMENT_COUNT) {
  let comment = createComment();
  let isRepeat = comments.some(function(element) {
    return element.id === comment.id && element.name === comment.name
  });
  if(!isRepeat) {
    comments.push(comment);
  }
}

let photoDescriptions = [];
for (let i = 0; i < PHOTO_DESCRIPTION_COUNT; i++) {
  let description = createPhotoDescription();
  description.id = i + 1;
  description.url = 'photo/' + (i + 1) + '.jpg';
  photoDescriptions[i] = description;
}
