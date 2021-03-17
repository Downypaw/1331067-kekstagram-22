import {getRandomInteger} from './util.js';
// import {openFullscreen} from './popup-fullscreen';

const RANDOM_PHOTO_COUNT = 10;
const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesListFragment = document.createDocumentFragment();

const getPostRank = (post) => {
  return post.comments.length;
};

const sortPosts = (postA, postB) => {
  const rankA = getPostRank(postA);
  const rankB = getPostRank(postB);

  return rankB - rankA;
}

const render = (photos) => {
  photos.forEach((photo) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.id = photo.id;
    picturesListFragment.appendChild(picture);
  });
  const posts = document.querySelectorAll('.picture');
  if(posts.length) {
    posts.forEach((post) => {
      post.parentNode.removeChild(post)
    })
  }
  picturesList.appendChild(picturesListFragment);
}

const renderRandomPhotos = (photos) => {
  let data = [];
  while(data.length < RANDOM_PHOTO_COUNT) {
    let pieceOfData = photos[getRandomInteger(0, photos.length - 1)];
    let isRepeat = data.some((element) => {
      return element.id === pieceOfData.id
    });
    if(!isRepeat) {
      data.push(pieceOfData);
    }
  }

  render(data);
};

const renderPopularPhotos = (photos) => {
  let sortedData = photos.slice().sort(sortPosts);
  render(sortedData);
}

export {render, renderRandomPhotos, renderPopularPhotos};
