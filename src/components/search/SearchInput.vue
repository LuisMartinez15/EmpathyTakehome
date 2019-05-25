<template>
  <div>
    <input v-debounce="delay" v-model.lazy="term" type="text" placeholder="Start typing...">
  </div>
</template>

<script>
import debounce from 'v-debounce';

export default {
  name: 'search-input',
  data() {
    return {
      delay: 500, // 0.5 seconds,
    };
  },
  props: {
    canApplyFilters: {
      trype: Boolean,
      required: true,
    },
  },
  computed: {
    term: {
      get() {
        return this.$store.state.search.term;
      },
      set(newTerm) {
        this.$emit('update:canApplyFilters', false);
        if (this.term === newTerm) return;

        if (newTerm) {
          this.$store.dispatch('search', newTerm).then(() => {
            if (this.$route.name !== 'search-results') {
              this.$router.push(`/search/results/${encodeURIComponent(this.term)}`);
            }
          });
        } else {
          this.$store.commit('TERM_UPDATED', '');
          this.$router.push('/search');
        }
      },
    },
  },
  directives: {
    debounce,
  },
};
</script>

<style scoped>
</style>
