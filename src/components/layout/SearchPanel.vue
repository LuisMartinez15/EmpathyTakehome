<template>
  <div>
    <search-input/>
  </div>
</template>

<script>
import SearchInput from '@/components/search/SearchInput.vue';

export default {
  name: 'search-panel',
  components: {
    'search-input': SearchInput,
  },
};
</script>

<style scoped>
</style>
