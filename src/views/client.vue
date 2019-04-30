<template>
  <div>
    <navbar/>
    <router-view></router-view>
    <bottom/>
  </div>
</template>
<script>
  /* eslint-disable */
  import navbar from "@/components/navbar.vue";
  import bottom from "@/components/bottom.vue";
  export default {
    name: "client",
    components: {
      navbar,
      bottom,
    }
  };
</script>