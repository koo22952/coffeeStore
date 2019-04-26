import Vue from 'vue'

// 直接掛載在Vue的原型下
Vue.prototype.$bus = new Vue()

// 計算購物車裡面內容的長度,並顯示在navbar上
// productlist.vue & productdetail.vue
// _this.$bus.$emit('cartlength', {
//   length: response.data.length
// })

// navbar.vue
// this.$bus.$on('cartlength', event => {
//   _this.cartLength = event.length
// })
//
//
// 讓chockout 知道有做刪除的動作,更新chockout表單內容
// navbar.vue
// _this.$bus.$emit('delitem', {})

// checkout.vue
// this.$bus.$on('delitem', event => {
//    this.getcart();
// })
//
//
// 改變登入登出的狀態
// login.vue & singup.vue
// _this.$bus.$emit('singin', {
//   singin: true
// })

// navbar.vue
// this.$bus.$on('singin', event => {
//   _this.loginStatus = event.singin
// })
