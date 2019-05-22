import Vue from 'vue';
import Vuex from 'vuex';

import oauthModule from './modules/oauth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    oauth: oauthModule,
  },
});
