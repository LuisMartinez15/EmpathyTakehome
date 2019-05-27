<template>
  <div class="tracks-list__container">
    <!-- <h2 class="tracks-list__headline">Songs</h2> -->
    <ol class="tracks-list">
      <track-item v-for="track in trackItems" :key="track.id" :track="track"/>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TrackItem from '@/components/search/results/tracks/TrackItem.vue';

export default {
  name: 'tracks-list',
  components: {
    'track-item': TrackItem,
  },
  props: {
    amount: {
      type: Number,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      tracks: 'tracks',
    }),
    trackItems() {
      return this.amount ? this.tracks.items.slice(0, this.amount) : this.tracks.items;
    },
  },
};
</script>

<style scoped>
.tracks-list__container {
  padding: 30px 30px;
}

.tracks-list__headline {
  margin-bottom: 24px;
  font-size: 2em;
  font-weight: 500;
  line-height: 44px;
  text-transform: none;

  color: #424242;
}

.tracks-list {
  list-style: none;
}
</style>
