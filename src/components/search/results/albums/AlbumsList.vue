<template>
  <div class="albums-list__container">
    <h2 class="albums-list__headline">Albums</h2>
    <ol class="albums-list">
      <album-item v-for="album in albumsItems" :key="album.id" :album="album"/>
    </ol>
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
.albums-list__container {
  padding: 30px 30px;
}

.albums-list__headline {
  margin-bottom: 24px;
  font-size: 2em;
  font-weight: 500;
  line-height: 44px;
  text-transform: none;

  color: #424242;
}

.albums-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  list-style: none;
  padding: 15px;
  background-color: white;
  box-shadow: 2px 2px 4px -1px rgba(0, 0, 0, 0.3);
}
</style>
