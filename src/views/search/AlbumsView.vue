<template>
  <div>
    <aside-panel/>
    <div>
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
import { debounce } from '@/utils';

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
      fetchedAll: false,
    };
  },
  computed: {
    ...mapGetters({
      albums: 'albums',
    }),
  },
  methods: {
    infiniteScrolling() {
      const docElement = document.documentElement;
      const bottomOfWindow = docElement.scrollTop + window.innerHeight
        >= (docElement.offsetHeight - this.bottomOffset);

      if (bottomOfWindow && (this.albums.offset + this.albums.limit) <= this.albums.total) {
        this.fetchedAll = this.albums.offset + this.albums.limit >= this.albums.total;
        this.$store.dispatch('getMoreItems', this.albums.next);
      }
    },
  },
  watch: {
    fetchedAll() {
      window.removeEventListener('scroll', this.infiniteScrolling);
    },
  },
  created() {
    window.addEventListener('scroll', debounce(this.infiniteScrolling, this.delay));
  },
  destroyed() {
    window.removeEventListener('scroll', this.infiniteScrolling);
  },
};
</script>

<style scoped>
</style>
