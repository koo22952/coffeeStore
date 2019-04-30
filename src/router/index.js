import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/view/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: "history" ,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'client',
      component: () => import('@/views/client'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home')
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/views/contact')
        },
        {
          path: 'productlist',
          name: 'productlist',
          component: () => import('@/views/productlist')
        },
        {
          path: 'productdetail/:id',
          name: 'productdetail',
          component: () => import('@/views/productdetail')
        },

        {
          path: 'confirm/:id',
          name: 'confirm',
          component: () => import('@/views/confirm')
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('@/views/checkout')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/login')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'productsManager',
          name: 'productsManager',
          component: () => import('@/views/productsManager'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orderManager',
          name: 'orderManager',
          component: () => import('@/views/orderManager'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ],

  //更換頁面回頂端
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
