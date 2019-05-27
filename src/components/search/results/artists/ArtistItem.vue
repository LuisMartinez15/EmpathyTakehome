<template>
  <li class="artist-item">
    <div class="artist-item__container">
      <div class="artist-item__media-container">
        <a class="artist-item__link" :href="artist.external_urls.spotify" target="_blank">
          <img v-if="image" class="artist-item__image" :src="image" :alt="artist.name">
          <div v-else class="artist-item__image--empty"></div>
        </a>
      </div>
      <span class="artist-item__name" :title="artist.name">{{ artist.name }}</span>
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
      const { length } = this.artist.images;
      const bestImage = length === 3 ? 1 : length - 1;
      return length ? this.artist.images[bestImage].url : null;
    },
  },
};
</script>

<style scoped>
.artist-item {
  width: 47%;
  height: 100%;
  padding-bottom: 40px;
}

@media (min-width: 520px) {
  .artist-item {
    width: 32%;
  }
}

@media (min-width: 992px) {
  .artist-item {
    width: 24%;
  }
}

@media (min-width: 1200px) {
  .artist-item {
    width: 19%;
  }
}

.artist-item__container {
  height: 100%;
  max-width: 300px;
  text-align: center;
}

.artist-item__media-container {
  width: 100%;
  height: 100%;
}

.artist-item__link {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 300px;
  padding-top: 100%;
}

.artist-item__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 50%;
  object-fit: contain;
}

.artist-item__image--empty {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: center no-repeat url("../../../../assets/icons/artist.svg")
    #424242;
}

.artist-item__image--empty:hover {
  background-color: #616161;
}

.artist-item__name {
  display: inline-block;
  padding: 15px 0;
  font-size: 1em;
}
</style>
