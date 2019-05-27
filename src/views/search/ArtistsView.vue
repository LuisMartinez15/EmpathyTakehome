<template>
  <div>
    <aside-panel/>
    <div class="artists-view__main">
      <search-panel/>
      <results-panel>
        <template v-slot:artists>
          <artists-list v-if="artists && artists.total > 0"/>
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

import ArtistsList from '@/components/search/results/artists/ArtistsList.vue';

export default {
  name: 'artists-view',
  components: {
    'aside-panel': AsidePanel,
    'search-panel': SearchPanel,
    'results-panel': ResultsPanel,
    'artists-list': ArtistsList,
  },
  data() {
    return {
      delay: 250,
      bottomOffset: 300,
      state: {
        fetchedAll: false,
      },
      debounceInfiniteScrolling: null,
    };
  },
  computed: {
    ...mapGetters({
      artists: 'artists',
    }),
  },
  methods: {
    infiniteScrolling() {
      getMoreItems(this, 'artists');
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
  .artists-view__main {
    width: calc(100% - 300px);
    margin-left: 300px;
    padding: 0;
  }
}
</style>
