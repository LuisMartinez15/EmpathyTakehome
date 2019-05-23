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
          this.$store.dispatch('search', newTerm);
        } else {
          this.$store.commit('EMPTY_TERM');
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
