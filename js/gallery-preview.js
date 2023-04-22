const COMMENTS_PER_PAGE = 5;

/**
 * @type {HTMLElement}
 */
const preview = document.querySelector('.big-picture__preview');

/**
 * @type {HTMLUListElement}
 */
const discussion = preview.querySelector('.social__comments');

/**
 * @type {HTMLLIElement}
 */
const commentTemplate = discussion.querySelector('.social__comment');

/**
 * @type {HTMLButtonElement}
 */
const moreButton = preview.querySelector('.comments-loader');

/**
 * @type {PictureState & {commentsTotal: number}}
 */
let currentData;

/**
 * @param {CommentState} data
 * @return {HTMLLIElement}
 */
const createComment = (data) => {
  const comment =
  /**
   * @type {HTMLLIElement}
   */
  (commentTemplate.cloneNode(true));

  comment.querySelector('.social__picture').setAttribute('src', data.avatar);
  comment.querySelector('.social__picture').setAttribute('alt', data.name);
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
};

const onMoreButtonClick = () => {
  const newComments = currentData.comments.splice(0, COMMENTS_PER_PAGE).map(createComment);
  const shown = currentData.commentsTotal - currentData.comments.length;

  preview.querySelector('.comments-shown').textContent = String(shown);
  discussion.append(...newComments);
  moreButton.classList.toggle('hidden', shown === currentData.commentsTotal);
};

/**
 * @param {PictureState} data
 */
const updatePreview = (data) => {
  currentData = {
    ...structuredClone(data),
    commentsTotal: data.comments.length
  };

  preview.querySelector('.big-picture__img img').setAttribute('src', currentData.url);
  preview.querySelector('.social__caption').textContent = currentData.description;
  preview.querySelector('.likes-count').textContent = String(currentData.likes);

  preview.querySelector('.comments-count').textContent = String(currentData.commentsTotal);
  discussion.replaceChildren();
  moreButton.addEventListener('click', onMoreButtonClick);
  moreButton.click();
};

export default updatePreview;
