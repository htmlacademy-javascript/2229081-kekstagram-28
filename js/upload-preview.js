const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const Effect = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectRangeMap = {
  [Effect.NONE]: [0, 100, 1],
  [Effect.CHROME]: [0, 1, .1],
  [Effect.SEPIA]: [0, 1, .1],
  [Effect.MARVIN]: [0, 100, 1],
  [Effect.PHOBOS]: [0, 3, .1],
  [Effect.HEAT]: [1, 3, .1]
};

const effectFormatterMap = {
  [Effect.NONE]: () => '',
  [Effect.CHROME]: (value) => `grayscale(${value})`,
  [Effect.SEPIA]: (value) => `sepia(${value})`,
  [Effect.MARVIN]: (value) => `invert(${value}%)`,
  [Effect.PHOBOS]: (value) => `blur(${value}px)`,
  [Effect.HEAT]: (value) => `brightness(${value})`
};

/**
 * @param {string} name
 */
const createSliderOptions = (name) => {
  const [min, max, step] = effectRangeMap[name];
  const format = {
    to: effectFormatterMap[name],
    from: Number
  };

  return {
    range: {min, max},
    step,
    start: max,
    format,
    behaviour: 'snap',
    connect: 'lower'
  };
};

/**
 * @type {HTMLImageElement}
 */
const picture = document.querySelector('.img-upload__preview img');

/**
 * @type {HTMLFieldSetElement}
 */
const scaleControl = document.querySelector('.img-upload__scale');

/**
 * @type {HTMLFieldSetElement}
 */
const effectPicker = document.querySelector('.img-upload__effects');

/**
 * @type {HTMLInputElement}
 */
const effectLevel = document.querySelector('.effect-level__value');

// @ts-ignore
const effectSlider = noUiSlider.create(
  document.querySelector('.effect-level__slider'),
  createSliderOptions(Effect.NONE)
);

/**
 * @param {string} url
 */
const setPicture = (url) => {
  picture.setAttribute('src', url);

  effectPicker.querySelectorAll('span').forEach((span) => {
    span.style.setProperty('background-image', `url(${url})`);
  });
};

/**
 * @param {number} percent
 */
const setScale = (percent) => {
  picture.style.setProperty('transform', `scale(${percent / 100})`);
  scaleControl.querySelector('input').setAttribute('value', `${percent}%`);
};

/**
 * @param {string} name
 */
const setEffect = (name) => {
  picture.setAttribute('class', `effects__preview--${name}`);
  effectSlider.updateOptions(createSliderOptions(name));
  effectLevel.parentElement.classList.toggle('hidden', name === Effect.NONE);
};

/**
 * @param {MouseEvent} event
 */
const onScaleControlClick = (event) => {
  const [less, input, more] = scaleControl.querySelectorAll('input, button');
  const value = Number.parseFloat(input.getAttribute('value'));

  switch (event.target) {
    case less:
      setScale(Math.max(value - Scale.STEP, Scale.MIN));
      break;
    case more:
      setScale(Math.min(value + Scale.STEP, Scale.MAX));
      break;
  }
};

/**
 * @param {Event & {target: Element}} event
 */
const onEffectPickerChange = (event) => {
  const name = event.target.getAttribute('value');

  setEffect(name);
};

const onEffectSliderUpdate = () => {
  picture.style.setProperty('filter', effectSlider.get());
  effectLevel.setAttribute('value', effectSlider.get(true));
};

/**
 * @param {File} data
 */
const updatePreview = (data) => {
  setPicture(URL.createObjectURL(data));
  setScale(Scale.MAX);
  setEffect(Effect.NONE);

  scaleControl.addEventListener('click', onScaleControlClick);
  effectPicker.addEventListener('change', onEffectPickerChange);
  effectSlider.on('update', onEffectSliderUpdate);
};

export default updatePreview;
