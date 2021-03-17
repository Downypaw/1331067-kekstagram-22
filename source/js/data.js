import {getRandomInteger, getRandomArrayElement} from './util.js';

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

const createComment = () => {
  return {
    id: getRandomInteger(0, 999),
    avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
}

const createCommentsList = () => {
  let comments = [];
  while(comments.length < COMMENT_COUNT) {
    let comment = createComment();
    let isRepeat = comments.some((element) => {
      return element.id === comment.id || element.name === comment.name
    });
    if(!isRepeat) {
      comments.push(comment);
    }
  }
  return comments;
}


const createPhotoDescription = () => {
  return {
    id: null,
    url: null,
    description: 'Фотография, опублекованная на сайте Кекстаграм',
    likes: getRandomInteger(15, 200),
    comments: createCommentsList(),
  }
}

let photoDescriptions = [];
for (let i = 0; i < PHOTO_DESCRIPTION_COUNT; i++) {
  let description = createPhotoDescription();
  description.id = i + 1;
  description.url = 'photos/' + (i + 1) + '.jpg';
  photoDescriptions[i] = description;
}

export {photoDescriptions};
