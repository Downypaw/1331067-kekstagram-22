
import {openUserModal, closeUserModal, onEnterOpen, onEscClose} from './popup.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
const COMMENTS_GROUP_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const userModalCloseElement = document.querySelector('.big-picture__cancel');
const pictureImage = document.querySelector('.big-picture__img').querySelector('img');
const likes = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const photoDescription = document.querySelector('.social__caption');
const commentsLoader = document.querySelector('.social__comments-loader');
const commentsLoaded = document.querySelector('.comments-loaded');

const onFullscreenEscKeydown = (evt) => {
  onEscClose(evt, closeUserModalFullscreen);
}

const closeUserModalFullscreen = () => {
  closeUserModal(bigPicture, onFullscreenEscKeydown);
  commentsList.textContent = '';
}

const openUserModalPicture = () => {
  openUserModal(bigPicture, onFullscreenEscKeydown);
}

const openFullscreen = (photos) => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.addEventListener('click', (evt) => {
      openUserModalPicture();
      const currentElement = photos[evt.currentTarget.id];
      pictureImage.src = currentElement.url;
      likes.textContent = currentElement.likes;
      photoDescription.textContent = currentElement.description;
      commentsCount.textContent = currentElement.comments.length;

      let j = 0;
      let start = 0;
      let end = COMMENTS_GROUP_COUNT;
      let arrayOfFragments = [];
      while (j < Math.ceil(currentElement.comments.length / COMMENTS_GROUP_COUNT)) {
        let commentsListFragment = document.createDocumentFragment();
        if(end > currentElement.comments.length) {
          end = currentElement.comments.length;
        }

        for (let i = start; i < end; i++) {
          const comment = document.createElement('li');
          const avatar = document.createElement('img');
          const text = document.createElement('p');
          comment.classList.add('social__comment');
          avatar.classList.add('social__picture');
          avatar.src = currentElement.comments[i].avatar;
          avatar.alt = currentElement.comments[i].name;
          avatar.width = AVATAR_WIDTH;
          avatar.height = AVATAR_HEIGHT;
          text.classList.add('social__text');
          text.textContent = currentElement.comments[i].message;
          comment.appendChild(avatar);
          comment.appendChild(text);
          commentsListFragment.append(comment);
        }

        arrayOfFragments[j] = commentsListFragment;
        start += COMMENTS_GROUP_COUNT;
        end += COMMENTS_GROUP_COUNT;
        j += 1;
      }

      commentsLoaded.textContent = arrayOfFragments[0].children.length;
      commentsList.append(arrayOfFragments[0]);

      if (currentElement.comments.length > COMMENTS_GROUP_COUNT) {
        commentsLoader.classList.remove('hidden');
      } else {
        commentsLoader.classList.add('hidden');
      }

      let count = 1;

      commentsLoader.addEventListener('click', () => {
        let fragment = arrayOfFragments[count];
        if (fragment !== undefined) {
          commentsLoaded.textContent = +commentsLoaded.textContent + arrayOfFragments[count].children.length;
          commentsList.append(fragment);
        }

        if((count + 1) ===  arrayOfFragments.length) {
          commentsLoader.classList.add('hidden');
        }
        count++;
      })
    });

    picture.addEventListener('keydown', (evt) => {
      onEnterOpen(evt, openUserModalPicture);
    });
  });
}

userModalCloseElement.addEventListener('click', () => {
  closeUserModalFullscreen();
});

export {openUserModalPicture, openFullscreen};
