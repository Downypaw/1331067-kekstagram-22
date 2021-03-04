import {showAlert} from './util.js';
import {render} from './rendering.js';
import {openFullscreen} from './popup-fullscreen.js';
import './popup-editor.js';
import './form-validation.js';
import {getData} from './api.js';

getData((photos) => {
  render(photos);
  openFullscreen(photos);
}, showAlert);
