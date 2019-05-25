import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import { searchRedirect } from './utils';

import Home from './views/Home.vue';
import SpotifyOAuth from './views/SpotifyOAuth.vue';

import SearchView from './views/search/SearchView.vue';
import ResultsView from './views/search/ResultsView.vue';
import TracksView from './views/search/TracksView.vue';
import ArtistsView from './views/search/ArtistsView.vue';
import AlbumsView from './views/search/AlbumsView.vue';

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
          next('/search');
        } else {
          next();
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
          return next();
        }

        return next('/');
      },
    },
    {
      path: '/search/results/:term',
      name: 'results-view',
      component: ResultsView,
      beforeEnter: (to, from, next) => (searchRedirect(store, next)),
    },
    {
      path: '/search/songs/:term',
      name: 'tracks-view',
      component: TracksView,
      beforeEnter: (to, from, next) => (searchRedirect(store, next)),
    },
    {
      path: '/search/artists/:term',
      name: 'artists-view',
      component: ArtistsView,
      beforeEnter: (to, from, next) => (searchRedirect(store, next)),
    },

    {
      path: '/search/albums/:term',
      name: 'albums-view',
      component: AlbumsView,
      beforeEnter: (to, from, next) => (searchRedirect(store, next)),
    },
  ],
});
