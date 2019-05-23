<template>
  <div>
    <h2>Recently Searched</h2>
    <button v-if="searchHistory && searchHistory.length > 1" @click="clearHistory()">Clear</button>
    <ul v-if="searchHistory && searchHistory.length > 0">
      <li v-for="(search, index) in this.searchHistory" :key="index">
        <div @click="searchAgain(index)">
          <span>{{ search.term }}</span>
          <span>{{ search.filters.join(', ') }}</span>
        </div>
        <span @click="removeEntry(index)">X</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'search-history',
  computed: {
    ...mapGetters({
      searchHistory: 'searchHistory',
    }),
  },
  methods: {
    searchAgain(index) {
      const { term, filters } = this.searchHistory[index];
      this.$store.commit('REMOVE_SEARCH_HISTORY_ENTRY', index);
      this.$store.commit('FILTERS_UPDATED', filters);
      this.$store.dispatch('search', term);
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
</style>
