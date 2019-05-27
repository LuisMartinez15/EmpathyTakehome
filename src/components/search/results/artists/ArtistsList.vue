<template>
  <div class="artists-list__container">
    <h2 class="artists-list__headline">Artists</h2>
    <ol class="artists-list">
      <artist-item v-for="artist in artistsItems" :key="artist.id" :artist="artist"/>
    </ol>
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
.artists-list__container {
  padding: 30px 30px;
}

.artists-list__headline {
  margin-bottom: 24px;
  font-size: 2em;
  font-weight: 500;
  line-height: 44px;
  text-transform: none;

  color: #424242;
}

.artists-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  list-style: none;
  background-color: white;
  box-shadow: 2px 2px 4px -1px rgba(0, 0, 0, 0.3);
  padding: 15px;
}
</style>
