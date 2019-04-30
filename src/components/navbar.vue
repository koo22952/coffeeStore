<template>
  <div>
    <!-- 讀取的效果 -->
    <loading loader="bars" color="#32312f" :active.sync="isLoading"></loading>

    <div class="nav px-3 position-fixed" :class="{'navmove': scroll}">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-xl-4 col-lg-3 col-md-2 col d-flex justify-content-md-center">
            <h1>
              <router-link class="logo" to="/">品咖啡</router-link>
            </h1>
          </div>
          <div class="menu_header d-md-flex col d-none">
            <ul class="d-flex align-items-center mx-auto">
              <li>
                <router-link to="/">首頁</router-link>
              </li>
              <li>
                <!-- <a href="#" @click.prevent='goTo'>關於我們</a> -->
              </li>
              <li>
                <router-link to="/productlist">商品介紹</router-link>
              </li>
              <li>
                <router-link to="/contact">聯絡我們</router-link>
              </li>

              <!-- ------ -->

              <li>
                <router-link to="/admin/productsManager" v-if="userId=='1'">管理後台</router-link>
              </li>
              <!-- <li>
                <router-link to="/productdetail">productdetail</router-link>
              </li>
              <li>
                <router-link to="/checkout">checkout</router-link>
              </li>
              <li>
                <router-link to="/confirm">confirm</router-link>
              </li>-->
            </ul>
          </div>
          <div class="col-lg-3 col-md-2 col-1 offset-xl-1 offset-0 d-flex justify-content-center">
            <ul class="header_icon d-flex align-items-center">
              <li>
                <router-link to="/login">
                  <i class="fas fa-user" v-if="!loginStatus"></i>
                </router-link>
                <i class="fas fa-door-open" v-if="loginStatus" @click="signout"></i>
              </li>
              <li class="position-relative">
                <i data-toggle="modal" data-target="#cartModal" class="fas fa-shopping-cart fa-lg"></i>

                <span
                  class="badge badge-danger rounded-circle position-absolute"
                  style="top:-5px;right:-2px"
                  v-if="cartLength"
                >{{cartLength}}</span>
              </li>
            </ul>
          </div>

          <!-- 漢堡選單 -->
          <div class="three col-1 ml-sm-3 ml-4 d-md-none d-block">
            <div
              class="hamburger"
              @click="hamburger"
              :class="{'is-active':hamactive}"
              id="hamburger"
            >
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
            </div>
          </div>
          <!-- 漢堡選單內容 -->
          <div class="nav_drawer" :class="{'nav_drawer_active':hamactive}">
            <ul class="nav_drawer_menu">
              <li @click="touchLink">
                <router-link class="nav_drawer_itme" to="/">首頁</router-link>
              </li>
              <!-- <li @click="touchLink">
                <a href="#" class="nav_drawer_itme">關於我們</a>
              </li>-->
              <li @click="touchLink">
                <router-link class="nav_drawer_itme" to="/productlist">商品介紹</router-link>
              </li>
              <li @click="touchLink">
                <router-link class="nav_drawer_itme" to="/contact">聯絡我們</router-link>
              </li>
              <li @click="touchLink">
                <router-link
                  class="nav_drawer_itme"
                  to="/admin/productsManager"
                  v-if="userId=='1'"
                >管理後台</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cartModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
        <div class="modal-content p-3">
          <div class="modal-header text-center position-relative">
            <h3 class="modal-title w-100" id="cartModalTitle">
              購物車
              <i class="fas fa-spinner fa-spin" v-if="isLoadingDel"></i>
            </h3>
            <button
              type="button"
              class="close position-absolute"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="bg-light text-center py-4" v-if="!cartList.length">
              <h6 class="display-4">購物車是空的!</h6>
              <img src="../assets/img/shopping-cart.svg" width="100" alt class="mt-3">
            </div>

            <div
              class="row my-2 pb-3 border-bottom"
              v-for="(item,key) in newCartList"
              :key="item.id"
            >
              <div class="col-2">
                <img class="align-middle" style="max-width: 70px;" :src="item.imageUrl">
              </div>
              <div class="col">
                <div class="row ml-1 d-flex flex-column justify-content-center">
                  <div class="col mt-1">
                    <p class="font-weight-light">{{item.title}}</p>
                  </div>
                  <div class="col mt-3 d-flex justify-content-between">
                    <div class="font-weight-bold" style="font-size:18px">
                      <p>{{item.qty}} x {{item.price | currency}}</p>
                    </div>
                    <!-- <div>
                      <p>小記：330</p>
                    </div>-->
                  </div>
                </div>
              </div>
              <div class="col-1 d-flex align-items-center justify-content-center">
                <i
                  class="fas fa-trash-alt fa-lg p-1"
                  :class="{'active':isLoadingDel}"
                  @click="removeCart(item.id)"
                ></i>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button
              type="button"
              class="btn btn-btncolor w-100"
              v-model="newCartList"
              v-if="!cartLength"
              @click="closeModal(true)"
            >再逛逛</button>
            <button
              type="button"
              class="btn btn-btncolor w-100"
              v-model="newCartList"
              @click="closeModal(false)"
              v-else
            >結帳去</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { resolve } from 'q';

  export default {
    name: 'navbar',
    data() {
      return {
        scroll: false, //navbar卷軸
        hamactive: false, // 漢堡內容
        loginStatus: false,
        cartList: [],
        cartLength: 0,
        userId: '',
        isLoading: false,
        isLoadingDel: false
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
      }
    },
    methods: {
      // 控制漢堡內容狀態
      hamburger() {
        this.hamactive = !this.hamactive;
      },
      // 點擊漢堡內容的時候會消失
      touchLink() {
        this.hamactive = false;
      },
      //點擊在逛逛或結帳去關閉cartModal
      closeModal(close) {
        if (close) {
          $('#cartModal').modal('hide')
          this.$router.push('/productlist')
        } else {
          $('#cartModal').modal('hide')
          this.$router.push('/checkout')
        }
      },
      //點登出的按鈕
      signout() {
        localStorage.setItem('userId', '')
        this.loginStatus = false
        this.userId = ''
      },
      getcart(item) {
        const _this = this
        const api = `${process.env.APIPATH}/cart`

        _this.$http.get(api).then((response) => {
          // console.log(response.data)
          if (item) {
            _this.cartList = response.data
          } else {
            _this.cartLength = response.data.length
            _this.cartList = response.data
          }
        })
      },
      removeCart(id) {
        const _this = this
        const api = `${process.env.APIPATH}/cart/${id}`
        if (!_this.isLoadingDel) {
          _this.isLoadingDel = true
          _this.$http.delete(api).then((response) => {
            _this.getcart()
            // 讓chockout 知道有做刪除的動作
            _this.$bus.$emit('delitem', {})
            // _this.cartLength--
            setTimeout(() => {
              _this.isLoadingDel = false
            }, 500)

          })
        }
      }
    },
    mounted() {
      // 捲軸滾動監聽
      let _this = this
      window.addEventListener('scroll', () => {
        let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
        if (top <= 80 || top < 0) {
          _this.scroll = false;
        } else {
          _this.scroll = true;
        }
      })

    },
    created() {
      const _this = this
      let userId = localStorage.getItem('userId')
      _this.userId = userId

      if (userId == null || userId == '') {
        _this.loginStatus = false
      } else {
        _this.loginStatus = true
      }

      this.getcart();

      this.$bus.$on('cartlength', event => {
        _this.cartLength += event.length
        _this.getcart(true)
      })
      this.$bus.$on('fakecartlength', event => {
        _this.getcart(true)
        _this.cartLength = false
      })
      this.$bus.$on('singin', event => {
        _this.loginStatus = event.singin
      })
    },
    beforeDestroy() {
      //   // [銷毀監聽事件]
      //   // 最好在组件銷毀前，清除 cartlength 所有監聽 
      //   // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
      this.$bus.$off('cartlength');
      this.$bus.$off('fakecartlength');
      this.$bus.$off('singin')
    }
  }
