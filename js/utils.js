/**
 * @param {string} url
 * @param {RequestInit} [options]
 * @return {Promise}
 */
export const request = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`${response.status}. ${response.statusText}`);
  }

  return response.json();
};

/**
 * @param {(...args: any) => any} callback
 * @param {number} delay
 * @returns {(...args: any) => any}
 */
export const debounce = (callback, delay = 500) => {
  let timeoutId;
  let lastCallTime;

  return (...args) => {
    const elapsedTime = Date.now() - lastCallTime;
    const newDelay = Math.max(delay - elapsedTime, 0);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
      lastCallTime = Date.now();
    }, newDelay);
  };
};
