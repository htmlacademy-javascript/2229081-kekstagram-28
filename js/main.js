import initGallery from './gallery.js';
import openStatusPopup from './status-popup.js';
import {request} from './utils.js';
import './upload.js';

try {
  /**
   * @type {PictureState[]}
   */
  const data = await request('https://28.javascript.pages.academy/kekstagram/data');

  initGallery(data);

} catch (exception) {
  const title = `Ошибка: ${exception.message}`;
  const button = 'Закрыть';

  openStatusPopup('error', {title, button});
}
