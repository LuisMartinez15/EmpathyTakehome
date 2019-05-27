<template>
  <form class="search-panel__form">
    <search-input :canApplyFilters.sync="state.canApplyFilters"/>
    <search-filters :canApplyFilters.sync="state.canApplyFilters"/>
  </form>
</template>

<script>
import SearchInput from '@/components/search/SearchInput.vue';
import SearchFilters from '@/components/search/SearchFilters.vue';

export default {
  name: 'search-panel',
  data() {
    return {
      state: {
        canApplyFilters: false,
      },
    };
  },
  components: {
    'search-input': SearchInput,
    'search-filters': SearchFilters,
  },
};
</script>

<style scoped>
.search-panel__form {
  background-color: white;
}
</style>
