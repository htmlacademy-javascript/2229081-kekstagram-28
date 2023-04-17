import updatePreview from './upload-preview.js';
import openPopup from './popup.js';
import openStatusPopup from './status-popup.js';
import {request} from './utils.js';

const TAG_START = '#';
const TAG_PATTERN = new RegExp(`^${TAG_START}[a-zа-яё0-9]+$`);
const TAG_MAX_LENGTH = 20;
const TAG_MAX_QUANTITY = 5;
const DESCRIPTION_MAX_LENGTH = 140;

/**
 * @type {HTMLFormElement}
 */
const form = document.querySelector('.img-upload__form');

/**
 * @type {HTMLDivElement}
 */
const popup = form.querySelector('.img-upload__overlay');

// @ts-ignore
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

/**
 * @param {string} message
 * @param {(tags: string[]) => boolean} validate
 */
const addHashtagsValidator = (message, validate) => {
  pristine.addValidator(form.hashtags, (value) => {
    const tags = value.toLowerCase().split(' ').filter(Boolean);

    return validate(tags);
  }, message, 1, true);
};

/**
 * @param {string} message
 * @param {(description: string) => boolean} validate
 */
const addDescriptionValidator = (message, validate) => {
  pristine.addValidator(form.description, validate, message);
};

const sendFormData = async () => {
  const url = form.getAttribute('action');
  const method = form.getAttribute('method');
  const body = new FormData(form);

  form.submitButton.setAttribute('disabled', '');

  try {
    await request(url, {method, body});

    form.resetButton.click();
    openStatusPopup('success');

  } catch (exception) {
    openStatusPopup('error');
  }

  form.submitButton.removeAttribute('disabled');
};

/**
 * @param {Event & {target: HTMLInputElement}} event
 */
const onFormChange = (event) => {
  if (event.target === form.filename) {
    const data = event.target.files.item(0);

    updatePreview(data);
    openPopup(popup);
  }
};

/**
 * @param {SubmitEvent} event
 */
const onFormSubmit = (event) => {
  event.preventDefault();

  if (pristine.validate()) {
    sendFormData();
  }
};

const onFormReset = () => {
  pristine.reset();
};

addHashtagsValidator(
  `Хэш-теги должны начинаться с символа ${TAG_START}`,
  (tags) => tags.every((tag) => tag.startsWith(TAG_START))
);

addHashtagsValidator(
  'После решётки буквы/цифры',
  (tags) => tags.every((tag) => TAG_PATTERN.test(tag))
);

addHashtagsValidator(
  `Максимальная длина одного хэш-тега ${TAG_MAX_LENGTH} символов`,
  (tags) => tags.every((tag) => tag.length <= TAG_MAX_LENGTH)
);

addHashtagsValidator(
  `Не более ${TAG_MAX_QUANTITY} хэш-тегов`,
  (tags) => tags.length <= TAG_MAX_QUANTITY
);

addHashtagsValidator(
  'Хэш-теги не должны повторяться',
  (tags) => tags.length === new Set(tags).size
);

addDescriptionValidator(
  `Длина описания не должна превышать ${DESCRIPTION_MAX_LENGTH} символов`,
  (description) => description.length <= DESCRIPTION_MAX_LENGTH
  (description) => description.length <= 140
);

form.addEventListener('change', onFormChange);
form.addEventListener('submit', onFormSubmit);
form.addEventListener('reset', onFormReset);
