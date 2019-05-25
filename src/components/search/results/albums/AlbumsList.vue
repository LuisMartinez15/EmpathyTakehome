<template>
  <div>
    <h2>ALBUMS</h2>
    <ul>
      <album-item v-for="album in albumsItems" :key="album.id" :album="album"/>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AlbumItem from '@/components/search/results/albums/AlbumItem.vue';

export default {
  name: 'albums-list',
  components: {
    'album-item': AlbumItem,
  },
  props: {
    amount: {
      type: Number,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      albums: 'albums',
    }),
    albumsItems() {
      return this.amount ? this.albums.items.slice(0, this.amount) : this.albums.items;
    },
  },
};
</script>

<style scoped>
</style>
