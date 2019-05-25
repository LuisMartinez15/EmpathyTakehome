<template>
  <div>
    <aside-panel/>
    <div>
      <search-panel/>
      <results-panel>
        <template v-slot:tracks>
          <tracks-list v-if="tracks && tracks.total > 0"/>
        </template>
        <template v-slot:artists>
          <artists-list v-if="artists && artists.total > 0"/>
        </template>
        <template v-slot:albums>
          <albums-list v-if="albums && albums.total > 0"/>
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
import ArtistsList from '@/components/search/results/artists/ArtistsList.vue';
import AlbumsList from '@/components/search/results/albums/AlbumsList.vue';

export default {
  name: 'results-view',
  components: {
    'aside-panel': AsidePanel,
    'search-panel': SearchPanel,
    'results-panel': ResultsPanel,
    'tracks-list': TracksList,
    'artists-list': ArtistsList,
    'albums-list': AlbumsList,
  },
  computed: {
    ...mapGetters({
      tracks: 'tracks',
      artists: 'artists',
      albums: 'albums',
    }),
  },
};
</script>

<style scoped>
</style>
