import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // console.log(savedPosition)
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ top: 0 })
        }
      }, 220) // 给页面时间加载并渲染完内容
    })
  },
  routes: [
    { path: '/', name: 'Index', redirect: '/home' },
    {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '@/pages/home/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/shopping',
      name: 'Shopping',
      component: () => import(/* webpackChunkName: "shopcart" */ '@/pages/shopcart/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/me-normal',
      name: 'MeNormal',
      component: () => import(/* webpackChunkName: "me-normal" */ '@/pages/me/index-normal.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/me-vip',
      name: 'MeVip',
      component: () => import(/* webpackChunkName: "me-vip" */ '@/pages/me/index-vip.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/team-vip',
      name: 'TeamVip',
      component: () => import(/* webpackChunkName: "team-vip" */ '@/pages/team/index-vip.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import(/* webpackChunkName: "setting" */ '@/pages/setting/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/service',
      name: 'Service',
      component: () => import(/* webpackChunkName: "service" */ '@/pages/service/index.vue'),
      meta: {
        keepAlive: true,
        noAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/login/index.vue'),
      meta: {
        keepAlive: true,
        noAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "Register" */ '@/pages/register/index.vue'),
      meta: {
        keepAlive: true,
        noAuth: true
      }
    },
    {
      path: '/forget-password',
      name: 'ForgetPassword',
      component: () => import(/* webpackChunkName: "forget" */ '@/pages/forget-password/index.vue'),
      meta: {
        keepAlive: true,
        noAuth: true
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import(/* webpackChunkName: "signin" */ '@/pages/signin/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/home-search',
      name: 'HomeSearch',
      component: () => import(/* webpackChunkName: "search" */ '@/pages/home-search/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/:pathMatch(.*)*', // 捕获所有未匹配的路由
      name: 'unknown',
      redirect: '/index'
    }
  ]
})

export default router
