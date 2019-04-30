<template>
  <div>
    <div class="insist">
      <div class="insistTitle">
        <h5>我們的三大堅持</h5>
      </div>
      <p>每日每分每秒每時每刻，只為您著想。</p>
      <div class="insistList">
        <div>
          <div class="img">
            <img src="../assets/img/free-shipping-filled.png" alt>
          </div>
          <div class="content">
            <h6>寄送免運</h6>
            <p>任何地點</p>
            <p>我們都使命必達</p>
          </div>
        </div>
        <div class="listtwo">
          <div class="img">
            <img src="../assets/img/technical-support.png" alt>
          </div>
          <div class="content">
            <h6>售後服務</h6>
            <p>24小時不打烊</p>
            <p>任何時間為您服務</p>
          </div>
        </div>
        <div class="listtwo">
          <div class="img">
            <img src="../assets/img/coffee-beans.png" alt>
          </div>
          <div class="content">
            <h6>品質保證</h6>
            <p>層層把關揀選</p>
            <p>只為呈現最好的</p>
          </div>
        </div>
      </div>
    </div>
    <div class="contactUs">
      <div class="content">
        <h4>隨時與我們聯繫。</h4>
        <p>我們接受問題和諮詢。有任何想法請您隨時聯繫我們。</p>
        <div>
          <a href="#" class="btn" @click.prevent="contact">聯絡我們</a>
        </div>
      </div>
      <contactUs></contactUs>
    </div>
  </div>
</template>

<script>
  import contactUs from '@/components/svg/contactUs_bg'

  export default {
    components: {
      contactUs,
    },
    methods: {
      contact() {
        this.$router.push('contact')
      }
    }
  }

</script>

<style lang='scss' scoped>
  .insist {
    margin: 0px auto;
    max-width: 940px;
    height: auto;
    // height: ;
    // max-height: 500px;
    // width: 100%;
    text-align: center;
    color: #32312f;
    p {
      font-size: 18px;
    }
    .insistTitle {
      color: #2d2c2a;
      margin: 0px auto;
      letter-spacing: 5px;
      padding-bottom: 10px;
      &::after {
        content: "";
        margin-top: 10px;
        margin-bottom: 10px;
        border-bottom: 2.5px solid #32312f;
        display: inline-block;
        width: 50px;
      }
      h5 {
        text-align: center;
        font-size: 24px;
        font-weight: 500;
      }
    }
    .insistList {
      margin: 0px auto;
      margin-top: 30px;
      display: flex;
      justify-content: space-evenly;
      align-content: center;
      width: 70%;
      .img {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;
        padding: 10px;
        img {
          max-width: 100px;
          max-height: 100px;
        }
      }
      .content {
        padding: 10px;
        h6 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }

  .contactUs {
    // min-width: 500px;
    max-width: 800px;
    max-height: 800px;
    margin: 0 auto;
    position: relative;
    .content {
      position: absolute;
      top: 45%;
      left: 50%;
      width: 400px;
      transform: translate(-50%); // z-index: 1;
      h4 {
        font-size: 24px;
        font-weight: 600;
        padding-bottom: 20px;
      }
      p {
        font-size: 16px;
        padding-bottom: 40px;
      }
      div {
        text-align: center;
        .btn {
          min-width: 130px;
          min-height: 40px;
          text-align: center;
          color: #fff;
          border: none;
          background: #b83152;
          font-size: 18px;
          padding: 15px 0;
          border-radius: 40px;
          &:hover {
            // box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
            background: #9a2945;
          }
        }
      }
    }
    svg {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 650px) {
    .contactUs {
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p {
          display: none;
        }
        div {
          .btn {
            font-size: 16px;
            margin-top: 12px;
            padding: 9px 0;
          }
        }
      }
    }
    .insist {
      .insistList {
        justify-content: space-evenly;
        align-content: center;
        width: 100%;
        flex-direction: column;
      }
    }
    .listtwo::before {
      content: "";
      margin: 5px auto;
      width: 50%;
      height: 1px;
      display: block;
      background-color: #d6d6d6;
    }
  }

  @media (max-width: 415px) {
    .contactUs {
      display: none;
    }
  }
</style>