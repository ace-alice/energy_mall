<script setup name="HomeHeader" lang="ts">
import { useCommonStore } from '@/stores/common'
import { AppChannelType } from '@/tools/jsBridge/interface'
import { removeLocal } from '@/utils/storage'

const { mediaQueryInfo } = storeToRefs(useCommonStore())

function closeMiniProgram() {
  removeLocal('token')
  window.WebViewJSBridge.callHandler(AppChannelType.closeMiniProgram)
}
</script>

<template>
  <div
    class="home-header"
    :style="{
      '--top-height': `${mediaQueryInfo.top}px`
    }"
  >
    <div class="header-box">
      <van-icon name="arrow-left" size="18" class="arrow-left" @click="closeMiniProgram" />
      <div>Department of Agriculture (DA)</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-header {
  width: 100%;
  padding-top: var(--top-height);
  background-color: white;
  position: sticky;
  z-index: 999; /* 避免被其他内容遮挡 */
  transform: translateZ(0); /* 强制 GPU 合成，防止跟随回弹 */
  top: 0;
  .header-box {
    height: 72px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    font-size: 14px;
    font-weight: 600;
  }
  .arrow-left {
    padding-right: 12px;
  }
}
</style>
