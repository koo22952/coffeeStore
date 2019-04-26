// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import VeeValidate, { Validator } from 'vee-validate'
// import VueI18n from 'vue-i18n'
import zhTwValidate from 'vee-validate/dist/locale/zh_TW'

import App from './App'
import router from './router'

import currencyFilter from './filters/currency'
import dateFilter from './filters/date'

import './bus'

Vue.use(VueAxios, axios)

Validator.localize('zh_TW', zhTwValidate)
Vue.use(VeeValidate, {
  locale: 'zh_TW'
})
// events: 'input|blur',

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('dateFilter', dateFilter)

Vue.config.productionTip = false

// axios 解決跨域cookie , 與後端請求的session每次不一樣的問題
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  // i18n,
  el: '#app',
  router,
  render: h => h(App)
  // template: '<router-view/>'
})

router.beforeEach((to, from, next) => {
  // `to` 和 `from` 都是路由对象

  // console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    // 這裡需要驗證 如果在 routes 有設置 meta: { requiresAuth: true },
    // 可以在to裡面找到這個訊息,再裡用此訊息判斷要不要驗證
    // let api = `${process.env.APIPATH}/api/user/check`
    let getAdmin = localStorage.getItem('userId')
    // console.log(getAdmin)
    if (getAdmin !== '1' || getAdmin == null) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
