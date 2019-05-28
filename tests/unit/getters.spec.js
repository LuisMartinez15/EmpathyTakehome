import { mockResults } from '../mocks';

const getters = {
  results(state) {
    return state.results;
  },
  emptyResults(state) {
    return (Object.keys(state.results)
      .filter(key => (state.results[key].total > 0)).length <= 0);
  }
};

describe('search/getters', () => {
  it('check results are not empty after fetching results', () => {
    const state = {
      results: mockResults,
    };

    expect(Object.keys(getters.results(state)).length).toEqual(3);
  })
});

describe('search/getters', () => {
  it('check results are empty on init', () => {
    const state = {
      results: {},
    };

    const isEmpty = getters.emptyResults(state);

    expect(isEmpty).toEqual(true);
  })
});
