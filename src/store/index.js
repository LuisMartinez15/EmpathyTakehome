import Vue from 'vue';
import Vuex from 'vuex';

import oauthModule from './modules/oauth';
import searchModule from './modules/search';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    oauth: oauthModule,
    search: searchModule,
  },
});
