import axios from 'axios';
// eslint-disable-next-line
import store from '@/store';

const Spotify = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
  },
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

export default Spotify;
