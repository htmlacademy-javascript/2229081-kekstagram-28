const descriptions = [
  'Описание 1',
  'Описание 2',
  'Описание 3'
];

const messages = [
  'Комментарий 1',
  'Комментарий 2',
  'Комментарий 3',
];

const names = [
  'Имя 1',
  'Имя 2',
  'Имя 3'
];

/**
 * @template Item
 * @param {Item[]} list
 * @return {Item}
 */
const pickItemFromList = (list) => {
  const index = Math.floor(Math.random() * list.length);

  return list[index];
};

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 * @see https://en.wikipedia.org/wiki/Linear_interpolation
 */
const pickIntegerInRange = (min, max) => {
  const value = min + Math.random() * (max - min);

  return Math.round(value);
};

/**
 * @param {number} id
 * @return {CommentState}
 */
const createCommentState = (id) => {
  const avatar = `img/avatar-${pickIntegerInRange(1, 6)}.svg`;
  const message = pickItemFromList(messages);
  const name = pickItemFromList(names);

  return {id, avatar, message, name};
};

/**
 * @param {number} length
 * @return {CommentState[]}
 */
const createCommentStateList = (length) => {
  const list = new Array(length).fill(1);

  return list.map((start, index) => createCommentState(start + index));
};

/**
 * @param {number} id
 * @return {ImageState}
 */
const createImageState = (id) => {
  const url = `photos/${id}.jpg`;
  const description = pickItemFromList(descriptions);
  const likes = pickIntegerInRange(15, 200);
  const comments = createCommentStateList(pickIntegerInRange(0, 20));

  return {id, url, description, likes, comments};
};

/**
 * @param {number} length
 * @return {ImageState[]}
*/
const createImageStateList = (length = 25) => {
  const list = new Array(length).fill(1);

  return list.map((start, index) => createImageState(start + index));
};

createImageStateList();
