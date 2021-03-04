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

const onFailSubmit = (modal) => {
  closeUserModal(modal, onPopupEscKeydown);
  mainPagePart.appendChild(messageError);
  openUserModal(messageError, onPopupEscKeydown);
  messageErrorClose.addEventListener('click', () => {
    closeUserModal(messageError, onPopupEscKeydown);
  });
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
        messageSuccessClose.addEventListener('click', () => {
          closeUserModal(messageSuccess, onPopupEscKeydown);
        })
      } else {
        onFail(modal);

      }
    })
    .catch(() => {
      onFail(modal);
    });
};

messageSuccessClose.addEventListener('keydown', (evt) => {
  onEnterClose(evt);
});

messageErrorClose.addEventListener('keydown', (evt) => {
  onEnterClose(evt);
});

messageSuccess.addEventListener('click', (evt) => {
  if (evt.target === messageSuccess) {
    closeUserModal(messageSuccess, onPopupEscKeydown);
  }
});

messageError.addEventListener('click', (evt) => {
  if (evt.target === messageError) {
    closeUserModal(messageError, onPopupEscKeydown);
  }
})


export {getData, sendData, onFailSubmit};
