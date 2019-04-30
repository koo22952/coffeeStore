<template>
  <div>
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>

    <div class="container-fluid">
      <div class="checkout_nav">
        <div class="step" href="#">
          <span class="badge line_one active">
            <span class="text">1</span>
          </span>
          <span>購物車</span>
        </div>
        <div class="step">
          <span class="badge">
            <span class="text">2</span>
          </span>
          <span>訂單確認</span>
        </div>
        <div class="step">
          <span class="badge line_thr">
            <span class="text">3</span>
          </span>
          <span>訂單完成</span>
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="col-lg-8 col-md-11">
          <div class="card border-0">
            <div class="card-header d-flex align-items-center py-0" id="headingOne">
              <button
                class="btn btn-link pl-0"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >顯示購物車細節</button>

              <span class="h3 ml-auto m-1">{{cartTotal | currency}}</span>
            </div>

            <div
              id="collapseOne"
              class="collapse"
              aria-labelledby="headingOne"
              data-parent="#headingOne"
            >
              <div class="text-center py-4 mt-3" v-if="!cartList.length">
                <h6 class="display-4">購物車是空的!</h6>
                <img src="../assets/img/shopping-cart.svg" width="100" alt class="mt-3">
              </div>
              <table class="table" v-if="cartList.length">
                <thead>
                  <tr>
                    <th scope="col" width="30px"></th>
                    <th scope="col"></th>
                    <th scope="col">商品名稱</th>
                    <th scope="col" width="56px">數量</th>
                    <th scope="col" class="text-right">小記</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,key) in newCartList" :key="item.id">
                    <th scope="row" class="align-middle">
                      <a href="#" :data-title="item.title" @click.prevent="removeCart(item.id)">
                        <i class="fas fa-trash-alt fa-lg"></i>
                      </a>
                    </th>
                    <th>
                      <img
                        class="align-middle d-md-inline d-none"
                        style="max-width: 100px;"
                        :src="item.imageUrl"
                        alt
                      >
                    </th>
                    <td class="align-middle">{{item.title}}</td>
                    <td class="align-middle text-center">{{item.qty}}</td>
                    <td class="align-middle text-right">{{item.qty*item.price | currency}}</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-right align-bottom">合計</td>
                    <td class="text-right">
                      <strong class="h4">{{cartTotal | currency}}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 class="meg text-center mt-5">訂購人資訊</h3>

          <!-- 輸入表單資料 -->
          <form class="mb-5" @submit.prevent="createdOrder" autocomplete="off">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputName" class="font-weight-bold">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  name="name"
                  placeholder="請輸入姓名"
                  v-model="form.user.name"
                  v-validate="'required'"
                  :class="{'is-invalid':errors.has('name')}"
                >
                <span class="text-danger" style="font-size:14px" v-if="errors.has('name')">姓名必須輸入</span>
              </div>
              <div class="form-group col-md-6">
                <label for="inputphone" class="font-weight-bold">電話</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputphone"
                  placeholder="請輸入電話"
                  name="tel"
                  v-model="form.user.tel"
                  v-validate="{ required: true, regex: /^[09]{2}[0-9]{8}$/ }"
                  :class="{'is-invalid':errors.has('tel')}"
                >
                <span
                  class="text-danger"
                  style="font-size:14px"
                  v-if="errors.has('tel')"
                >請輸入十碼正確手機號碼</span>
              </div>
            </div>
            <div class="form-group">
              <label for="inputEmail" class="font-weight-bold">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail"
                placeholder="請輸入 Email"
                name="email"
                v-model="form.user.email"
                :class="{'is-invalid':errors.has('email')}"
                v-validate="'required|email'"
              >
              <span class="text-danger" style="font-size:14px">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
              <label for="inputAddress" class="font-weight-bold">地址</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                v-model="form.user.address"
                name="address"
                placeholder="台北市信義區市府路1號"
                v-validate="'required'"
                :class="{'is-invalid':errors.has('address')}"
              >
              <span class="text-danger" style="font-size:14px" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>
            <div class="form-group">
              <label for="otherMeg" class="font-weight-bold">特殊需求</label>
              <textarea
                class="form-control"
                id="otherMeg"
                name="message"
                rows="3"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-right">
              <button type="button" class="btn btn-secondary" @click="goback">繼續選購</button>
              <button type="submit" class="btn btn-btncolor" v-if="cartList.length">訂單確認</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'checkout',
    data() {
      return {
        cartList: [],
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          is_paid: false,
          message: '',
          products: [],
        },
        isLoading: false
      }
    },
    computed: {
      //將特價金額取出篩選
      newCartList() {
        let data = this.cartList.map(n => {
          let m = Object.assign({}, n);
          m.price
          if (m.sale_price == undefined || m.sale_price == "") {
            m.sale_price = m.origin_price
          }
          if (parseInt(m.origin_price) > parseInt(m.sale_price)) {
            m.price = m.sale_price
          } else {
            m.price = m.origin_price
          }
          return m
        })
        return data
      },
      //計算總額
      cartTotal() {
        let tt = Array.from(this.newCartList).reduce((total, a) => {
          return total + parseInt(a.price, 10)
        }, 0)
        return tt
      }
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
      getcart() {
        const _this = this
        const api = `${process.env.APIPATH}/cart`
        _this.isLoading = true

        _this.$http.get(api).then((response) => {
          _this.cartList = response.data
          _this.isLoading = false
        })
      },
      //刪掉單一項目
      removeCart(id) {
        const _this = this
        const api = `${process.env.APIPATH}/cart/${id}`

        _this.isLoading = true
        _this.$http.delete(api).then((response) => {
          _this.getcart()
          _this.isLoading = false
          setTimeout(() => {
            _this.$bus.$emit('cartlength', {
              length: -1
            })
          }, 1000)
        })
      },
      createdOrder() {
        const _this = this
        const api = `${process.env.APIPATH}/customerorder`
        const timestamp = Math.floor(new Date() / 1000);
        let data = _this.form
        data.create_at = timestamp
        data.total = _this.cartTotal
        data.products = _this.cartList
        // data.menber
        this.$validator.validate().then((result) => {
          if (result) {
            _this.isLoading = true
            _this.$http.post(api, data).then((response) => {
              _this.$router.push(`/confirm/${response.data.id}`)
              _this.$bus.$emit('fakecartlength', {})
              _this.isLoading = false
            })
          } else {
            // console.log('欄位不完整')
          }
        })
      },
    },
    created() {
      this.getcart()
      // 接收到cart有做更新的動作,在這邊更新表單內容
      this.$bus.$on('delitem', event => {
        this.getcart();
      })
    },
    beforeDestroy() {
      // [銷毀監聽事件]
      // 最好在组件銷毀前，清除 cartlength 所有監聽 
      // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
      this.$bus.$off('delitem');
    }
  }
