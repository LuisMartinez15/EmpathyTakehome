<template>
  <li class="album-item">
    <div class="album-item__container">
      <div class="album-item__media-container">
        <a class="album-item__link" :href="album.external_urls.spotify" target="_blank">
          <img v-if="image" class="album-item__image" :src="image" :alt="album.name">
          <div v-else class="album-item__image--empty"></div>
          <span class="album-item__name" :title="album.name">{{ album.name }}</span>
        </a>
      </div>
      <div class="album-item__artists ellipsis-one-line">
        <template v-for="(artist, index) in album.artists">
          <div class="album-item__artists-inner" :key="artist.id">
            <a
              class="album-item__artist-name"
              :title="artist.name"
              :href="artist.external_urls.spotify"
            >{{ artist.name }}</a>
            <span>{{ (index + 1 >= album.artists.length) ? '' : ', ' }}</span>
          </div>
        </template>
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
  computed: {
    image() {
      const { length } = this.album.images;
      const bestImage = length === 3 ? 1 : length - 1;
      return length ? this.album.images[bestImage].url : null;
    },
  },
};
</script>

<style scoped>
.album-item {
  width: 47%;
  height: 100%;
  padding-bottom: 40px;
}

@media (min-width: 520px) {
  .album-item {
    width: 32%;
  }
}

@media (min-width: 992px) {
  .album-item {
    width: 24%;
  }
}

@media (min-width: 1200px) {
  .album-item {
    width: 19%;
  }
}

.album-item__container {
  height: 100%;
  max-width: 300px;
  text-align: center;
}

.album-item__media-container {
  width: 100%;
  height: 100%;
}

.album-item__link {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 300px;
}

.album-item__image {
  width: 100%;
  object-fit: contain;
}

.album-item__image--empty {
  width: 100%;
  height: 100%;
  background-color: #212121;
}

.album-item__name {
  display: inline-block;
  padding: 10px 0;
  font-size: 0.875em;
  color: #424242;
}

.album-item__artists {
  width: 80%;
  margin: 0 auto;
}

.album-item__artists-inner {
  text-align: center;
  display: inline-block;
}

.album-item__artist-name {
  font-size: 0.875em;
  opacity: 0.85;
  text-decoration: none;
  color: #424242;
}

.album-item__artist-name:hover {
  opacity: 1;
  padding-bottom: 1px;
  border-bottom: 2px dashed #424242;
}
</style>
