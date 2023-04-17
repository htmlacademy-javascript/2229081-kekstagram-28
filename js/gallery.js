import updatePreview from './gallery-preview.js';
import openPopup from './popup.js';
import {debounce} from './utils.js';

/**
 * @type {HTMLElement}
 */
const menu = document.querySelector('.img-filters');

/**
 * @type {HTMLElement}
 */
const gallery = document.querySelector('.pictures');

/**
 * @type {HTMLTemplateElement}
 */
const pictureTemplate = document.querySelector('#picture');

/**
 * @type {HTMLElement}
 */
const popup = document.querySelector('.big-picture');

/**
 * @type {PictureState[]}
 */
let initialData;

/**
 * @param {PictureState} data
 * @return {HTMLAnchorElement}
 */
const createPicture = (data) => {
  const picture =
  /**
   * @type {HTMLAnchorElement}
   */
  (pictureTemplate.content.querySelector('.picture').cloneNode(true));

  picture.querySelector('.picture__img').setAttribute('src', data.url);
  picture.querySelector('.picture__comments').textContent = String(data.comments.length);
  picture.querySelector('.picture__likes').textContent = String(data.likes);

  picture.addEventListener('click', (event) => {
    updatePreview(data);
    openPopup(popup);
    event.preventDefault();
  });

  return picture;
};

/**
 * @param {PictureState[]} data
 */
const renderPictures = (data) => {
  const pictures = gallery.querySelectorAll('.picture');
  const newPictures = data.map(createPicture);

  pictures.forEach((picture) => picture.remove());
  gallery.append(...newPictures);
};

/**
 * @param {MouseEvent & {target: Element}} event
 */
const onMenuClick = (event) => {
  const selectedButton = event.target.closest('button');

  if (!selectedButton) {
    return;
  }

  menu.querySelectorAll('button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  selectedButton.classList.add('img-filters__button--active');
  selectedButton.dispatchEvent(new Event('change'));
};

/**
 * @param {Event & {target: HTMLButtonElement}} event
 */
const onMenuChange = debounce((event) => {
  const data = structuredClone(initialData);

  switch (event.target.getAttribute('id')) {
    case 'filter-random':
      data.sort(() => Math.random() - .5).splice(10);
      break;
    case 'filter-discussed':
      data.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  renderPictures(data);
});

/**
 * @param {PictureState[]} data
 */
const initGallery = (data) => {
  initialData = data;

  menu.classList.remove('img-filters--inactive');
  menu.addEventListener('click', onMenuClick);
  menu.addEventListener('change', onMenuChange, true);

  renderPictures(data);
};

export default initGallery;
