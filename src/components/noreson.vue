<template>
  <section>
    <div class="noresons">
      <div class="noreson">
        <soEasy></soEasy>
      </div>
      <div class="bg">
        <bg/>
      </div>
    </div>
    <div class="outpic">
      <div class="pic"></div>
    </div>
  </section>
</template>

<script>
  import soEasy from '@/components/svg/soEasy'
  import bg from '@/components/svg/soEasy_bg'


  export default {
    components: {
      soEasy,
      bg
    }
  }
</script>

<style lang='scss' scoped>
  .noresons {
    width: 100%;
    min-height: 550px;
    position: relative;
    margin: 90px 0px 20px 0px;
    .bg,
    .noreson {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .bg {
      max-width: 555px;
      min-width: 380px;
      max-height: 554px;
      width: 100%;
    }
    .noreson {
      max-width: 79px;
      max-height: 328px;
      z-index: 1;
    }
  }
  .pic {
    background-repeat: no-repeat;
    // background-size: cover;
    background-attachment: fixed;

    margin: 100px auto;
    width: 940px;
    height: 480px;
    background-position: center;
    background-image: url("../assets/img/passcoffee.png");
  }

  @media (max-width: 445px) {
    .outpic {
      display: none;
    }

    .noresons {
      width: 100%;
      min-height: 550px;
      position: relative;
      margin: 0px 0px 0px 0px;
      .noreson {
        width: 69px;
        height: 276px;
        z-index: 1;
      }
    }
  }
</style>
