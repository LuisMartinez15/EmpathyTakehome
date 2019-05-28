<template>
  <li class="track-item">
    <div class="track-item__info">
      <div class="track-item__name">
        <span>{{ track.name }}</span>
      </div>
      <div class="track-item__explicit-container" v-if="track.explicit">
        <span class="track-item__explicit">EXPLICIT</span>
      </div>
      <div class="track-item__data ellipsis-one-line">
        <span class="track-item__artist">{{ artist }}</span>
      </div>
      <span class="track-item__separator">•</span>
      <div class="track-item__data ellipsis-one-line">
        <span class="track-item__album ellipsis-one-line">{{ track.album.name }}</span>
      </div>
    </div>
    <div class="track-item__duration-container">
      <span class="track-item__duration">{{ duration }}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'track-item',
  props: {
    track: {
      type: Object,
      required: true,
    },
  },
  computed: {
    artist() {
      return this.track.artists.length > 1
        ? this.track.artists.map(artist => artist.name).join(', ')
        : this.track.artists[0].name;
    },
    duration() {
      const msToSeconds = this.track.duration_ms / 1000;
      const minutes = Math.floor(msToSeconds / 60);
      let seconds = Math.trunc(msToSeconds - (minutes * 60));
      seconds = seconds > 9 ? seconds : `0${seconds}`;

      return `${minutes}:${seconds}`;
    },
  },
};
</script>

<style scoped>
.track-item {
  display: flex;
  align-content: space-between;
  padding: 15px;
  background-color: white;
  box-shadow: 2px 2px 4px -1px rgba(0, 0, 0, 0.3);
}

.track-item__info {
  flex: 1;
  color: #424242;
  max-width: 80%;
}

.track-item__name {
  max-width: 60%;
  padding-bottom: 5px;
  opacity: 1;
  font-size: 1.125em;
}

.track-item__duration-container {
  min-width: 20%;
  max-width: 20%;
  text-align: right;
}

.track-item__duration {
  opacity: 0.8;
  font-size: 1em;
}

.track-item__explicit {
  display: inline-block;
  width: auto;
  padding: 5px;
  margin-right: 5px;
  border: 2px dotted #424242;
  border-radius: 4px;
  opacity: 0.8;
}

.track-item__artist {
  font-size: 0.875em;
}

.track-item__separator {
  display: inline-block;
  padding: 0 8px;
  opacity: 0.6;
  transform: translateY(-1px);
  font-size: 0.875em;
}

.track-item__data {
  display: inline-block;
  max-width: 100%;
}

.track-item__album {
  font-size: 0.875em;
  opacity: 0.8;
}

@media (min-width: 520px) {
  .track-item__name {
    max-width: 80%;
  }

  .track-item__data {
    max-width: 80%;
  }

  .track-item__explicit-container {
    display: inline-block;
  }
}
</style>
