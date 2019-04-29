<template>
  <div>
    <section class="why1">
      <div class="contain">
        <div class="pic_1"></div>
        <div class="reason">
          <p>
            不同品種的豆子使用不同培度烘出來的口感，竟有如此迥異的風味，就被這有趣的化學作用深深吸引
            ，於是開始了品咖啡的旅程
          </p>
          <p>早晨的開始，無論心情好壞，都必需每日一杯咖啡，但這些年台灣食安環境人人自危的情況下，開始重視吃下肚的食品，因緣際會之下，認識單品咖啡豆及發現烘培對於咖啡的影響</p>

          <div>
            <chooseword class="do"></chooseword>
          </div>
        </div>
      </div>
    </section>
    <section class="why2">
      <div class="contain">
        <div class="reason">
          <p>
            喝咖啡不僅是一種享受，
            還可以紓解壓力、放鬆心情，
            餐後來一杯咖啡，
            促進消化，維持好身材。
          </p>
          <p>
            香、甘、醇、酸、苦，是不加任何修飾的咖啡特點，
            它的深邃，它的粗曠又耐人尋味，
            所帶來的品味香醇的原始感受。
          </p>
          <div>
            <drinkword class="drink"></drinkword>
          </div>
        </div>
        <div class="pic_2"></div>
      </div>
    </section>
  </div>
</template>

<script>
  import chooseword from '@/components/svg/chooseword.vue'
  import drinkword from '@/components/svg/drinkword.vue'
  export default {
    components: {
      chooseword,
      drinkword
    }
  }
</script>

<style lang='scss' scoped>
  $mainColor: #32312f;

  .why1 {
    margin-top: 100px;
  }
  .why1,
  .why2 {
    width: 100%;
    height: 420px;
    padding: 40px 35px;
    margin-bottom: 80px;
    background: $mainColor;
    .contain {
      display: flex;
      position: relative;
      align-items: center;
      top: 50%;
      transform: translateY(-50%);
      width: 940px;
      margin: auto;
    }
    .reason {
      flex: 1;
      display: flex;
      align-items: center;
      height: 460px;
      margin: 0px 40px;
      p {
        writing-mode: vertical-rl;
        display: inline-block;
        font-size: 16px;
        line-height: 28px;
        max-height: 300px;
        color: #f9f9f9;
        margin: 0px 15px;
      }
      .do {
        position: absolute;
        top: 25px;
        right: 0;
      }
      .drink {
        position: absolute;
        top: 25px;
        right: 50%;
      }
    }
    .pic_1,
    .pic_2 {
      flex: 1;
      width: 460px;
      height: 460px;
      background-size: cover;
      background-position: center;
      border-radius: 20px;
    }
    .pic_1 {
      background-image: url("../assets/img/doCoffee.jpg");
    }
    .pic_2 {
      background-image: url("../assets/img/drew-coffman.jpg");
    }
  }
</style>
