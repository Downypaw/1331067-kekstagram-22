import {isEscEvent, isEnterEvent} from './util.js';

const pageBody = document.querySelector('body');

const onPopupEscKeydown = (evt) => {
  const currentElement = document.querySelector('.open');
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModal(currentElement);
  }
};

const onEnterOpen = (evt, func) => {
  if (isEnterEvent(evt)) {
    func();
  }
};

const onEnterClose = (evt) => {
  const currentElement = document.querySelector('.open');
  if (isEnterEvent(evt)) {
    closeUserModal(currentElement);
  }
};

const openUserModal = (modal) => {
  modal.classList.remove('hidden');
  modal.classList.add('open');
  pageBody.classList.add('.modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUserModal = (modal) => {
  modal.classList.add('hidden');
  modal.classList.remove('open');
  pageBody.classList.remove('.modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);

  if (modal.parentNode.classList.contains('resetting')) {
    modal.parentNode.reset();
  }
};

export {openUserModal, closeUserModal, onEnterOpen, onEnterClose, onPopupEscKeydown};
