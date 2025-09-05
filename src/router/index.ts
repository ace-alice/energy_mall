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
    { path: '/', name: 'Index', redirect: '/home-normal' },
    {
      path: '/home-normal',
      name: 'HomeNormal',
      component: () => import(/* webpackChunkName: "home" */ '@/pages/home/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/home-vip',
      name: 'HomeVip',
      component: () => import(/* webpackChunkName: "home-vip" */ '@/pages/home/index-vip.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/project-detail-normal/:id',
      name: 'ProjectDetailNormal',
      component: () =>
        import(/* webpackChunkName: "project-detail-normal" */ '@/pages/project-detail/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/project-detail-vip',
      name: 'ProjectDetailVip',
      component: () =>
        import(/* webpackChunkName: "project-detail-vip" */ '@/pages/project-detail/index-vip.vue'),
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
      path: '/recharge',
      name: 'Recharge',
      component: () => import(/* webpackChunkName: "recharge" */ '@/pages/recharge/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: () => import(/* webpackChunkName: "transfer" */ '@/pages/transfer/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      component: () => import(/* webpackChunkName: "withdraw" */ '@/pages/withdraw/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/recharge-process',
      name: 'RechargeProcess',
      component: () =>
        import(/* webpackChunkName: "recharge-process" */ '@/pages/recharge-process/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/user-guide',
      name: 'UserGuide',
      component: () => import(/* webpackChunkName: "user-guide" */ '@/pages/user-guide/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/legend/:code',
      name: 'Legend',
      component: () => import(/* webpackChunkName: "legend" */ '@/pages/legend/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/recharge-order-list',
      name: 'RechargeOrderList',
      component: () =>
        import(
          /* webpackChunkName: "recharge-order-list" */ '@/pages/recharge-order-list/index.vue'
        ),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/withdraw-order',
      name: 'WithdrawOrder',
      component: () =>
        import(/* webpackChunkName: "withdraw-record" */ '@/pages/withdraw-order/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/address',
      name: 'Address',
      component: () => import(/* webpackChunkName: "address" */ '@/pages/address/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/address/:type',
      name: 'AddressEditAdd',
      component: () =>
        import(/* webpackChunkName: "address-edit-add" */ '@/pages/address/add-edit.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/good-order-list',
      name: 'GoodOrderList',
      component: () =>
        import(/* webpackChunkName: "good-order-list" */ '@/pages/good-order-list/index.vue'),
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
      path: '/service-reg',
      name: 'ServiceReg',
      component: () =>
        import(/* webpackChunkName: "service-reg" */ '@/pages/service-reg/index.vue'),
      meta: {
        keepAlive: true,
        noAuth: true
      }
    },
    {
      path: '/service-private',
      name: 'ServicePrivate',
      component: () =>
        import(/* webpackChunkName: "service-private" */ '@/pages/service-reg/service-private.vue'),
      meta: {
        keepAlive: true,
        noAuth: true
      }
    },
    {
      path: '/reg-private',
      name: 'RegPrivate',
      component: () =>
        import(/* webpackChunkName: "reg-private" */ '@/pages/service-reg/reg-private.vue'),
      meta: {
        keepAlive: true,
        noAuth: true
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: () => import(/* webpackChunkName: "feedback" */ '@/pages/feedback/index.vue'),
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
      path: '/real',
      name: 'Real',
      component: () => import(/* webpackChunkName: "real" */ '@/pages/real/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/pay-pass',
      name: 'PayPass',
      component: () =>
        import(/* webpackChunkName: "pay-pass" */ '@/pages/change-pay-password/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/signin-history',
      name: 'SigninHistory',
      component: () =>
        import(/* webpackChunkName: "signin-history" */ '@/pages/signin-history/index.vue'),
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
      path: '/bank-list',
      name: 'BankList',
      component: () => import(/* webpackChunkName: "bank" */ '@/pages/bank/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/invite',
      name: 'Invite',
      component: () => import(/* webpackChunkName: "invite" */ '@/pages/invite/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/r-w-e',
      name: 'RechargeWithdrawVip',
      component: () =>
        import(
          /* webpackChunkName: "recharge-withdraw-enter" */ '@/pages/recharge-withdraw-enter/index.vue'
        ),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/bank-add',
      name: 'BankAdd',
      component: () => import(/* webpackChunkName: "bank-add" */ '@/pages/bank/bank-add.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/usdt-add',
      name: 'UsdtAdd',
      component: () => import(/* webpackChunkName: "usdt-add" */ '@/pages/bank/usdt-add.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/invest',
      name: 'InvestVip',
      component: () => import(/* webpackChunkName: "invest" */ '@/pages/invest/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/invest-detail/:id',
      name: 'InvestDetailVip',
      component: () =>
        import(/* webpackChunkName: "invest-detail" */ '@/pages/invest-detail/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/invest-order',
      name: 'InvestOrderVip',
      component: () =>
        import(/* webpackChunkName: "invest-order" */ '@/pages/invest-order/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/com-intro',
      name: 'ComIntro',
      component: () => import(/* webpackChunkName: "com-intro" */ '@/pages/com-intro/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/knowledge',
      name: 'Knowledge',
      component: () => import(/* webpackChunkName: "knowledge" */ '@/pages/knowledge/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/lottery',
      name: 'Lottery',
      component: () => import(/* webpackChunkName: "lottery" */ '@/pages/lottery/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/lottery-history',
      name: 'LotteryHistory',
      component: () =>
        import(/* webpackChunkName: "lottery-history" */ '@/pages/lottery-history/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/article-detail',
      name: 'ArticleDetail',
      component: () =>
        import(/* webpackChunkName: "article-detail" */ '@/pages/article-detail/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/fund-detail/:type',
      name: 'FundDetail',
      component: () =>
        import(/* webpackChunkName: "fund-detail" */ '@/pages/fund-detail/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: () => import(/* webpackChunkName: "wallet" */ '@/pages/wallet/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/points-mall',
      name: 'PointsMall',
      component: () =>
        import(/* webpackChunkName: "points-mall" */ '@/pages/points-mall/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/savings',
      name: 'SavingsVip',
      component: () => import(/* webpackChunkName: "savings" */ '@/pages/savings/index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/:pathMatch(.*)*', // 捕获所有未匹配的路由
      name: 'unknown',
      redirect: '/'
    }
  ]
})

export default router
