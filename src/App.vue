<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style lang='scss'>
  @import "./assets/all.scss";

  #app {
    overflow: hidden;
    width: 100%;
  }
</style>
