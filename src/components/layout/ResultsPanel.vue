<template>
  <div>
    <div v-if="!term">
      <h2>Search in SpotiTracker</h2>
      <span>Find your favorite artists, tracks and albums.</span>
    </div>
    <div v-else-if="results && !emptyResults">
      <tracks-list v-if="results.tracks && results.tracks.total > 0"/>
    </div>
    <div v-else>
      <h2>No results found for "{{ term }}"</h2>
      <span>
        Please make sure your words are spelled correctly
        or use less or different keywords.
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TracksList from '@/components/search/results/tracks/TracksList.vue';

export default {
  name: 'results-panel',
  components: {
    'tracks-list': TracksList,
  },
  computed: {
    ...mapGetters({
      term: 'term',
      results: 'results',
      emptyResults: 'emptyResults',
    }),
  },
};
</script>

<style scoped>
</style>
