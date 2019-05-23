// eslint-disable-next-line
import Spotify from '@/api';

const defaultState = {
  term: '',
  results: {},
};

const actions = {
  search: async (context, payload) => {
    const term = encodeURIComponent(payload) || encodeURIComponent(context.state.term);

    const query = `q=${term}&type=track,album,artist&market=from_token&limit=10`;
    try {
      const { data } = await Spotify.get(`/search?${query}`);
      context.commit('RESULTS_FETCHED', { data, term });
    } catch (error) {
      context.commit('RESULTS_FAILED');
    }
  },
};

/* eslint-disable */
const mutations = {
  EMPTY_TERM: (state) => {
    state.term = '';
  },

  RESULTS_FETCHED: (state, payload) => {
    state.term = payload.term;
    state.results = payload.data;
  },

  RESULTS_FAILED: (state) => {
    state.results = [];
  },
};
/* eslint-enable */

const getters = {
  term: state => state.term,
  results: state => state.results,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
