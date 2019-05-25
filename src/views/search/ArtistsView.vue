<template>
  <div>
    <aside-panel/>
    <div>
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
import { debounce } from '@/utils';

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
      fetchedAll: false,
    };
  },
  computed: {
    ...mapGetters({
      artists: 'artists',
    }),
  },
  methods: {
    infiniteScrolling() {
      const docElement = document.documentElement;
      const bottomOfWindow = docElement.scrollTop + window.innerHeight
        >= (docElement.offsetHeight - this.bottomOffset);

      if (bottomOfWindow && (this.artists.offset + this.artists.limit) <= this.artists.total) {
        this.fetchedAll = this.artists.offset + this.artists.limit >= this.artists.total;
        this.$store.dispatch('getMoreItems', this.artists.next);
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
