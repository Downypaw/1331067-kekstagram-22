import {isEscEvent} from './util.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const hashtagsInput = document.querySelector('.text__hashtags');
const textField = document.querySelector('.text');

const hashtagValidation = () => {
  const hashtags = hashtagsInput.value.split(' ');
  let hashtagsLowerCase = [];

  for (let i = 0; i < hashtags.length; i++) {
    if(hashtags[i] !== '') {
      hashtagsLowerCase[i] = hashtags[i].toLowerCase();
    }
  }

  if (hashtagsLowerCase.length > MAX_HASHTAG_COUNT) {
    hashtagsInput.setCustomValidity('Можно указать не более 5 хэш-тегов');
  }
  else if (hashtagsLowerCase.some((hashtag) => hashtag[0] !== '#' && hashtag.length > 0)) {
    hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с символа #');
  }
  else if (hashtagsLowerCase.some((hashtag) => ! /^[а-яА-Яa-zA-Z0-9]+$/.test(hashtag.substr(1)) && hashtag.length > 1)) {
    hashtagsInput.setCustomValidity('Хэш-тег должен состоять только из букв и чисел');
  }
  else if (hashtagsLowerCase.some((hashtag) => hashtag.length === 1)) {
    hashtagsInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
  }
  else if (hashtagsLowerCase.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH)) {
    hashtagsInput.setCustomValidity('Максимальная длина хэш-тега - 20 символов');
  }
  else if (hashtagsLowerCase.some((hashtag) => {
    let repeat = 0;
    for (let i = 0; i < hashtagsLowerCase.length; i++) {
      if(hashtagsLowerCase[i] === hashtag) {
        repeat += 1;
      }
    }
    return repeat > 1;
  })) {
    hashtagsInput.setCustomValidity('Хэш-теги не должны повторятся');
  }
  else {
    hashtagsInput.setCustomValidity('');
  }
  hashtagsInput.reportValidity();
}

const stopDefaultBehavior = (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
}

const onFieldEscKeydown = (evt) => {
  evt.target.addEventListener('keydown', stopDefaultBehavior);
}

export {hashtagValidation, hashtagsInput, onFieldEscKeydown, textField, stopDefaultBehavior};
