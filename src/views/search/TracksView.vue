<template>
  <div>
    <aside-panel/>
    <div>
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
import { debounce } from '@/utils';

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
      end: false,
    };
  },
  computed: {
    ...mapGetters({
      isAuthorized: 'isAuthorized',
      tracks: 'tracks',
    }),
  },
  methods: {
    infiniteScrolling() {
      // if (window.innerHeight + window.scrollY >= (document.body.offsetHeight - this.trigger)) {
      //   if (this.state.offset + this.state.limit <= this.tracks.total) {
      const docElement = document.documentElement;
      const bottomOfWindow = docElement.scrollTop + window.innerHeight
        >= (docElement.offsetHeight - this.bottomOffset);

      if (bottomOfWindow && (this.tracks.offset + this.tracks.limit) <= this.tracks.total) {
        this.end = this.tracks.offset + this.tracks.limit >= this.tracks.total;
        this.$store.dispatch('getMoreItems', this.tracks.next);
      }
    },
  },
  watch: {
    end() {
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
