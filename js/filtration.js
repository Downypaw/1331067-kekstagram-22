// import {openFullscreen} from './popup-fullscreen';

const filterBlock = document.querySelector('.img-filters');
const filterRandomButton = document.querySelector('#filter-random');
const filterPopularButton = document.querySelector('#filter-discussed');
const filterDefaultButton = document.querySelector('#filter-default');
const filterButtons = document.querySelectorAll('.img-filters__button');

const showFiltration = () => {
  filterBlock.classList.remove('img-filters--inactive');
};

const makeButtonActive = () => {
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      for (let i = 0; i < filterButtons.length; i++) {
        if(filterButtons[i].classList.contains('img-filters__button--active')) {
          filterButtons[i].classList.remove('img-filters__button--active');
        }
      }
      filterButton.classList.add('img-filters__button--active');
    })
  })
}

const getRandomPhotos = (data, cb) => {
  makeButtonActive();
  filterRandomButton.addEventListener('click', () => {
    cb();
    // openFullscreen(data);
  })
}

const getPopularPhotos = (data, cb) => {
  makeButtonActive();
  filterPopularButton.addEventListener('click', () => {
    cb();
    // openFullscreen(data);
  })
}


const getDefaultPhotos = (photos, cb) => {
  makeButtonActive();
  filterDefaultButton.addEventListener('click', () => {
    cb();
    // openFullscreen(data);
  })
}

export {showFiltration, getRandomPhotos, getPopularPhotos, getDefaultPhotos};
