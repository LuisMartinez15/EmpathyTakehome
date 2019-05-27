<template>
  <div class="aside-container">
    <app-logo/>
    <search-history/>
  </div>
</template>

<script>
import SearchHistory from '@/components/search/SearchHistory.vue';
import AppLogo from '@/components/ui/AppLogo.vue';

export default {
  name: 'aside-panel',
  components: {
    'search-history': SearchHistory,
    'app-logo': AppLogo,
  },
};
</script>

<style scoped>
.aside-container {
  display: none;
  background-color: white;
}

@media (min-width: 768px) {
  .aside-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100vh;
    border-right: 1px solid #424242;
  }
}
</style>
