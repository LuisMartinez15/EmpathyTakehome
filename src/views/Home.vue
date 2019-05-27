<template>
  <div class="home__container">
    <app-logo/>
    <h2>Spotify's songs, artists and albums search replica</h2>
    <div class="home__connect-container">
      <button
        class="home__connect"
        v-if="!this.isAuthorized"
        @click="getSpotifyToken"
        type="button"
      >Connect</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppLogo from '@/components/ui/AppLogo.vue';

export default {
  name: 'home',
  components: {
    'app-logo': AppLogo,
  },
  computed: {
    ...mapGetters({
      isAuthorized: 'isAuthorized',
    }),
  },
  methods: {
    getSpotifyToken() {
      this.$store.dispatch('getSpotifyToken');
    },
  },
};
</script>

<style scoped>
.home__container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.homw__subtitle {
  display: block;
  font-size: 1.75em;
  color: #212121;
}

.home__connect-container {
  padding: 40px 30px;
}

.home__connect {
  border: none;
  background-color: #424242;
  padding: 10px 30px;
  color: white;
}

.home__connect:hover {
  background-color: #616161;
}
</style>
