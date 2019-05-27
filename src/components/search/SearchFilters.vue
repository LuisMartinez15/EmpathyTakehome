<template>
  <div class="search-filters">
    <div class="search-filters__container">
      <div class="search-filters__section-container" title="At least one option must be checked">
        <span class="search-filters__headline">TYPES</span>
        <div class="search-filter__filter-container search-filter__checkbox-container">
          <input
            class="search-filters__checkbox"
            @click="preventEmptyFilters"
            type="checkbox"
            id="track"
            value="track"
            v-model="filters.types"
          >
          <label class="search-filters__label" for="track">SONGS</label>
        </div>

        <div class="search-filter__filter-container search-filter__checkbox-container">
          <input
            class="search-filters__checkbox"
            @click="preventEmptyFilters"
            type="checkbox"
            id="artist"
            value="artist"
            v-model="filters.types"
          >
          <label class="search-filters__label" for="artist">ARTISTS</label>
        </div>

        <!-- eslint-disable -->
        <div
          class="search-filter__filter-container search-filter__checkbox-container search-filter__checkbox-pr--none"
        >
          <!-- eslint-enable -->
          <input
            class="search-filters__checkbox"
            id="album"
            type="checkbox"
            v-model="filters.types"
            value="album"
            @click="preventEmptyFilters"
          >
          <label class="search-filters__label" for="album">ALBUMS</label>
        </div>
      </div>

      <div class="search-filters__section-container">
        <span class="search-filters__headline">{{ filters.year.to ? 'BETWEEN' : 'IN' }}</span>
        <div class="search-filters__years-container">
          <input
            class="search-filter__filter-container search-filters__year search-filters__year-from"
            v-model="filters.year.from"
            type="number"
            placeholder="2017"
            min="1950"
            :max="maxValidYear"
          >
          <input
            class="search-filter__filter-container search-filters__year"
            v-model="filters.year.to"
            type="number"
            placeholder="2019"
            :disabled="!filters.year.from"
            :min="parseInt(filters.year.from, 10) + 1"
            :max="maxValidYear"
          >
        </div>
      </div>

      <div>
        <span class="search-filters__headline">TAGS</span>
        <div class="search-filter__filter-container search-filter__checkbox-container">
          <input
            class="search-filters__checkbox"
            type="checkbox"
            id="hipster"
            v-model="filters.hipster"
          >
          <label class="search-filters__label" for="hipster">HIPSTER</label>
        </div>
      </div>
    </div>
    <div class="search-filters__apply-container">
      <button
        class="search-filters__apply"
        v-if="canApplyFilters"
        @click="applyFilters"
        type="submit"
      >APPLY</button>
    </div>
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
.search-filters__container {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
}

.search-filters__headline {
  display: inline-block;
  padding-right: 10px;

  font-size: 0.75em;
}

.search-filters__section-container {
  padding-bottom: 20px;
}

.search-filters__years-container {
  display: inline-block;
}

.search-filter__filter-container {
  margin-top: 5px;
}

.search-filter__checkbox-container {
  position: relative;
  display: inline-flex;
  padding-right: 5px;
}

.search-filter__checkbox-pr--none {
  padding-right: 0;
}

.search-filters__label {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  cursor: pointer;
  border: 2px dashed #424242;
  font-size: 0.725em;
  user-select: none;
}

.search-filters__checkbox {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  opacity: 0;
  appearance: none;
}

.search-filters__checkbox:checked + .search-filters__label {
  border-style: solid;
  background-color: #424242;
  color: white;
}

.search-filters__checkbox:hover + .search-filters__label {
  border-style: solid;
}

.search-filters__checkbox:checked:hover + .search-filters__label {
  background-color: #616161;
  border-color: #616161;
}

.search-filters__checkbox:checked:focus + .search-filters__label {
  outline: 1;
}

.search-filters__year {
  max-width: 60px;
  padding: 5px;
  background: none;
  border: none;
  border-bottom: 1px solid #424242;
  color: #424242;
  font-size: 1.125em;
}

.search-filters__year:disabled {
  background: #e0e0e0;
  cursor: not-allowed;
}

.search-filters__year::placeholder {
  color: #e0e0e0;
}

.search-filters__year-from {
  margin-right: 15px;
}

.search-filters__apply-container {
  display: flex;
  justify-content: center;
  background-color: #f5f6f7;
  border-top: 1px solid #424242;
}

.search-filters__apply {
  border: none;
  background-color: #424242;
  padding: 10px 30px;
  color: white;
}

.search-filters__apply:hover {
  background-color: #616161;
}

@media (min-width: 520px) {
  .search-filters__container {
    flex-direction: row;
    align-items: flex-start;
  }

  .search-filters__section-container {
    padding-right: 30px;
  }

  .search-filters__years-container {
    display: block;
  }

  .search-filters__headline {
    display: block;
    margin-bottom: 15px;
    font-size: 1em;
  }

  .search-filters__label {
    font-size: 1em;
  }
}

@media (min-width: 992px) {
  .search-filters__section-container {
    padding-right: 60px;
  }
}
</style>
