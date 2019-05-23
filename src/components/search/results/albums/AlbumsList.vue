<template>
  <div>
    <h2>ALBUMS</h2>
    <ul>
      <album-item v-for="album in albums.items" :key="album.id" :album="album"/>
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
  computed: {
    ...mapGetters({
      albums: 'albums',
    }),
  },
};
</script>

<style scoped>
</style>
