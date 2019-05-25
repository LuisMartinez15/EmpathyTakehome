<template>
  <div>
    <h2>TRACKS</h2>
    <ul>
      <track-item v-for="track in trackItems" :key="track.id" :track="track"/>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TrackItem from '@/components/search/results/tracks/TrackItem.vue';

export default {
  name: 'tracks-list',
  components: {
    'track-item': TrackItem,
  },
  props: {
    amount: {
      type: Number,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      tracks: 'tracks',
    }),
    trackItems() {
      return this.amount ? this.tracks.items.slice(0, this.amount) : this.tracks.items;
    },
  },
};
</script>

<style scoped>
</style>
