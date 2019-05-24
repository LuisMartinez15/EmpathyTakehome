import { getUrlParameter } from '@/utils';

const defaultState = {
  token: window.localStorage.getItem('accessToken') || '',
};

const actions = {
  getSpotifyToken: () => {
    const baseURL = 'https://accounts.spotify.com/authorize';
    const clientId = encodeURIComponent('f1bccbbbce684c9eb31fcc66fbfcf802');
    const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
    const state = encodeURIComponent((new Date().getTime()).toString(16));
    const query = `?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=user-read-private`;

    window.localStorage.setItem('oauthState', state);
    window.location = `${baseURL}${query}`;
  },
  storeToken: (context) => {
    const oauthState = window.localStorage.getItem('oauthState');
    const requestState = getUrlParameter('state', window.location.hash);
    const errorParam = getUrlParameter('error', window.location.href);

    if (oauthState === requestState && !errorParam) {
      const accessToken = getUrlParameter('access_token', window.location.hash);
      window.localStorage.setItem('accessToken', accessToken);
      context.commit('OAUTH_TOKEN_SAVED', accessToken);
    } else {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('oauthState');
    }
  },
};

/* eslint-disable */
const mutations = {
  OAUTH_TOKEN_SAVED: (state, token) => {
    state.token = token;
  },
};
/* eslint-enable */

const getters = {
  isAuthorized: state => !!state.token,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
