<template>
  <div>
    <aside-panel/>
    <div>
      <search-panel/>
      <results-panel/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AsidePanel from '@/components/layout/AsidePanel.vue';
import SearchPanel from '@/components/layout/SearchPanel.vue';
import ResultsPanel from '@/components/layout/ResultsPanel.vue';

export default {
  name: 'search-view',
  components: {
    'aside-panel': AsidePanel,
    'search-panel': SearchPanel,
    'results-panel': ResultsPanel,
  },
  computed: {
    ...mapGetters({
      isAuthorized: 'isAuthorized',
    }),
  },
};
</script>

<style scoped>
</style>
