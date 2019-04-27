<template>
  <div>
    <!-- 讀取的效果 -->
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>

    <homeTop/>
    <why/>
    <noreson/>
    <hotproduct/>
    <insist/>
  </div>
</template>

<script>
  import homeTop from '@/components/homeTop.vue'
  import why from '@/components/why.vue'
  import noreson from '@/components/noreson.vue'
  import hotproduct from '@/components/hotproduct.vue'
  import insist from '@/components/insist.vue'


  export default {
    name: 'home',
    components: {
      homeTop,
      why,
      noreson,
      hotproduct,
      insist,
    },
    data() {
      return {
        isLoading: false,
      }
    }
  }
</script>

<style lang='scss' scoped>
</style>
