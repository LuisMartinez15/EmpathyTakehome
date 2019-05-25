import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Home from './views/Home.vue';
import SpotifyOAuth from './views/SpotifyOAuth.vue';
import TracksView from './views/search/TracksView.vue';
import SearchView from './views/search/SearchView.vue';
import ArtistsView from './views/search/ArtistsView.vue';
import AlbumsView from './views/search/AlbumsView.vue';

Vue.use(Router);

const appStore = store;

const searchRedirect = (next) => {
  if (appStore.getters.isAuthorized && appStore.getters.term) {
    return next();
  }

  return next('/');
};

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
    {
      path: '/search/songs/:term',
      name: 'tracks-view',
      component: TracksView,
      beforeEnter: (to, from, next) => (searchRedirect(next)),
    },
    {
      path: '/search/artists/:term',
      name: 'artists-view',
      component: ArtistsView,
      beforeEnter: (to, from, next) => (searchRedirect(next)),
    },

    {
      path: '/search/albums/:term',
      name: 'albums-view',
      component: AlbumsView,
      beforeEnter: (to, from, next) => (searchRedirect(next)),
    },
  ],
});
