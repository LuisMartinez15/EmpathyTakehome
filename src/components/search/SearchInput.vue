<template>
  <div class="search-container">
    <input
      class="search-input"
      v-debounce="delay"
      v-model.lazy="term"
      type="text"
      placeholder="Start typing..."
    >
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
          this.$store.dispatch('search', newTerm)
            .then(() => {
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
.search-container {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;

  background-color: white;
}

.search-input {
  width: 100%;
  box-sizing: border-box;

  padding-bottom: 0.125em;

  border: none;
  border-bottom: 2px dashed #424242;
  background-color: transparent;
  color: #212121;

  font-size: 2rem;
  line-height: 2em;
  letter-spacing: 0.75px;
}

.search-input::placeholder {
  color: #757575;
}
</style>
