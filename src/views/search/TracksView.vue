<template>
  <div>
    <aside-panel/>
    <div>
      <search-panel/>
      <results-panel>
        <template v-slot:tracks>
          <tracks-list v-if="results.tracks && results.tracks.total > 0"/>
        </template>
      </results-panel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AsidePanel from '@/components/layout/AsidePanel.vue';
import SearchPanel from '@/components/layout/SearchPanel.vue';
import ResultsPanel from '@/components/layout/ResultsPanel.vue';

import TracksList from '@/components/search/results/tracks/TracksList.vue';

export default {
  name: 'tracks-view',
  components: {
    'aside-panel': AsidePanel,
    'search-panel': SearchPanel,
    'results-panel': ResultsPanel,
    'tracks-list': TracksList,
  },
  computed: {
    ...mapGetters({
      isAuthorized: 'isAuthorized',
      results: 'results',
    }),
  },
};
</script>

<style scoped>
</style>
