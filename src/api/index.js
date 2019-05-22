import axios from 'axios';
// eslint-disable-next-line
import store from '@/store';

const Spotify = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

Spotify.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch('getSpotifyToken');
    }

    return error;
  },
);

export { Spotify };
