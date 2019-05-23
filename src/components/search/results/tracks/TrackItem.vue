<template>
  <li>
    <div>
      <i></i>
    </div>
    <div>
      <span>{{ track.name }}</span>
      <span>{{ duration }}</span>
    </div>
    <div>
      <span v-if="track.explicit">EXPLICIT</span>
      <span>{{ artist }}</span>
      <span></span>
      <span>{{ track.album.name }}</span>
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
</style>
