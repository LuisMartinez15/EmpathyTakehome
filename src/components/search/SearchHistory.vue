<template>
  <section class="search-history__container">
    <h2 class="search-history__headline">Recently searched</h2>
    <span
      class="search-history__clear-all"
      type="button"
      role="button"
      v-if="searchHistory && searchHistory.length > 1"
      @click="clearHistory()"
    >Clear all</span>
    <ul class="search-history__list" v-if="searchHistory && searchHistory.length > 0">
      <li class="search-history__entry" v-for="(search, index) in this.searchHistory" :key="index">
        <div class="search-history__entry-container" @click="searchAgain(index)">
          <span class="search-history__term ellipsis-one-line">{{ search.term }}</span>
          <div class="search-history__filters-container">
            <span
              class="search-history__filters ellipsis-one-line"
            >{{ search.filters.types.join(', ') }}</span>
            <span class="search-history__filters ellipsis-one-line" v-if="search.filters.year.from">
              {{ `${search.filters.year.from}
              ${search.filters.year.to ? `- ${search.filters.year.to}` : ''}` }}
            </span>
            <span class="search-history__filters" v-if="search.filters.hipster">hipster</span>
          </div>
        </div>
        <!-- eslint-disable-next-line -->
        <span role="button" class="search-history__remove-entry" @click="removeEntry(index)">x</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'search-history',
  computed: {
    ...mapGetters({
      searchHistory: 'searchHistory',
      term: 'term',
    }),
  },
  methods: {
    searchAgain(index) {
      const { term, filters } = this.searchHistory[index];
      this.$store.commit('REMOVE_SEARCH_HISTORY_ENTRY', index);
      this.$store.commit('FILTERS_UPDATED', filters);
      this.$store.dispatch('search', term).then(() => {
        if (this.$route.name !== 'search-results') {
          this.$router.push(`/search/results/${encodeURIComponent(this.term)}`);
        }
      });
    },
    removeEntry(index) {
      this.$store.commit('REMOVE_SEARCH_HISTORY_ENTRY', index);
    },
    clearHistory() {
      this.$store.commit('CLEAR_SEARCH_HISTORY');
    },
  },
};
</script>

<style scoped>
.search-history__container {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 30px;
}

.search-history__headline {
  margin-bottom: 20px;

  font-weight: 400;
  font-size: 1.25em;
}

.search-history__clear-all {
  margin-left: auto;
  font-weight: 300;
  opacity: 0.7;
  font-size: 1.125em;
}

.search-history__clear-all:focus,
.search-history__clear-all:hover {
  opacity: 1;
  cursor: pointer;
}

.search-history__list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  margin: 0;
  padding: 15px 0 0;
  list-style: none;
  overflow-y: auto;
}

.search-history__entry {
  position: relative;
  margin-bottom: 15px;
  box-sizing: border-box;

  background-color: #f5f5f5;
  box-shadow: 2px 2px 4px 0.25px #61616180;
}

.search-history__entry:hover > .search-history__entry-container {
  cursor: pointer;
  background-color: #fafafa;
}

.search-history__entry-container {
  padding: 20px 15px;
}

.search-history__term {
  display: block;
  width: 80%;

  font-size: 1em;
}

.search-history__filters-container {
  margin-top: 15px;
  padding: 10px 0;
  border-top: 2px dashed #424242;
  border-bottom: 2px dashed #424242;
}

.search-history__filters {
  display: block;
  opacity: 0.6;
  padding: 2.5px 0;
}

.search-history__remove-entry {
  position: absolute;
  font-size: 1em;
  top: 10px;
  right: 0px;
  width: 24px;
  height: 24px;
}

.search-history__remove-entry:hover,
.search-history__remove-entry:focus {
  cursor: pointer;
}
</style>
