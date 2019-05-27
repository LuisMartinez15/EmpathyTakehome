<template>
  <div class="search-view__container">
    <aside-panel/>
    <div class="search-view__main">
      <search-panel/>
      <div class="search-view__results--empty">
        <h2 class="search-view__headline">Search in SpotiTracker</h2>
        <span class="search-view__tip">Find your favorite artists, tracks and albums.</span>
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
@media (min-width: 768px) {
  .search-view__main {
    width: calc(100% - 300px);
    margin-left: 300px;
    padding: 0;
  }
}

.search-view__results--empty {
  padding: 40px 30px;
  text-align: center;
}

.search-view__headline {
  margin-bottom: 15px;
  font-size: 1.75em;
}

.search-view__tip {
  font-size: 1.125em;
  font-weight: 300;
}
</style>
