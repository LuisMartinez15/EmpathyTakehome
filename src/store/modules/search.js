// eslint-disable-next-line
import Spotify from '@/api';

const defaultState = {
  term: '',
  filters: [
    'track',
  ],
  results: {},
};

const actions = {
  search: async (context, payload) => {
    const term = payload || context.state.term;
    const { filters } = context.state;

    const query = `q=${encodeURIComponent(term)}&type=${encodeURIComponent(filters.join(','))}&market=from_token&limit=10`;
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

  FILTERS_UPDATED: (state, payload) => {
    state.filters = [...payload];
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
  filters: state => state.filters,
  results: state => state.results,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
