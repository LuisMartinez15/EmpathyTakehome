<template>
  <div title="At least one option must be checked">
    <label for="track">TRACKS</label>
    <input @click="preventEmptyFilters" type="checkbox" id="track" value="track" v-model="filters">

    <label for="artist">ARTISTS</label>
    <input
      @click="preventEmptyFilters"
      type="checkbox"
      id="artist"
      value="artist"
      v-model="filters"
    >

    <label for="album">ALBUMS</label>
    <input @click="preventEmptyFilters" type="checkbox" id="album" value="album" v-model="filters">

    <div>Filters: {{ filters }}</div>
    <button v-if="canApplyFilters" @click="applyFilters" type="button">Apply Filters</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'search-filters',
  props: {
    canApplyFilters: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      term: 'term',
    }),
    filters: {
      get() {
        return this.$store.state.search.filters;
      },
      set(newFilters) {
        this.$store.commit('FILTERS_UPDATED', newFilters);
        this.$emit('update:canApplyFilters', (Boolean)(this.term && this.term.length > 0));
      },
    },
  },
  methods: {
    preventEmptyFilters(event) {
      if (!event.target.checked && this.filters.length === 1) {
        event.preventDefault();
      }
    },
    applyFilters() {
      if (this.canApplyFilters) {
        this.$emit('update:canApplyFilters', false);
        this.$store.dispatch('search');
      }
    },
  },
};
</script>

<style scoped>
</style>
