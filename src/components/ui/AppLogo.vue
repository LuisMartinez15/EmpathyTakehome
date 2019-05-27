<template>
  <div class="app-logo-container">
    <span class="app-logo-icon"></span>
    <h1 class="app-logo-name">
      <span>Spoti</span>
      <span>Tracker</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'app-logo',
};
</script>

<style scoped>
.app-logo-container {
  display: flex;
  padding: 20px 30px;
  justify-content: left;
}

.app-logo-icon {
  display: inline-block;
  width: 64px;
  height: 64px;
  background: left bottom no-repeat url("../../assets/icons/logo.svg");
}

.app-logo-name {
  display: inline-block;
  font-size: 2em;
  color: black;
  text-align: left;
}

.app-logo-name > span {
  display: block;
}
</style>
