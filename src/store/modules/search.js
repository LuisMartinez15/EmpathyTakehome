// eslint-disable-next-line
import Spotify from '@/api';
import { getQueryString, getUrlParameter } from '@/utils';

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
      context.commit('TERM_UPDATED', term);
      context.commit('ADD_SEARCH_HISTORY_ENTRY', { term, filters });
      context.commit('RESULTS_FETCHED', data);
    } catch (error) {
      context.commit('RESULTS_FAILED');
    }
  },
  getMoreItems: async (context, payload) => {
    const query = getQueryString(payload);
    const type = `${getUrlParameter('type', query)}s`;
    const mutation = `GET_MORE_${type.toUpperCase()}`;

    try {
      const { data } = await Spotify.get(`/search?${query}`);
      context.commit(mutation, data[type]);
    } catch (error) {
      // context.commit(`${mutation}_FAILED`);
    }
  },
};

/* eslint-disable */
const mutations = {
  TERM_UPDATED: (state, payload) => {
    state.term = payload;
  },

  FILTERS_UPDATED: (state, payload) => {
    state.filters = [...payload];
  },

  RESULTS_FETCHED: (state, payload) => {
    state.results = payload;
  },

  RESULTS_FAILED: (state) => {
    state.results = [];
  },

  GET_MORE_TRACKS: (state, payload) => {
    const previousTracks = state.results.tracks.items;
    state.results.tracks = payload;
    state.results.tracks.items = [...new Set([...previousTracks, ...state.results.tracks.items])];
  },

  GET_MORE_ARTISTS: (state, payload) => {
    const previousArtists = state.results.artists.items;
    state.results.artists = payload;
    state.results.artists.items = [...new Set([...previousArtists, ...state.results.artists.items])];
  },

  ADD_SEARCH_HISTORY_ENTRY: (state, payload) => {
    state.searchHistory = [payload, ...state.searchHistory];
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
  albums: state => state.results.albums || {},
  artists: state => state.results.artists || {},
  tracks: state => state.results.tracks || {},
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
