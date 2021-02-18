import {photoDescriptions} from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesListFragment = document.createDocumentFragment();

photoDescriptions.forEach((photoDescription) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photoDescription.url;
  picture.querySelector('.picture__likes').textContent = photoDescription.likes;
  picture.querySelector('.picture__comments').textContent = photoDescription.comments.length;
  picture.id = photoDescription.id;
  picturesListFragment.appendChild(picture);
});

picturesList.appendChild(picturesListFragment);
