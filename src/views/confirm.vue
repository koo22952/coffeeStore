<template>
  <div>
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>
    <div class="container top">
      <div class="checkout-nav">
        <div class="step" href="#">
          <span class="badge line_one active">
            <span class="text">1</span>
          </span>
          <span>購物車</span>
        </div>
        <div class="step">
          <span class="badge active">
            <span class="text">2</span>
          </span>
          <span>訂單確認</span>
        </div>
        <div class="step">
          <span class="badge line_thr" :class="{'active':order.is_paid}">
            <span class="text">3</span>
          </span>
          <span>訂單完成</span>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-8 col-md-10">
          <table class="table" v-if="!order.is_paid">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">商品名稱</th>
                <th scope="col" width="60px">數量</th>
                <th scope="col" class="text-right">小記</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key) in newProductsList" :key="item.id">
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
                <td colspan="3" class="text-right align-bottom">合計</td>
                <td class="text-right">
                  <strong class="h4">{{Totalprice | currency}}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 感謝購買 -->
          <h3 class="thank" v-if="order.is_paid">Thank you 感謝您的購買</h3>

          <form @submit.prevent="checkpaid">
            <h4 class="text-center p-3">訂單資料</h4>
            <table class="table">
              <tbody>
                <tr>
                  <th width="30%">Email</th>
                  <td>{{user.email}}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{user.name}}</td>
                </tr>
                <tr>
                  <th>電話</th>
                  <td>{{user.tel}}</td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>{{user.address}}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td class="text-danger font-weight-bold" v-if="!order.is_paid">尚未付款</td>
                  <td class="text-success font-weight-bold" v-else>已付款</td>
                </tr>
              </tbody>
            </table>
            <div class="text-center">
              <button class="btn btn-btncolor w-100" v-if="!order.is_paid">確認付款</button>
              <button class="btn btn-btncolor w-100" v-else @click="goto">再去逛逛</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'confirm',
    data() {
      return {
        order: {},
        products: [],
        user: {},
        isLoading: false
      }
    },
    computed: {
      //將特價跟原價的金額決定誰要當計算
      newProductsList() {
        let data = this.products.map(n => {
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
      // 計算總額
      Totalprice() {
        let tt = Array.from(this.newProductsList).reduce((total, a) => {
          return total + parseInt(a.price, 10)
        }, 0)
        return tt
      }
    },
    methods: {
      goto() {
        this.$router.push('/')
      },
      getOrder() {
        const _this = this
        _this.isLoading = true
        let id = this.$route.params.id
        const api = `${process.env.APIPATH}/customerorder/${id}`
        _this.$http.get(api).then((response) => {
          _this.order = response.data
          _this.products = response.data.products
          _this.user = response.data.user
          _this.isLoading = false
        })
      },
      checkpaid() {
        const _this = this
        //確保購物車裡面為空的
        _this.$bus.$emit('fakecartlength', {})
        let id = this.$route.params.id
        const api = `${process.env.APIPATH}/customerorder/${id}`
        const data = {
          is_paid: true
        }
        _this.$http.patch(api, data).then((response) => {
          _this.getOrder()
        })
        $('html, body').animate({
          scrollTop: 0
        }, 600);

      },
      // 刪掉全部購物車資料
      delAllCart() {
        const _this = this
        const api = `${process.env.APIPATH}/cart/`
        _this.$http.get(api).then((response) => {
          response.data.forEach(n => {
            const id = n.id
            const url = `${api}/${id}`
            _this.$http.delete(url).then((response) => {
              console.log('del')
              console.log(response.data)
              _this.$bus.$emit('fakecartlength', {})
            })
          })
          // 因為JSON SERVER 一次只能刪除一筆,所以用forEach讓他遍歷,再將數值傳給購物車
          // var promise = () => {
          //   return new Promise((resolve, reject) => {
          //     response.data.forEach(n => {
          //       const id = n.id
          //       const url = `${api}/${id}`
          //       _this.$http.delete(url).then((response) => {
          //         console.log('del')
          //         _this.$bus.$emit('fakecartlength', {})
          //         resolve()
          //       }).catch(error => {
          //         console.log(error);
          //       })
          //     });
          //   })
          // }
          // promise().then(() => {
          //   _this.$bus.$emit('fakecartlength', {})
          // })
        })
      },
    },
    created() {
      this.getOrder()
      this.delAllCart()
    }
  }
</script>

<style lang='scss' scoped>
  .top {
    margin-top: 200px;
    margin-bottom: 70px;
  }

  .thank {
    text-align: center;
    margin: 100px 0;
  }

  .checkout-nav {
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

