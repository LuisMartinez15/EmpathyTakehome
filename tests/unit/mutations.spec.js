import { mockResults } from '../mocks';

const mutations = {
  setResults: (state, { results }) => {
    state.results = results;
  },
  addSearchHistory: (state, { entry }) => {
    state.searchHistory = [entry, ...state.searchHistory];
  },
};

describe('search/mutations', () => {
  it('commit results', () => {
    const state = {
      results: {},
    };

    const results = mockResults;
    mutations.setResults(state, { results });
    expect(state.results).toBe(results);
  });
});

describe('search/mutations', () => {
  it('commit search history entry', () => {
    const state = {
      results: {},
      searchHistory: [],
    };

    const entry = { filters: { types: ['track'], year: { from: null, to: null }, hispter: false } };
    mutations.addSearchHistory(state, { entry });
    expect(state.searchHistory[0]).toBe(entry);
  });
});
