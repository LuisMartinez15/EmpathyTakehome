<template>
  <div>
    <aside-panel/>
    <div class="tracks-view__main">
      <search-panel/>
      <results-panel>
        <template v-slot:tracks>
          <tracks-list v-if="tracks && tracks.total > 0"/>
        </template>
      </results-panel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce, getMoreItems } from '@/utils';

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
  data() {
    return {
      delay: 250,
      bottomOffset: 300,
      state: {
        fetchedAll: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      tracks: 'tracks',
    }),
  },
  methods: {
    infiniteScrolling() {
      getMoreItems(this, 'tracks');
    },
  },
  watch: {
    'state.fetchedAll': function removeScrollListener() {
      window.removeEventListener('scroll', this.debounceInfiniteScrolling);
    },
  },
  created() {
    this.debounceInfiniteScrolling = debounce(this.infiniteScrolling, this.delay);
    window.addEventListener('scroll', this.debounceInfiniteScrolling);
  },
  destroyed() {
    window.removeEventListener('scroll', this.debounceInfiniteScrolling);
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .tracks-view__main {
    width: calc(100% - 300px);
    margin-left: 300px;
    padding: 0;
  }
}
</style>
