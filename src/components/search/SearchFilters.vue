<template>
  <div>
    <div title="At least one option must be checked">
      <label for="track">TRACKS</label>
      <input
        @click="preventEmptyFilters"
        type="checkbox"
        id="track"
        value="track"
        v-model="filters.types"
      >

      <label for="artist">ARTISTS</label>
      <input
        @click="preventEmptyFilters"
        type="checkbox"
        id="artist"
        value="artist"
        v-model="filters.types"
      >

      <label for="album">ALBUMS</label>
      <input
        @click="preventEmptyFilters"
        type="checkbox"
        id="album"
        value="album"
        v-model="filters.types"
      >
    </div>

    <div>
      YEAR
      <div>
        {{ filters.year.to ? 'FROM' : 'IN'}}
        <input
          v-model="filters.year.from"
          type="number"
          min="1950"
          :max="maxValidYear"
        >
      </div>
      <div>
        TO
        <input
          :disabled="!filters.year.from"
          v-model="filters.year.to"
          type="number"
          :min="parseInt(filters.year.from, 10) + 1"
          :max="maxValidYear"
        >
      </div>
    </div>

    <div>
      <label for="hipster">HIPSTER</label>
      <input type="checkbox" id="hipster" v-model="filters.hipster">
    </div>

    <button v-if="canApplyFilters" @click="applyFilters" type="submit">Apply filters</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce } from '@/utils';

export default {
  name: 'search-filters',
  data() {
    return {
      maxValidYear: parseInt(new Date().getFullYear(), 10),
      delay: 350,
    };
  },
  props: {
    canApplyFilters: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      term: 'term',
      filters: 'filters',
    }),
  },
  watch: {
    'filters.types': function typesUpdated(newTypes) {
      this.$store.commit('FILTER_TYPES_UPDATED', newTypes);
      this.$emit('update:canApplyFilters', (Boolean)(this.term && this.term.length > 0));
    },

    'filters.hipster': function toggleHipster(value) {
      this.$store.commit('FILTER_HIPSTER_UPDATED', value);
      this.$emit('update:canApplyFilters', (Boolean)(this.term && this.term.length > 0));
    },

    'filters.year.from': debounce(function yearFromUpdated(newYearFrom) {
      const { to } = this.filters.year;
      if (parseInt(newYearFrom, 10) >= this.maxValidYear) {
        this.$store.commit('FILTER_YEAR_FROM_UPDATED', this.maxValidYear);
        this.$store.commit('FILTER_YEAR_TO_UPDATED', null);
        this.$emit('update:canApplyFilters', (Boolean)(this.term && this.term.length > 0));
        return;
      }

      if (to && newYearFrom >= to) {
        this.$store.commit('FILTER_YEAR_TO_UPDATED', parseInt(newYearFrom, 10) + 1);
      }

      this.$store.commit('FILTER_YEAR_FROM_UPDATED', newYearFrom);
      this.$emit('update:canApplyFilters', (Boolean)(this.term && this.term.length > 0));
    }, 350),

    'filters.year.to': debounce(function yearToUpdated(newYearTo) {
      const { from } = this.filters.year;
      if (parseInt(newYearTo, 10) <= from) {
        this.$store.commit('FILTER_YEAR_TO_UPDATED', null);
      } else {
        this.$store.commit('FILTER_YEAR_TO_UPDATED', newYearTo);
      }

      this.$emit('update:canApplyFilters', (Boolean)(this.term && this.term.length > 0));
    }, 350),
  },
  methods: {
    preventEmptyFilters(event) {
      if (!event.target.checked && this.filters.types.length === 1) {
        event.preventDefault();
      }
    },
    applyFilters() {
      this.$emit('update:canApplyFilters', false);
      this.$store.dispatch('search').then(() => {
        if (this.$route.name !== 'search-results') {
          this.$router.push(`/search/results/${encodeURIComponent(this.term)}`);
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
