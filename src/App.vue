<script setup lang="ts" name="App">
import { RouterView, useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { AppChannelType, ChannelType } from './tools/jsBridge/interface'
import { useCommonStore } from '@/stores/common'
import { removeLocal, setLocal } from './utils/storage'
const counterStore = useCounterStore()
const commonStore = useCommonStore()
counterStore.$persist()

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  commonStore.initMediaQuery()
  if (import.meta.env.MODE !== 'dev') {
    removeLocal('token')
  }
  window.WebViewJSBridge.registerHandler(
    ChannelType.routeBack,
    function (data: any, success: Function, fail: Function) {
      if (router.currentRoute.value.name == 'Home') {
        removeLocal('token')
        window.WebViewJSBridge.callHandler(AppChannelType.closeMiniProgram)
      } else {
        router.go(-1)
      }
      success('changeBiometricView : success response from javascript')
      fail('changeBiometricView : response from javascript fail')
    }
  )
  // 应用启动时重置位置选择
  commonStore.resetLocationSelection()
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
</style>
