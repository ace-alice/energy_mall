<script setup lang="ts" name="App">
import { RouterView, useRouter } from 'vue-router'
import { AppChannelType, ChannelType } from './tools/jsBridge/interface'
import { useCommonStore } from '@/stores/common'
import home_se from '@/assets/images/tabs/home_se.png'
import home_un from '@/assets/images/tabs/home_un.png'
import shopping_un from '@/assets/images/tabs/shopping_un.png'
import service_un from '@/assets/images/tabs/service_un.png'
import me_un from '@/assets/images/tabs/me_un.png'
import me_se from '@/assets/images/tabs/me_se.png'

const commonStore = useCommonStore()
commonStore.$persist()

const router = useRouter()
const route = useRoute()

const active = ref(0)

const { token } = storeToRefs(useCommonStore())

onMounted(async () => {
  commonStore.initMediaQuery()
  window.WebViewJSBridge.registerHandler(
    ChannelType.routeBack,
    function (data: any, success: Function, fail: Function) {
      if (router.currentRoute.value.name == 'Home') {
        window.WebViewJSBridge.callHandler(AppChannelType.closeMiniProgram)
      } else {
        router.go(-1)
      }
      success('changeBiometricView : success response from javascript')
      fail('changeBiometricView : response from javascript fail')
    }
  )
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
  <teleport to="#app" v-if="token">
    <van-tabbar
      v-if="
        ['Home', 'MeNormal', 'Shopping', 'MeVip'].includes(
          (router.currentRoute?.value.name as any) || ''
        )
      "
      v-model="active"
      active-color="#000"
      route
      safe-area-inset-bottom
      class="van-tabbar-index"
      z-index="10000"
      :fixed="false"
    >
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="home_se" v-show="props.active" />
          <img :src="home_un" v-show="!props.active" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/shopping">
        <span>购物车</span>
        <template #icon="props">
          <img :src="shopping_un" v-show="props.active" />
          <img :src="shopping_un" v-show="!props.active" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/service">
        <span>客服</span>
        <template #icon="props">
          <img :src="service_un" v-show="props.active" />
          <img :src="service_un" v-show="!props.active" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/team">
        <span>客服</span>
        <template #icon="props">
          <img :src="service_un" v-show="props.active" />
          <img :src="service_un" v-show="!props.active" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/me-normal">
        <span>我的</span>
        <template #icon="props">
          <img :src="me_se" v-show="props.active" />
          <img :src="me_un" v-show="!props.active" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </teleport>
</template>

<style>
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
