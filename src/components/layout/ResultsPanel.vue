<template>
  <div>
    <div v-if="!term">
      <h2>Search in SpotiTracker</h2>
      <span>Find your favorite artists, tracks and albums.</span>
    </div>
    <div v-else-if="results && !emptyResults">
      <search-nav/>
      <slot name="tracks"></slot>
      <slot name="artists"></slot>
      <slot name="albums"></slot>
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

import SearchNavBar from '@/components/search/SearchNavBar.vue';


export default {
  name: 'results-panel',
  components: {
    'search-nav': SearchNavBar,
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
