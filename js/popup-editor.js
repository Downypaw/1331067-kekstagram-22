import {openUserModal, closeUserModal, onEnterClose} from './popup.js';

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

const changeScale = () => {
  imgContainer.style.setProperty('--scale', scaleValue.value.replace(/%/g, '')/100);
  imgContainer.classList.add('change-scale');
}

imgUploadInput.addEventListener('change', () => {
  openUserModal(editor);
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal(editor);
  form.reset();
  imgContainer.classList.remove('change-scale');
});

userModalCloseElement.addEventListener('keydown', () => {
  onEnterClose();
  form.reset();
  imgContainer.classList.remove('change-scale');
});

buttonSmaller.addEventListener('click', () => {
  let value = Number(scaleValue.value.replace(/%/g, '')) - 25;
  if (value >= 25) {
    scaleValue.value = value + '%';
  } else {
    scaleValue.value = 25 + '%';
  }

  changeScale();
});

buttonBigger.addEventListener('click', () => {
  let value = Number(scaleValue.value.replace(/%/g, '')) + 25;
  if (value <= 100) {
    scaleValue.value = value + '%';
  } else {
    scaleValue.value = 100 + '%';
  }

  changeScale();
});

const check = () => {
  for (let i = 0; i < radioButtons.length; i++) {
    if(radioButtons[i].checked) {
      const effectClass = 'effects__preview--' + radioButtons[i].value;
      img.className = effectClass;
      if (radioButtons[i].value == 'marvin') {
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
      else if (radioButtons[i].value == 'phobos') {
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
      else if (radioButtons[i].value == 'heat') {
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

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('click', check)
});


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
  if (img.className == 'effects__preview--marvin') {
    img.style.setProperty('--value', effectValue.value + '%');
  }
  else if (img.className == 'effects__preview--phobos') {
    img.style.setProperty('--value', effectValue.value + 'px');
  }
  else {
    img.style.setProperty('--value', effectValue.value);
  }

  if (img.className == 'effects__preview--none') {
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');
  }
});
