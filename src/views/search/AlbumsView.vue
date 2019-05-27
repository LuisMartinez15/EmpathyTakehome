<template>
  <div>
    <aside-panel/>
    <div class="albums-view__main">
      <search-panel/>
      <results-panel>
        <template v-slot:albums>
          <albums-list v-if="albums && albums.total > 0"/>
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

import AlbumsList from '@/components/search/results/albums/AlbumsList.vue';

export default {
  name: 'artists-view',
  components: {
    'aside-panel': AsidePanel,
    'search-panel': SearchPanel,
    'results-panel': ResultsPanel,
    'albums-list': AlbumsList,
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
      albums: 'albums',
    }),
  },
  methods: {
    infiniteScrolling() {
      getMoreItems(this, 'albums');
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
  .albums-view__main {
    width: calc(100% - 300px);
    margin-left: 300px;
    padding: 0;
  }
}
</style>
