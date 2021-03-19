import {openUserModal, closeUserModal, onEnterClose, onPopupEscKeydown} from './popup.js';

const mainPagePart = document.querySelector('main');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');
const messageError = document.querySelector('#error').content.querySelector('.error');
const messageSuccessClose = messageSuccess.querySelector('.success__button');
const messageErrorClose = messageError.querySelector('.error__button');
const getDataAddress = 'https://22.javascript.pages.academy/kekstagram/data';
const sendDataAddress = 'https://22.javascript.pages.academy/kekstagram';

messageSuccess.classList.add('hidden');
messageError.classList.add('hidden');

mainPagePart.appendChild(messageSuccess);
mainPagePart.appendChild(messageError);

const closeMessageError = (evt) => {
  onEnterClose(evt);
  closeUserModal(messageError, onPopupEscKeydown);
  if (evt.target === messageError) {
    closeUserModal(messageError, onPopupEscKeydown);
  }
  messageErrorClose.removeEventListener('click', closeMessageError);
  messageErrorClose.removeEventListener('keydown', closeMessageError);
  messageError.removeEventListener('click', closeMessageError);
}

const closeMessageSuccess = (evt) => {
  onEnterClose(evt);
  closeUserModal(messageSuccess, onPopupEscKeydown);
  if (evt.target === messageSuccess) {
    closeUserModal(messageSuccess, onPopupEscKeydown);
  }
  messageSuccessClose.removeEventListener('click', closeMessageSuccess);
  messageSuccessClose.removeEventListener('keydown', closeMessageSuccess);
  messageSuccess.removeEventListener('click', closeMessageSuccess);
}

const onFailSubmit = (modal) => {
  closeUserModal(modal, onPopupEscKeydown);
  mainPagePart.appendChild(messageError);
  openUserModal(messageError, onPopupEscKeydown);
  messageErrorClose.addEventListener('click', closeMessageError);
  messageErrorClose.addEventListener('keydown', closeMessageError);
  messageError.addEventListener('click', closeMessageError);
}

const getData = (onSuccess, onFail) => {
  fetch(getDataAddress)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Не удалось получить данные. Проверьте соединение');
      }
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail('Не удалось получить данные. Проверьте соединение');
    });
};

const sendData = (onSuccess, onFail, body, modal) => {
  fetch(
    sendDataAddress,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        openUserModal(messageSuccess, onPopupEscKeydown);
        messageSuccessClose.addEventListener('click', closeMessageSuccess);
        messageSuccessClose.addEventListener('keydown', closeMessageSuccess);
        messageSuccess.addEventListener('click', closeMessageSuccess);
      } else {
        onFail(modal);

      }
    })
    .catch(() => {
      onFail(modal);
    });
};

export {getData, sendData, onFailSubmit};
