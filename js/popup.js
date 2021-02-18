import {isEscEvent, isEnterEvent} from './util.js';
import {photoDescriptions} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');
const userModalCloseElement = document.querySelector('.big-picture__cancel');
const pictureImage = document.querySelector('.big-picture__img').querySelector('img');
const likes = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const photoDescription = document.querySelector('.social__caption');
const commentsCountWrapper = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');
const pageBody = document.querySelector('body');
const commentsListFragment = document.createDocumentFragment();

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  bigPicture.classList.remove('hidden');
  commentsCountWrapper.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  pageBody.classList.add('.modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUserModal = () => {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('.modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

pictures.forEach((picture) => {
  picture.addEventListener('click', (evt) => {
    openUserModal();
    const currentElement = photoDescriptions[evt.currentTarget.id - 1];
    pictureImage.src = currentElement.url;
    likes.textContent = currentElement.likes;
    commentsCount.textContent = currentElement.comments.length;
    for (let i = 0; i < currentElement.comments.length; i++) {
      const comment = document.createElement('li');
      const avatar = document.createElement('img');
      const text = document.createElement('p');
      comment.classList.add('social__comment');
      avatar.classList.add('social__picture');
      avatar.src = currentElement.comments[i].avatar;
      avatar.alt = 'Аватар комментатора фотографии';
      avatar.width = 35;
      avatar.height = 35;
      text.classList.add('social__text');
      text.textContent = currentElement.comments[i].message;
      comment.appendChild(avatar);
      comment.appendChild(text);
      commentsListFragment.append(comment);
    }
    photoDescription.textContent = currentElement.description;
    commentsList.append(commentsListFragment);
  });

  picture.addEventListener('keydown', (evt) => {
    if (isEnterEvent(evt)) {
      openUserModal();
    }
  });
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

userModalCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeUserModal();
  }
});
