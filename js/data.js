import {pickIntegerInRange, pickItemFromList} from './utils.js';

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
 * @return {PictureState}
 */
const createPictureState = (id) => {
  const url = `photos/${id}.jpg`;
  const description = pickItemFromList(descriptions);
  const likes = pickIntegerInRange(15, 200);
  const comments = createCommentStateList(pickIntegerInRange(0, 20));

  return {id, url, description, likes, comments};
};

/**
 * @param {number} length
 * @return {PictureState[]}
*/
const createPictureStateList = (length = 25) => {
  const list = new Array(length).fill(1);

  return list.map((start, index) => createPictureState(start + index));
};

export default createPictureStateList;
