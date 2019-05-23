import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Home from './views/Home.vue';
import SpotifyOAuth from './views/SpotifyOAuth.vue';
import SearchView from './views/SearchView.vue';

Vue.use(Router);

const appStore = store;

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (appStore.getters.isAuthorized) {
          next('search');
        } else {
          next('/');
        }
      },
    },
    {
      path: '/callback',
      name: 'spotify-oauth',
      component: SpotifyOAuth,
    },
    {
      path: '/search',
      name: 'search-view',
      component: SearchView,
      beforeEnter: (to, from, next) => {
        if (appStore.getters.isAuthorized) {
          next();
        } else {
          next('/');
        }
      },
    },
  ],
});
