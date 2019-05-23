<template>
  <li>
    <div>
      <a :href="artist.external_urls.spotify">
        <img v-if="image" :src="image" :alt="artist.name">
        <div v-else></div>
      </a>
      <span :title="artist.name">{{ artist.name }}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'artist-item',
  props: [
    'artist',
  ],
  computed: {
    image() {
      return this.artist.images.length ? this.artist.images[0].url : null;
    },
  },
};
</script>

<style scoped>
</style>
