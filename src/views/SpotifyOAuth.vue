<template>
  <div></div>
</template>

<script>
export default {
  name: 'spotify-oauth',
  created: function storeToken() {
    this.$store.dispatch('storeToken')
      .then(this.$router.push('/'));
  },
};
</script>

<style scoped>
</style>
