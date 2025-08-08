// 引入 router 实例
import router from '@/router'
import { getLocal } from '@/utils/storage'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'

const noAuthRoutes = ['Login', 'Register']

// 路由加载前
router.beforeEach(async (to, from, next) => {
  const token = getLocal('token')
  console.log('to.name?.toString()', to.name?.toString())
  if (!(to.meta?.noAuth || false) && !token) {
    next(`/login`)
  } else if (noAuthRoutes.includes(to.name?.toString() || '') && token) {
    next('/home-normal')
  } else {
    const { isVip } = storeToRefs(useCommonStore())
    if (!isVip.value && to.name?.toString().includes('Vip')) {
      next({ name: 'MeNormal' })
    } else if (isVip.value && to.name?.toString().includes('Normal')) {
      next({ name: 'MeVip' })
    } else {
      next()
    }
  }
})

// 路由加载后
router.afterEach(async (_, from) => {
  //
})
