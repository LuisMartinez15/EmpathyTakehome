<template>
  <div>
    <aside-panel/>
    <div>
      <search-panel/>
      <div>
        <h2>Search in SpotiTracker</h2>
        <span>Find your favorite artists, tracks and albums.</span>
      </div>
    </div>
  </div>
</template>

<script>
import AsidePanel from '@/components/layout/AsidePanel.vue';
import SearchPanel from '@/components/layout/SearchPanel.vue';

export default {
  name: 'search-view',
  components: {
    'aside-panel': AsidePanel,
    'search-panel': SearchPanel,
  },
};
</script>

<style scoped>
</style>