</script>

<style lang='scss' scoped>
  .container-fluid {
    margin-top: 200px;
  }
  .btn-link {
    width: 100%;
    padding: 15px;
    text-align: left;
    text-decoration: none;
    color: #2d2c2a;
    cursor: pointer;
  }
  .btn-link:hover {
    color: #b83152;
  }
  #headingOne {
    border: 2px solid black;
  }

  .meg {
    padding: 15px;
    border: 2px solid black;
    margin-bottom: 30px;
    background-color: rgba(0, 0, 0, 0.03);
    // color: #32312f;
  }

  .checkout_nav {
    text-align: center;
    margin: 30px 0;
    width: 100%;
    .step {
      display: inline-block;
      width: 240px;
      max-width: 33%;
      margin-left: -5px;
      margin-right: -5px;
      // text-decoration: none;
      // color: black;
      .badge {
        display: flex;
        position: relative;
        background-color: transparent;
        height: 50px;
        line-height: 50px;
        padding: 0;
        justify-content: center;
        .text {
          z-index: 1;
          color: #fff;
        }
        &::after {
          content: " ";
          background-color: #cccccc;
          height: 30px;
          width: 30px;
          left: 50%;
          top: 50%;
          position: absolute;
          z-index: 0;
          border-radius: 15px;
          transform: translate(-50%, -50%);
        }
        &::before {
          content: " ";
          background-color: #cccccc;
          height: 2px;
          width: 100%;
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -1px;
          z-index: 0;
        }
      }
      .line_one {
        &::before {
          left: 50%;
        }
      }
      .line_thr {
        &::before {
          left: -20%;
          width: 75%;
        }
      }

      .active {
        &::after {
          background: #32312f;
        }
      }
    }
  }
</style>