</script>

<style lang='scss' scoped>
  // navbar樣式調整
  .nav {
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    margin: 0 auto;
    padding: 14px 0;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      transform: scaleY(0);
      transition: all 0.8s cubic-bezier(0.215, 0.6, 0.355, 1);
      transition-delay: 0.1s;
      transform-origin: top;
      background-color: #ececec;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .logo {
      display: block;
      background: url("../assets/img/LOGO.svg");
      width: 78px;
      height: 43px;
      text-indent: -9999px;
      overflow: hidden;
      white-space: nowrap;
      background-position: center content;
      background-repeat: no-repeat;
    }
    .menu_header {
      li {
        list-style-type: none;
      }
      a {
        padding: 0px 12px;
        font-size: 16px;
        font-weight: 700;
        text-decoration: none;
        line-height: 18px;
      }
    }
    .header_icon {
      li {
        list-style-type: none;
      }
      i {
        padding: 14px 10px;
        font-size: 18px;
        font-weight: 700;
        text-decoration: none;
        line-height: 18px;
        cursor: pointer;
      }
    }
  }

  .close {
    outline: none;
    &:hover {
      transform: scale(1.2);
    }
  }

  i:hover {
    color: #9a2945;
  }

  // navbar動態增加CLASS
  .navmove {
    &::before {
      content: "";
      transform: scaleY(1);
    }
  }

  @media (max-width: 768px) {
    .nav {
      &::before {
        transform: scaleY(1);
      }
    }
  }

  //modal
  .close {
    font-size: 18px;
    top: 10px;
    right: 10px;
  }

  .fa-trash-alt {
    cursor: pointer;
  }

  //在移除購物車時垃圾桶得狀態
  .active {
    cursor: wait;
    color: lightgrey;
    &:hover {
      color: lightgrey;
    }
  }

  // 漢堡選單

  .row .three {
    z-index: 5000;
    padding: 5px 5px 5px 10px;
    box-sizing: border-box;
    // background-color: #2c3e50;
    color: #9a2945;
    text-align: center;
  }

  .hamburger .line {
    width: 25px;
    height: 2px;
    background-color: #32312f;
    display: block;
    margin: 8px auto;
    transition: all 0.3s ease-in-out;
  }

  .hamburger:hover {
    cursor: pointer;
  }

  #hamburger.is-active .line:nth-child(2) {
    opacity: 0;
    background-color: #ececec;
  }

  #hamburger.is-active .line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
    background-color: #ececec;
  }

  #hamburger.is-active .line:nth-child(3) {
    transform: translateY(-13px) rotate(-45deg);
    background-color: #ececec;
  }

  // 漢堡內容
  .nav_drawer {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -99999;
    right: -500%;
    top: 0;
    transition: right 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    // transition: all 0.2s;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      background-color: #32312f;
      //  #32312f;
      width: 100%;
      height: 100%;
    }
    .nav_drawer_menu {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.5s;
      li {
        list-style-type: none;
        a:hover {
          transform: scale(1.2);
          // text-shadow: 0px 6px 15px white;
        }
      }
      .nav_drawer_itme {
        text-decoration: none;
        text-align: center;
        font-size: 24px;
        height: 70px;
        line-height: 70px;
        width: 100%;
        height: 100%;
        display: block;
        color: #fff;
      }
    }
  }
  .nav_drawer_active {
    right: 0%;
    z-index: 2000;
  }
</style>




