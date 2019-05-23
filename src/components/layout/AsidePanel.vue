<template>
  <div>
    <search-history/>
  </div>
</template>

<script>
import SearchHistory from '@/components/search/SearchHistory.vue';

export default {
  name: 'aside-panel',
  components: {
    'search-history': SearchHistory,
  },
};
</script>

<style scoped>
</style>
