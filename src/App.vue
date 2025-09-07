<script setup lang="ts" name="App">
import { RouterView, useRouter } from 'vue-router'
import { AppChannelType, ChannelType } from './tools/jsBridge/interface'
import { useCommonStore } from '@/stores/common'
import home_se from '@/assets/images/tabs/home_se.png'
import home_un from '@/assets/images/tabs/home_un.png'
import shopping_un from '@/assets/images/tabs/shopping_un.png'
import shopping_se from '@/assets/images/tabs/shopping_se.png'
import service_un from '@/assets/images/tabs/service_un.png'
import me_un from '@/assets/images/tabs/me_un.png'
import me_se from '@/assets/images/tabs/me_se.png'
import team_un from '@/assets/images/tabs/team_un.png'
import team_se from '@/assets/images/tabs/team_se.png'
import order_un from '@/assets/images/tabs/order_un.png'
import dayjs from 'dayjs'
import { useShopCartStore } from './stores/shopCart'

const commonStore = useCommonStore()
const shopCartStore = useShopCartStore()
commonStore.$persist()
shopCartStore.$persist()

const router = useRouter()
const route = useRoute()

const active = ref(0)

const { token, isVip, vipExpiredDate } = storeToRefs(useCommonStore())

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  // 触发刷新/关闭前逻辑
  console.log('⛔ 页面即将刷新或关闭')

  if (isVip.value) {
    vipExpiredDate.value = dayjs().unix() + 30
  }

  window.removeEventListener('beforeunload', handleBeforeUnload)

  // 如果你想提示用户（不推荐用于自动保存）
  event.preventDefault()
  event.returnValue = '' // Chrome 要设置这个才有效
}

const timer = ref<NodeJS.Timeout | null>(null)

watch(
  () => token.value,
  (newVal) => {
    if (newVal) {
      commonStore.getGroupClasses()
      commonStore.getInvestClasses()
      commonStore.getPointsClasses()
      if (!timer.value) {
        timer.value = setTimeout(() => {
          commonStore.getAddressList()
          commonStore.getUserDetail()
        }, 1000)
      }
    } else {
      timer.value && clearTimeout(timer.value)
      timer.value = null
    }
  },
  {
    immediate: true
  }
)

onUnmounted(() => {
  timer.value && clearTimeout(timer.value)
  timer.value = null
})

onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  commonStore.initMediaQuery()
  window.WebViewJSBridge.registerHandler(
    ChannelType.routeBack,
    function (data: any, success: Function, fail: Function) {
      if (router.currentRoute.value.name?.toString().includes('Home')) {
        window.WebViewJSBridge.callHandler(AppChannelType.closeMiniProgram)
      } else {
        router.go(-1)
      }
      success('changeBiometricView : success response from javascript')
      fail('changeBiometricView : response from javascript fail')
    }
  )
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive
        :exclude="['Recharge', 'UsdtAdd', 'BankAdd', 'Withdraw', 'Transfer', 'ArticleDetail']"
      >
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
  <van-tabbar
    v-if="
      [
        'HomeVip',
        'HomeNormal',
        'MeNormal',
        'Shopping',
        'MeVip',
        'TeamVip',
        'InvestVip',
        'InvestOrderVip'
      ].includes((router.currentRoute?.value.name as any) || '')
    "
    v-model="active"
    active-color="#000"
    route
    safe-area-inset-bottom
    class="van-tabbar-index"
    z-index="10"
  >
    <van-tabbar-item to="/home-normal" v-if="!isVip">
      <span>首页</span>
      <template #icon="props">
        <img :src="home_se" v-show="props.active" />
        <img :src="home_un" v-show="!props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/home-vip" v-if="isVip">
      <span>首页</span>
      <template #icon="props">
        <img :src="home_se" v-show="props.active" />
        <img :src="home_un" v-show="!props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/shopping" v-if="!isVip">
      <span>购物车</span>
      <template #icon="props">
        <img :src="shopping_se" v-show="props.active" />
        <img :src="shopping_un" v-show="!props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/invest-order" v-if="isVip">
      <span>我的订单</span>
      <template #icon="props">
        <img :src="shopping_se" v-show="props.active" />
        <img :src="order_un" v-show="!props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/invest" v-if="isVip">
      <span>Iberdrola</span>
      <template #icon="props">
        <div class="iberdrola">
          <div></div>
        </div>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/service" v-if="!isVip">
      <span>客服</span>
      <template #icon="props">
        <img :src="service_un" v-show="props.active" />
        <img :src="service_un" v-show="!props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/team-vip" v-if="isVip">
      <span>团队</span>
      <template #icon="props">
        <img :src="team_se" v-show="props.active" />
        <img :src="team_un" v-show="!props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/me-normal" v-if="!isVip">
      <span>我的</span>
      <template #icon="props">
        <img :src="me_se" v-show="props.active" />
        <img :src="me_un" v-show="!props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/me-vip" v-if="isVip">
      <span>我的</span>
      <template #icon="props">
        <img :src="me_se" v-show="props.active" />
        <img :src="me_un" v-show="!props.active" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss">
.iberdrola {
  position: relative;
  height: 20px;
  width: 20px;
  overflow: visible;
  & > div {
    position: absolute;
    height: 48px;
    width: 48px;
    border: 3px solid white;
    border-radius: 50%;
    top: -28px;
    left: -14px;
    z-index: 10;
    background-color: rgb(255, 136, 0);
    background-image: url('@/assets/images/icons/iberdrola.png');
    background-size: 100% 100%;
  }
}
.fade-enter-from,
.fade-leave-to {
  /*定义进入开始和离开结束的透明度为0*/
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(-20px);
}

.fade-enter-to {
  transform: translateX(0px);
}

.fade-enter-to,
.fade-leave-from {
  /*定义进入结束和离开开始的透明度为1*/
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.2s ease-out;
}
.van-tabbar-index {
  position: absolute !important;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
</style>
