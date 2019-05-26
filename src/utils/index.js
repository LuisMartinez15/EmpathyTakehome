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
  const previousItems = newState.results[type].items;
  newState.results[type] = payload;
  newState.results[type].items = [
    ...new Set([...previousItems, ...newState.results[type].items]),
  ];
  newState.results[type].offeset = newState.results[type].items.length;

  return newState;
};

export const searchRedirect = (store, next) => {
  if (store.getters.isAuthorized && store.getters.term) {
    return next();
  }

  return next('/');
};

/* eslint no-param-reassign:
  [
    "error",
    { "props": true, "ignorePropertyModificationsFor": ["component"] }
] */
export const getMoreItems = (component, type) => {
  const docElement = document.documentElement;
  const bottomOfWindow = docElement.scrollTop + window.innerHeight
    >= (docElement.offsetHeight - component.bottomOffset);

  if (bottomOfWindow
    && component[type].next) {
    component.state.fetchedAll = getUrlParameter('offset', component[type].next) + component[type].limit
      >= component[type].total;
    component.$store.dispatch('getMoreItems', component[type].next);
  }
};

export const getYearRange = (year) => {
  const { from, to } = year;

  return from ? ` year:${from}${to ? `-${to}` : ''}` : '';
};
