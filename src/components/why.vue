<template>
  <div>
    <div class="media">
      <img class="mediaWord" src="../assets/img/coffee 選擇(橫).svg" alt>
    </div>
    <section class="why1">
      <div class="contain">
        <div class="pic_1"></div>
        <div class="reason">
          <p>早晨的開始，無論心情好壞，都必需每日一杯咖啡，但這些年台灣食安環境人人自危的情況下，開始重視吃下肚的食品，因緣際會之下，認識單品咖啡豆及發現烘培對於咖啡的影響</p>

          <p>
            不同品種的豆子使用不同培度烘出來的口感，竟有如此迥異的風味，就被這有趣的化學作用深深吸引
            ，於是開始了品咖啡的旅程
          </p>

          <div class="do">
            <img src="../assets/img/coffee 選擇.svg">
          </div>
        </div>
      </div>
    </section>
    <div class="media">
      <img class="mediaWord" style="padding:20px 0px" src="../assets/img/coffee 一定(橫).svg" alt>
    </div>
    <section class="why2" id="why2">
      <div class="contain">
        <div class="reason">
          <p>
            香、甘、醇、酸、苦，是不加任何修飾的咖啡特點，
            它的深邃，它的粗曠又耐人尋味，
            所帶來的品味香醇的原始感受。
          </p>
          <p>
            然而喝咖啡不僅僅是一種享受，
            可以紓解壓力、放鬆心情，
            餐後來一杯咖啡，
            促進消化、幫助燃燒脂肪，維持好身材。
          </p>
          <div class="drink">
            <img src="../assets/img/coffee 一定.svg">
          </div>
        </div>
        <div class="pic_2"></div>
      </div>
    </section>
  </div>
</template>

<script>
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
      flex-direction: row-reverse;
      justify-content: flex-end;
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
      background-position: center center;
      border-radius: 20px;
    }
    .pic_1 {
      background-image: url("../assets/img/doCoffee.jpg");
    }
    .pic_2 {
      background-image: url("../assets/img/drew-coffman.jpg");
    }
  }

  //   width: 100%;
  //   height: auto;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  .media {
    display: flex;
    justify-content: center;
    display: none;
    .mediaWord {
      width: 100%;
      max-width: 250px;
      padding: 80px 0 20px 0;
    }
  }

  @media (max-width: 990px) {
    .media {
      display: flex;
      justify-content: center;
    }
    #why2 {
      .contain {
        flex-direction: column-reverse;
      }
    }
    .why1,
    .why2 {
      margin-bottom: 0px;
      margin-top: 0px;
      height: auto;
      .contain {
        flex-direction: column;
        top: 0;
        transform: translateY(0);
        width: 100%;
        height: auto;
      }
      .reason {
        flex-direction: column;
        height: auto;
        margin: 0 20px;
        p {
          margin: 10px 0;
          writing-mode: initial;
        }
        .do {
          display: none;
        }
        .drink {
          display: none;
        }
      }
      .pic_1,
      .pic_2 {
        width: 100%;
        height: 250px;
        border-radius: 0px;
      }
    }
  }
</style>
