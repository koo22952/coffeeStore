<template>
  <div>
    <div class="member">
      <div class="member_body">
        <div class="member_title">
          <ul>
            <li
              class="singup_title"
              :class="{'active':member_title}"
              @click="member_title=false"
            >註冊會員</li>
            <li
              class="login_title"
              :class="{'active':!member_title}"
              @click="member_title=true"
            >會員登入</li>
          </ul>
        </div>

        <div class="login" v-if="member_title" @submit.prevent="singin">
          <form autocomplete="off">
            <div class="alert alert-danger" v-if="singined">請輸入正確的帳號或密碼</div>
            <div>
              <input
                id="email"
                type="email"
                name="信箱"
                placeholder="信箱"
                v-model="user_singin.Email"
                v-validate="'required|email'"
              >
              <span class="text-danger" style="font-size:14px">{{ errors.first('信箱') }}</span>
            </div>
            <div>
              <input
                id="password"
                type="password"
                name="密碼"
                placeholder="密碼"
                v-model="user_singin.password"
                v-validate="'required'"
              >
              <span class="text-danger" style="font-size:14px">{{ errors.first('密碼') }}</span>
            </div>
            <button type="submit" class="btn btn-btncolor w-100 rounded-0">購物去！</button>
          </form>
        </div>
        <div class="singup" v-else>
          <singin/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import $ from 'jquery'
  import singin from '@/components/singup'
  export default {
    name: 'login',
    components: {
      singin
    },
    data() {
      return {
        member_title: true,
        user_singin: {
          Email: "",
          password: ""
        },
        singined: false,
      }
    },
    methods: {
      singin() {
        let _this = this
        let api = `${process.env.APIPATH}/menber?Email=${_this.user_singin.Email}&password=${_this.user_singin.password}`

        this.$validator.validate().then((result) => {
          if (result) {
            this.$http.get(api).then((response) => {
              if (response.data == 0) {
                //帳號密碼錯誤
                _this.singined = true
              } else {
                _this.$bus.$emit('singin', {
                  singin: true
                })
                localStorage.setItem('userId', response.data[0].id)
                if (response.data[0].id == 1) {
                  _this.$router.push('/admin')
                } else {
                  _this.$router.push('/')
                }
              }
            })
          }
        })
      },
    },

  }
</script>

<style lang='scss' scoped>
  .member {
    margin: 160px 0;
    padding: 10px 30px;
    .member_body {
      width: 600px;
      margin: 0 auto;
      max-width: 100%;
      box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.3);
      // padding: 0px 0;
      overflow: hidden;
      border: 1px solid #c3c3c3;
      .member_title {
        ul {
          display: flex;
          justify-content: center;
          align-items: center;
          .login_title,
          .singup_title {
            font-weight: bolder;
            font-size: 18px;
            list-style-type: none;
            width: 50%;
            text-align: center;
            padding: 25px 0;
            // border-bottom: 1px solid;
          }
          .login_title {
            border-left: 1px solid #c3c3c3;
          }
          .active {
            border-bottom: 1px solid #c3c3c3;
            cursor: pointer;
          }
        }
      }
      .btn {
        margin-top: 20px;
        cursor: pointer;
      }
      .login,
      .singup {
        padding: 30px 10px;
        // border: 1px solid;
        form {
          font-size: 14px;
          padding: 30px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          // align-items: center;

          input {
            // background: none;
            // outline: none;
            // border: 0px;
            width: 100%;
            padding: 0 15px;
            height: 45px;
            margin-top: 20px;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    .member {
      padding: 10px;
      .member_body {
        .login,
        .singup {
          form {
            padding: 30px 10px;
          }
        }
      }
    }
  }
</style>

