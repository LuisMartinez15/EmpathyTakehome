<template>
  <div>
    <h2>TRACKS</h2>
    <ul>
      <TrackItem v-for="track in tracks.items" :key="track.id" :track="track"/>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TrackItem from '@/components/search/results/tracks/TrackItem.vue';

export default {
  name: 'tracks-list',
  components: {
    TrackItem,
  },
  computed: {
    ...mapGetters({
      tracks: 'tracks',
    }),
  },
};
</script>

<style scoped>
</style>
