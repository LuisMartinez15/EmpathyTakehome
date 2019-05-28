import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import { searchRedirect } from './utils';

import Spotify from './api';

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
      meta: {
        title: 'SpotiTracker - Search',
      },
      component: SearchView,
      beforeEnter: (to, from, next) => {
        if (appStore.getters.isAuthorized) {
          document.title = to.meta.title;
          Spotify.defaults.headers.Authorization = `Bearer ${window.localStorage.getItem('accessToken')}`;
          return next();
        }

        return next('/');
      },
    },
    {
      path: '/search/results/:term',
      name: 'results-view',
      meta: {
        title: 'SpotiTracker - Top results',
      },
      component: ResultsView,
      beforeEnter: (to, from, next) => (searchRedirect(store, to, next)),
    },
    {
      path: '/search/songs/:term',
      name: 'tracks-view',
      meta: {
        title: 'SpotiTracker - Songs',
      },
      component: TracksView,
      beforeEnter: (to, from, next) => (searchRedirect(store, to, next)),
    },
    {
      path: '/search/artists/:term',
      name: 'artists-view',
      meta: {
        title: 'SpotiTracker - Artists',
      },
      component: ArtistsView,
      beforeEnter: (to, from, next) => (searchRedirect(store, to, next)),
    },

    {
      path: '/search/albums/:term',
      name: 'albums-view',
      meta: {
        title: 'SpotiTracker - Albums',
      },
      component: AlbumsView,
      beforeEnter: (to, from, next) => (searchRedirect(store, to, next)),
    },
  ],
});
