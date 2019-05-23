<template>
  <div>
    <h2>ARTISTS</h2>
    <ul>
      <artist-item v-for="artist in artists.items" :key="artist.id" :artist="artist"/>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ArtistItem from '@/components/search/results/artists/ArtistItem.vue';

export default {
  name: 'artists-list',
  components: {
    'artist-item': ArtistItem,
  },
  computed: {
    ...mapGetters({
      artists: 'artists',
    }),
  },
};
</script>

<style scoped>
</style>
