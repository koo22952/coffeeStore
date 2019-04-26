<template>
  <div>
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>
    <div class="container">
      <div class="contact_title text-center py-1 mb-5">
        <h3>聯絡我們</h3>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-9 col-12">
          <div class="row">
            <div class="col-md-6 ml-md-5">
              <div class="font-weight-lighter">
                <h5 class="pb-4">注意事項</h5>
                <p class="pb-1">請填寫以下表格。</p>
                <p class="pb-1">有任何寶貴意見都可以填入以下表格與我們聯繫</p>
                <p class="pb-1">您所填寫的內容僅用於與我們連繫，我們將不會透露第三方人士所使用。</p>
                <p class="pb-1">感謝您寶貴意見，我們將派專員稍後與您聯繫。</p>
              </div>
            </div>
            <div class="col mt-5 mt-md-0">
              <div class="font-weight-lighter">
                <h5 class="pb-4">電話連絡</h5>
                <p>請隨時與我們聯繫。</p>
                <div class="d-md-block d-flex align-items-sm-center flex-column flex-sm-row">
                  <p class="h3 font-weight-bold pt-3">0988-088888</p>
                  <p class="pl-md-5 pt-md-0 pt-3">（平日 9時30分～18時00分）</p>
                </div>
              </div>
            </div>
          </div>
          <hr class="w-100" style="margin:60px 0px 90px 0px;">
          <form class="mx-md-5 mb-5" @submit.prevent="contactMeg" autocomplete="off">
            <div class="form-group row">
              <label for="inputfeedback" class="col-md-3 col-form-label font-weight-bold">
                訊息回饋
                <span class="text-danger">*</span>
              </label>
              <div class="col-md-9">
                <textarea
                  type="text"
                  class="form-control"
                  id="inputfeedback"
                  rows="5"
                  v-validate="'required'"
                  v-model="form.meg"
                  name="text"
                  :class="{'is-invalid':errors.has('text')}"
                ></textarea>
                <span class="text-danger" style="font-size:14px" v-if="errors.has('text')">請留下您的寶貴意見</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputname" class="col-md-3 col-form-label font-weight-bold">
                姓名
                <span class="text-danger">*</span>
              </label>
              <div class="col-md-9">
                <input
                  type="text"
                  class="form-control"
                  id="inputname"
                  name="name"
                  v-model="form.name"
                  v-validate="'required'"
                  :class="{'is-invalid':errors.has('name')}"
                >
                <span class="text-danger" style="font-size:14px" v-if="errors.has('name')">姓名必須輸入</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputphone" class="col-md-3 col-form-label font-weight-bold">電話</label>
              <div class="col-md-9">
                <input
                  type="text"
                  v-model="form.tel"
                  class="form-control"
                  id="inputphone"
                  name="tel"
                >
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail" class="col-md-3 col-form-label font-weight-bold">
                Email
                <span class="text-danger">*</span>
              </label>
              <div class="col-md-9">
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail"
                  name="email"
                  v-model="form.email"
                  :class="{'is-invalid':errors.has('email')}"
                  v-validate="'required|email'"
                >
                <span class="text-danger" style="font-size:14px">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-9 offset-md-3 offset-0">
                <button class="btn btn-btncolor w-100" type="submit">送出</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'contact',
    data() {
      return {
        isLoading: true,
        form: {
          name: '',
          tel: '',
          meg: '',
          email: ''
        }
      }
    },
    methods: {
      stopLoading() {
        setTimeout(() => {
          this.isLoading = false
        }, 800)
      },
      contactMeg() {
        const _this = this
        this.$validator.validate().then((result) => {
          if (result) {
            // do stuff if not valid.
            console.log('發送成功')
            _this.form = {}

          } else {
            console.log('欄位不完整')
          }
        })
      },
    },
    mounted() {
      this.stopLoading()
    }
  }
</script>

<style lang='scss' scoped>
  .container {
    margin-top: 200px;
  }

  .contact_title {
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
  }
</style>
