<template>
  <div>
    <search-input/>
    <search-filters/>
  </div>
</template>

<script>
import SearchInput from '@/components/search/SearchInput.vue';
import SearchFilters from '@/components/search/SearchFilters.vue';

export default {
  name: 'search-panel',
  components: {
    'search-input': SearchInput,
    'search-filters': SearchFilters,
  },
};
</script>

<style scoped>
</style>
