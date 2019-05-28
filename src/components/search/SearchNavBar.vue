<template>
  <nav role="navigation">
    <ul class="search-navbar-list" role="menu">
      <router-link tag="li" :to="{ path: `/search/results/${encodeURIComponent(term)}` }">
        <a role="menuitem">TOP RESULTS</a>
      </router-link>
      <router-link
        tag="li"
        v-for="section in filteredSections"
        :key="section.filterName"
        :to="{ path: `/search/${section.prettyName}/${encodeURIComponent(term)}` }"
      >
        <a class="search-nabar-link" role="menuitem">{{ section.prettyName.toUpperCase() }}</a>
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

<style scoped>
.search-navbar-list {
  text-align: center;
  padding: 20px 30px 0;
}

.search-navbar-list > li {
  display: inline-block;
  padding: 20px;
}

.search-navbar-list > li > a {
  opacity: 0.8;
  color: #424242;
  text-decoration: none;
  cursor: pointer;
}

.router-link-active > a {
  opacity: 1;
  padding-bottom: 4px;
  border-bottom: 2px dashed #424242;
}
</style>
