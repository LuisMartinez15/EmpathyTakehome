// eslint-disable-next-line
import Spotify from '@/api';
import {
  getQueryString,
  getUrlParameter,
  updateCollection,
  getYearRange,
} from '@/utils';

const defaultState = {
  term: '',
  filters: { types: ['artist'], year: { from: null, to: null }, hipster: false },
  results: {},
  searchHistory: [],
  autoSearch: true,
};

const actions = {
  search: async (context, payload) => {
    const term = payload || context.state.term;
    const { filters } = context.state;
    const { year, types, hipster } = filters;
    const yearRange = getYearRange(year);
    const tagHipster = `${hipster ? ' tag:hipster' : ''}`;
    const query = `q=${encodeURIComponent(`${term}${yearRange}${tagHipster}`)}&type=${encodeURIComponent(types.join(','))}&market=from_token&limit=20`;

    try {
      const { data } = await Spotify.get(`/search?${query}`);
      context.commit('TERM_UPDATED', term);
      context.commit('ADD_SEARCH_HISTORY_ENTRY', { term, filters: { hipster: filters.hipster, types: filters.types, year: { ...year } } });
      context.commit('RESULTS_FETCHED', data);
      return Promise.resolve();
    } catch (error) {
      context.commit('RESULTS_FAILED');
      return Promise.reject();
    }
  },
  getMoreItems: async (context, payload) => {
    const query = getQueryString(payload);
    const type = `${getUrlParameter('type', query)}s`;
    const mutation = `GET_MORE_${type.toUpperCase()}`;

    try {
      const { data } = await Spotify.get(`/search?${query}`);
      context.commit(mutation, data[type]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
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
    state.filters = payload;
  },

  FILTER_TYPES_UPDATED: (state, payload) => {
    state.filters.types = payload;
  },

  FILTER_HIPSTER_UPDATED: (state, payload) => {
    state.filters.hipster = payload;
  },

  FILTER_YEAR_FROM_UPDATED: (state, payload) => {
    state.filters.year.from = payload;
  },

  FILTER_YEAR_TO_UPDATED: (state, payload) => {
    state.filters.year.to = payload;
  },

  RESULTS_FETCHED: (state, payload) => {
    state.results = payload;
  },

  RESULTS_FAILED: (state) => {
    state.results = [];
  },

  GET_MORE_TRACKS: (state, payload) => {
    state = updateCollection(state, 'tracks', payload);
  },

  GET_MORE_ARTISTS: (state, payload) => {
    state = updateCollection(state, 'artists', payload);
  },

  GET_MORE_ALBUMS: (state, payload) => {
    state = updateCollection(state, 'albums', payload);
  },

  ADD_SEARCH_HISTORY_ENTRY: (state, payload) => {
    state.searchHistory = [{ ...payload }, ...state.searchHistory.slice(0, 4)];
  },

  REMOVE_SEARCH_HISTORY_ENTRY: (state, index) => {
    state.searchHistory.splice(index, 1);
  },

  CLEAR_SEARCH_HISTORY: (state) => {
    state.searchHistory = [];
  },

  SET_AUTO_SEARCH: (state, payload) => {
    state.autoSearch = payload;
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
  albums: state => state.results.albums || undefined,
  artists: state => state.results.artists || undefined,
  tracks: state => state.results.tracks || undefined,
  autoSearch: state => state.autoSearch,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
