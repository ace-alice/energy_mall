// 引入 router 实例
import router from '@/router'
import { getLocal } from '@/utils/storage'

const noAuthRoutes = ['Login', 'Register']

// 路由加载前
router.beforeEach(async (to, from, next) => {
  const token = getLocal('token')
  if (!(to.meta?.noAuth || false) && !token) {
    next(`/login`)
  } else if (noAuthRoutes.includes(to.name?.toString() || '') && token) {
    next('/home')
  } else {
    next()
  }
})

// 路由加载后
router.afterEach(async (_, from) => {
  //
})
