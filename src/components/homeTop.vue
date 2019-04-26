<template>
  <div class="top_header d-flex align-items-center position-relative mb-3">
    <div class="container-fluid">
      <div class="row">
        <svg class="bg_h_left position-absolute">
          <bg-header-left></bg-header-left>
        </svg>
        <svg class="bg_h_right position-absolute">
          <bg-header-right></bg-header-right>
        </svg>
        <div class="col-12 col-md-5 d-flex justify-content-center">
          <img src="../assets/img/coffee-1.png" class="coffeeCup_img">
        </div>
        <div class="col-12 col-md-6 offset-md-1 offset-0 d-flex align-items-center">
          <div class="h-50 d-flex flex-column justify-content-end">
            <h3 class="title_header">
              家就是專屬於您的咖啡館
              <br>讓您在家能享受到精品咖啡的品質
              <br>不如，現在就開始享受舒適的時光吧！
            </h3>
            <div class="text-center pt-5 pb-2">
              <a href="#" class="btn">喝一杯</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bgHeaderLeft from "@/components/svg/homeTop_bg_left"
  import bgHeaderRight from "@/components/svg/small_bg.vue"
  export default {
    name: '',
    components: {
      bgHeaderLeft,
      bgHeaderRight
    }
  }
</script>

<style lang='scss' scoped>
  // 首頁
  .top_header {
    height: 100vmin;
    min-height: 550px;
    overflow: hidden;
    .bg_h_left {
      top: -11%;
      left: -55%;
      width: 138%;
      height: 110%;
    }
    .bg_h_right {
      top: 15%;
      right: -47%;
      width: 80%;
      height: 80%;
      // transform: rotate(-35deg);
    }
    .title_header {
      font-weight: 700;
      font-size: 24px;
      color: #32312f;
    }
    .btn {
      top: 65%;
      left: 35%;
      min-width: 150px;
      min-height: 40px;
      text-align: center;
      color: #fff;
      background: #b83152;
      font-size: 18px;
      line-height: 50px;
      border-radius: 40px;
      // outline: none;
      box-shadow: none;
      &:hover {
        background: #9a2945;
      }
    }
  }

  .coffeeCup_img {
    z-index: 1;
    width: 690px;
    height: auto;
    transform: rotate(63deg);
  }
</style>
