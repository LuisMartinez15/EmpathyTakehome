export const getUrlParameter = (name, source) => {
  // eslint-disable-next-line
  const paramName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\#&]${paramName}=([^&#]*)`);
  const results = regex.exec(source);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/* eslint-disable */
export const debounce = (fn, delay) => {
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

export const updateCollection = (state, type, payload) => {
  const newState = state;
  const previousItems = newState.results.artists.items;
  newState.results[type] = payload;
  newState.results[type].items = [
    ...new Set([...previousItems, ...newState.results[type].items]),
  ];

  return newState;
};

export const searchRedirect = (store, next) => {
  if (store.getters.isAuthorized && store.getters.term) {
    return next();
  }

  return next('/');
};
