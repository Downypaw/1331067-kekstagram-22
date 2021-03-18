/* global _:readonly */

import {showAlert} from './util.js';
import {render, renderRandomPhotos, renderPopularPhotos} from './rendering.js';
import {openFullscreen} from './popup-fullscreen.js';
import './popup-editor.js';
import './form-validation.js';
import {getData} from './api.js';
import {showFiltration, getRandomPhotos, getPopularPhotos, getDefaultPhotos} from './filtration.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  render(photos);
  openFullscreen(photos);
  showFiltration();
  getPopularPhotos(photos, _.debounce(() => {renderPopularPhotos(photos); openFullscreen(photos);}, RERENDER_DELAY));
  getDefaultPhotos(photos, _.debounce(() => {render(photos); openFullscreen(photos);}, RERENDER_DELAY));
  getRandomPhotos(photos, _.debounce(() => {renderRandomPhotos(photos); openFullscreen(photos);}, RERENDER_DELAY));
}, showAlert);
