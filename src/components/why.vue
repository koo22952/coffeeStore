<template>
  <div>
    <section class="why1">
      <div class="contain">
        <div class="pic_1"></div>
        <div class="reason">
          <p>
            桅舟搖盪，漂流於永夜的廢河是木屐，
            白爪落下，攫取這滄海之一粟，
            燈光是秘語是手勢是稻草人移近向我來撫慰我愁緒茫茫的憂來無方。
          </p>
          <p>
            此處搖撼一天地的雪牙黑浪，
            在島上即是垂掛於家家戶戶，
            窗口外的一簾迷人的細雨，
            花鼓的叮噹敲響夜央，
            去叫醒你沉睡昏昏的主人無夢。
          </p>
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
            常坐在床邊一直到深夜，
            端詳你的夢在你的臉上浮游，
            非常微弱那暗雲的投影，
            被追逐的恐懼，陷落在大斷層的失聲尖叫。
          </p>
          <p>
            我害怕成為你夢中的那隻獸，
            乃至愈發憂愁而失眠，
            終究就是醒來便無法記憶指認的陰影，
            而你尚且天真地傾訴著種種餘悸。
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
