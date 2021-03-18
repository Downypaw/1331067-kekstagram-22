import {isEscEvent, isEnterEvent} from './util.js';

const pageBody = document.querySelector('body');

const onEscClose = (evt, func) => {
  const currentElement = document.querySelector('.open');
  if (isEscEvent(evt)) {
    evt.preventDefault();
    func(currentElement);
  }
};

const onPopupEscKeydown = (evt) => {
  onEscClose(evt, closeUserModal);
}

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

const openUserModal = (modal, func) => {
  modal.classList.remove('hidden');
  modal.classList.add('open');
  pageBody.classList.add('.modal-open');
  document.addEventListener('keydown', func);
};

const closeUserModal = (modal, func) => {
  modal.classList.add('hidden');
  modal.classList.remove('open');
  pageBody.classList.remove('.modal-open');
  document.addEventListener('keydown', func);

  if (modal.parentNode.classList.contains('resetting')) {
    modal.parentNode.reset();
  }
};

export {openUserModal, closeUserModal, onEnterOpen, onEnterClose, onPopupEscKeydown, onEscClose};
