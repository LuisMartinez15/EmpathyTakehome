<template>
  <div>
    <h2>ARTISTS</h2>
    <ul>
      <artist-item v-for="artist in artistsItems" :key="artist.id" :artist="artist"/>
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
  props: {
    amount: {
      type: Number,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      artists: 'artists',
    }),
    artistsItems() {
      return this.amount ? this.artists.items.slice(0, this.amount) : this.artists.items;
    },
  },
};
</script>

<style scoped>
</style>
