import {openUserModal, closeUserModal, onEnterClose, onEscClose} from './popup.js';
import {sendData, onFailSubmit} from './api.js';
import {hashtagValidation, hashtagsInput, onFieldEscKeydown, textField, stopDefaultBehavior} from './form-validation.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const imgUploadInput = document.querySelector('.img-upload__input');
const editor = document.querySelector('.img-upload__overlay');
const userModalCloseElement = document.querySelector('.img-upload__cancel');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgContainer = document.querySelector('.img-upload__preview');
const img = imgContainer.querySelector('img');
const form = document.querySelector('.img-upload__form');
const slider = document.querySelector('.effect-level__slider');
const radioButtons = document.querySelectorAll('.effects__radio');
const effectValue = document.querySelector('.effect-level__value');

form.classList.add('resetting');

const makeSmaller = () => {
  let value = Number(scaleValue.value.replace(/%/g, '')) - 25;
  if (value >= 25) {
    scaleValue.value = value + '%';
  } else {
    scaleValue.value = 25 + '%';
  }

  changeScale();
}

const makeBigger = () => {
  let value = Number(scaleValue.value.replace(/%/g, '')) + 25;
  if (value <= 100) {
    scaleValue.value = value + '%';
  } else {
    scaleValue.value = 100 + '%';
  }

  changeScale();
}

const closeEditor = (evt) => {
  closeUserModalEditor();
  userModalCloseElement.removeEventListener('click', closeEditor);
  onEnterClose(evt);
  imgContainer.classList.remove('change-scale');
}

const onEditorEscKeydown = (evt) => {
  onEscClose(evt, closeUserModalEditor);
}

const openUserModalEditor = () => {
  openUserModal(editor, onEditorEscKeydown);
  hashtagsInput.addEventListener('input', hashtagValidation);
  textField.addEventListener('focusin', onFieldEscKeydown);
  userModalCloseElement.addEventListener('click', closeEditor);
  userModalCloseElement.addEventListener('keydown', closeEditor);
  buttonSmaller.addEventListener('click', makeSmaller);
  buttonBigger.addEventListener('click', makeBigger);
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('click', check)
  });
}

const closeUserModalEditor = () => {
  const textFields = Array.from(textField.children);
  closeUserModal(editor, onEditorEscKeydown);
  img.className = 'effects__preview--none';
  slider.classList.add('hidden');
  img.style.setProperty('--value', '');
  imgContainer.style.setProperty('--scale', '');
  imgContainer.classList.remove('change-scale');
  hashtagsInput.removeEventListener('input', hashtagValidation);
  textField.removeEventListener('focusin', onFieldEscKeydown);
  textFields.forEach((textFieldElement) => {
    textFieldElement.removeEventListener('keydown', stopDefaultBehavior);
  });
  buttonSmaller.removeEventListener('click', makeSmaller);
  buttonBigger.removeEventListener('click', makeBigger);
  radioButtons.forEach((radioButton) => {
    radioButton.removeEventListener('click', check)
  });
}

const changeScale = () => {
  imgContainer.style.setProperty('--scale', scaleValue.value.replace(/%/g, '')/100);
  imgContainer.classList.add('change-scale');
}

imgUploadInput.addEventListener('change', () => {
  openUserModalEditor();
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      img.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const check = () => {
  for (let i = 0; i < radioButtons.length; i++) {
    if(radioButtons[i].checked) {
      img.className = 'effects__preview--' + radioButtons[i].value;
      if (radioButtons[i].value === 'marvin') {
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          step: 1,
          start: 100,
        });

        effectValue.value = 100;
        effectValue.setAttribute('value', effectValue.value);
      }
      else if (radioButtons[i].value === 'phobos') {
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });

        effectValue.value = 3;
        effectValue.setAttribute('value', effectValue.value);
      }
      else if (radioButtons[i].value === 'heat') {
        slider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });

        effectValue.value = 3;
        effectValue.setAttribute('value', effectValue.value);
      }
      else {
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          step: 0.1,
          start: 1,
        });

        effectValue.value = 1;
        effectValue.setAttribute('value', effectValue.value);
      }
    }
  }
}

effectValue.value = 1;
effectValue.setAttribute('value', effectValue.value);

// eslint-disable-next-line no-undef
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

img.className = 'effects__preview--none';

slider.noUiSlider.on('update', (values, handle) => {
  effectValue.value = values[handle];
  effectValue.setAttribute('value', effectValue.value);
  switch (img.className) {
    case 'effects__preview--marvin':
      img.style.setProperty('--value', effectValue.value + '%');
      break;
    case 'effects__preview--phobos':
      img.style.setProperty('--value', effectValue.value + 'px');
      break;
    default:
      img.style.setProperty('--value', effectValue.value);
  }

  (img.className === 'effects__preview--none') ? slider.classList.add('hidden') : slider.classList.remove('hidden');
});

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(editor),
      () => onFailSubmit(editor),
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit(closeUserModalEditor);

export {setUserFormSubmit};
