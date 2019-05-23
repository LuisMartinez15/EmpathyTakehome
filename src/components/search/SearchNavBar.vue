<template>
  <nav>
    <ul>
      <router-link tag="li" :to="{ path: '/search' }">
        <a>TOP RESULTS</a>
      </router-link>
      <router-link
        tag="li"
        v-for="section in filteredSections"
        :key="section.filterName"
        :to="{ path: `/search/${section.prettyName}/${term}` }"
      >
        <a>{{ section.prettyName.toUpperCase() }}</a>
      </router-link>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'section-nav',
  data: () => ({
    sections: [
      { filterName: 'tracks', prettyName: 'songs' },
      { filterName: 'albums', prettyName: 'albums' },
      { filterName: 'artists', prettyName: 'artists' },
    ],
  }),
  computed: {
    ...mapGetters({
      results: 'results',
      term: 'term',
    }),
    filteredSections() {
      return (this.sections.filter(section => (Object.keys(this.results)
        .indexOf(section.filterName) !== -1 && this.results[section.filterName].total > 0)));
    },
  },
};
</script>

<style>
</style>
