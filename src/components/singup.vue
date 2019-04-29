  <template>
  <form autocomplete="off" @submit.prevent="singup">
    <input id="name" type="text" name="name" placeholder="用戶名" v-model="user_singup.name">
    <div>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="電郵"
        v-model="user_singup.Email"
        v-validate="'required|email'"
        v-on:focus="myFunctionHere"
      >
      <span class="text-danger" style="font-size:14px">{{ errors.first('email') }}</span>
      <span v-if="singUped" class="text-danger" style="font-size:14px">此帳號已經註冊過</span>
    </div>
    <div>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="密碼"
        v-model="user_singup.password"
        v-validate="'required'"
      >
      <span class="text-danger" style="font-size:14px">{{ errors.first('password') }}</span>
    </div>
    <button type="submit" class="btn btn-btncolor w-100 rounded-0">立即加入！</button>
  </form>
</template>

<script>

  import $ from 'jquery'

  export default {
    name: 'singup',
    data() {
      return {
        user_singup: {
          name: "",
          Email: "",
          password: ""
        },
        singUped: false,
      }
    },
    methods: {
      singup() {
        let _this = this
        let api = `${process.env.APIPATH}/menber`

        this.$validator.validate().then((result) => {
          if (result) {
            _this.$http.get(api).then((response) => {
              let check = response.data.filter(n => {
                return n.Email == _this.user_singup.Email
              })
              if (check.length == 0) {
                _this.$http.post(api, _this.user_singup).then((response) => {
                  localStorage.setItem('userId', response.data.id)
                  _this.$bus.$emit('singin', {
                    singin: true
                  })
                  _this.$router.push('/')
                })
              } else {
                _this.singUped = true
              }
            })
          }
        })
      },
      myFunctionHere() {
        this.singUped = false
      }
    },

  }
</script>

<style lang='scss' scoped>
  .btn {
    margin-top: 20px;
    cursor: pointer;
  }
  .singup {
    padding: 30px 10px;
    form {
      font-size: 14px;
      padding: 30px 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      input {
        width: 100%;
        padding: 0 15px;
        height: 45px;
        margin-top: 20px;
      }
    }
  }
</style>

