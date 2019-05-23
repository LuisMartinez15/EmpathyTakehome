<template>
  <li>
    <div>
      <a href>
        <img>
      </a>
      <a href>
        <span :title="album.name">{{ album.name }}</span>
      </a>
      <div>
        <a
          v-for="(artist, index) in album.artists"
          :key="artist.id"
          :title="artist.name"
          :href="artist.external_urls.spotify"
        >{{ artist.name }}{{ (index + 1 >= album.artists.length) ? '' : ', ' }}</a>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'album-item',
  props: [
    'album',
  ],
};
</script>

<style scoped>
</style>
