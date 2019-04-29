<template>
  <div class="top_header d-flex align-items-center position-relative">
    <div class="container-fluid">
      <div class="row">
        <svg class="bg_h_left position-absolute">
          <bg-header-left></bg-header-left>
        </svg>
        <svg class="bg_h_right position-absolute">
          <bg-header-right></bg-header-right>
        </svg>
        <div class="col-10 offset-1 col-lg-5 order-0 order-lg-1">
          <h3 class="title_header">家，就是你專屬咖啡館</h3>
          <div class="d-inline-block">
            <p class="title_p mt-4">
              讓你在家也能享受到精品咖啡廳的品質與服務
              <br>一起來品味咖啡、品味生活，探索更多咖啡的可能性！
            </p>
          </div>
          <div class="text-center mt-5">
            <a href="#" class="btn">品咖啡</a>
          </div>
        </div>
        <div
          class="coffeeCup_img col-12 col-lg-5 offset-lg-1 order-1 order-lg-0 d-flex align-items-center justify-content-center"
        >
          <img class="position-absolute mt-6 mt-lg-0" src="../assets/img/coffee_bg.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bgHeaderLeft from "@/components/svg/homeTop_bg_left"
  import bgHeaderRight from "@/components/svg/homeTop_bg_right"
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
    min-height: 600px;
    position: relative;
    // height: 100vmin;
    // min-height: 600px;
    // overflow: hidden;
    .bg_h_left {
      top: 0%;
      left: -15%;
      width: 95%;
      height: 120%;
    }
    .bg_h_right {
      top: 40%;
      right: -47%;
      width: 75%;
      height: 66%;
      // transform: rotate(-35deg);
    }
    .title_header {
      font-weight: 700;
      font-size: 2.5vw;
      color: #32312f;
    }
    .title_p {
      font-size: 1.4vw;
    }
    .btn {
      // top: 65%;
      // left: 35%;
      // min-width: 150px;
      // min-height: 40px;
      padding: 3% 7%;
      text-align: center;
      color: #fff;
      background: #b83152;
      font-size: 1.2vw;
      // line-height: 50px;
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
    // height: 100vmin;
    // max-width: 600px;
    // width: 100vmin;
    img {
      width: 135%;
      top: -100%;
      left: -20%;
    }
  }

  @media (max-width: 1200px) {
    .coffeeCup_img {
      img {
        width: 135%;
      }
    }
    .top_header {
      .title_header {
        font-size: 2.7vw;
      }
      .title_p {
        font-size: 1.5vw;
      }
      .btn {
        padding: 4% 8%;
        text-align: center;
        color: #fff;
        background: #b83152;
        font-size: 1.3vw;
      }
    }
  }
</style>
