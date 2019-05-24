export const getUrlParameter = (name, source) => {
  // eslint-disable-next-line
  const paramName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\#&]${paramName}=([^&#]*)`);
  const results = regex.exec(source);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/* eslint-disable */
export function debounce(fn, delay) {
  var timeoutID = null;

  return function () {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
};
/* eslint-enable */

export const getQueryString = url => (url.split('?')[1] || '');
