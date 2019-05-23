// eslint-disable-next-line
import Spotify from '@/api';

const defaultState = {
  term: '',
  filters: ['track'],
  results: {},
  searchHistory: [],
};

const actions = {
  search: async (context, payload) => {
    const term = payload || context.state.term;
    const { filters } = context.state;

    const query = `q=${encodeURIComponent(term)}&type=${encodeURIComponent(filters.join(','))}&market=from_token&limit=10`;
    try {
      const { data } = await Spotify.get(`/search?${query}`);
      context.commit('RESULTS_FETCHED', { data, entry: { term, filters } });
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
    state.term = payload.entry.term;
    state.results = payload.data;
    state.searchHistory = [payload.entry, ...state.searchHistory];
  },

  RESULTS_FAILED: (state) => {
    state.results = [];
  },

  REMOVE_SEARCH_HISTORY_ENTRY: (state, index) => {
    state.searchHistory.splice(index, 1);
  },

  CLEAR_SEARCH_HISTORY: (state) => {
    state.searchHistory = [];
  },
};
/* eslint-enable */

const getters = {
  term: state => state.term,
  filters: state => state.filters,
  searchHistory: state => state.searchHistory,
  results: state => state.results,
  emptyResults: state => (Object.keys(state.results)
    .filter(key => (state.results[key].total > 0)).length <= 0),
  tracks: state => state.results.tracks || {},
  albums: state => state.results.albums || {},
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
