<template>
  <footer>
    <div class="bottom">
      <div class="left">
        <div class="info">
          <p>聯絡我們</p>
          <p>COFFEE DONE</p>
          <br>
          <p>營業時間：星期一至五 早上9:00-下午5:00</p>
          <p>國定假日：休息</p>
          <br>
          <p>Email：koo22952@gmail.com</p>
        </div>
        <div class="icon">
          <i class="fab fa-medium"></i>
          <i class="fab fa-facebook"></i>
          <i class="fab fa-github-square"></i>
        </div>
      </div>
      <div class="right">
        <div>
          <goodDay/>
        </div>
        <!-- <p>© 2019 All Rights Reserved</p> -->
      </div>
    </div>
    <div class="bg_one">
      <bg/>
    </div>
    <div class="bg_two">
      <bg/>
    </div>
  </footer>
</template>

<script>
  import goodDay from "@/components/svg/goodDay"
  import bg from "@/components/svg/small_bg.vue"
  export default {
    components: {
      bg,
      goodDay

    }
  }
</script>

<style lang='scss' scoped>
  footer {
    font-size: 14px;
    margin-top: 40px;
    background: #32312f;
    color: #fff;
    position: relative;
    .bg_one {
      position: absolute;
      top: -58px;
      width: 650px;
      right: -497px;
      transform: rotate(-7deg);
    }
    .bg_two {
      position: absolute;
      top: 70px;
      width: 450px;
      left: -315px;
      transform: rotate(-45deg);
    }
    .bottom {
      width: 90%;
      display: flex;
      height: 340px;
      margin: auto;
      padding: 30px 150px;
      position: relative;
      z-index: 1;
      .left {
        flex: 1;
        height: 100%;
        justify-content: space-around;
        display: flex;
        flex-direction: column;
        .icon {
          i {
            padding-right: 6px;
            font-size: 32px;
            color: #a5a5a5;
            // filter: grayscale(100%);
            cursor: pointer;
          }
          i:hover {
            color: #fff;
            // background: #fff;
          }
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
      }
    }
  }
  @media (max-width: 768px) {
    footer {
      .bottom {
        width: 100%;
        height: 300px;
        padding: 10px 80px;
      }
    }
  }

  @media (max-width: 530px) {
    footer {
      .bottom {
        flex: 0;
        height: 100%;
        padding: 20px 30px;
        .right {
          display: none;
        }
        .left {
          .icon {
            i {
              padding-top: 10px;
              font-size: 26px;
            }
          }
        }
      }
    }
  }
</style>
