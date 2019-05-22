<template>
  <div>
    <button v-if="!this.isAuthorized" @click="getSpotifyToken" type="button">Connect</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'home',
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
