<template>
  <div role="main">
    <div v-if="results && !emptyResults">
      <search-nav/>
      <slot name="tracks"></slot>
      <slot name="artists"></slot>
      <slot name="albums"></slot>
    </div>
    <div class="results-panel__empty" v-else>
      <h2 class="results-panel__headline">No results found for "{{ term }}"</h2>
      <span class="results-panel__tip">
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
.results-panel__empty {
  padding: 40px 0;
  text-align: center;
}

.results-panel__headline {
  margin-bottom: 15px;
  font-size: 1.75em;
}

.results-panel__tip {
  font-size: 1.125em;
  font-weight: 300;
}
</style>
