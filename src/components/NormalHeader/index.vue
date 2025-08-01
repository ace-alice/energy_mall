<script setup name="NormalHeader" lang="ts">
const {
  title,
  showBack = true,
  background = true
} = defineProps<{
  title?: string
  showBack?: boolean
  background?: boolean
}>()

import { useCommonStore } from '@/stores/common'
import { useSlots } from 'vue'
import backIcon from '@/assets/images/icons/back_icon.png'

const { mediaQueryInfo } = storeToRefs(useCommonStore())
const slots = useSlots()

const router = useRouter()

function goBack() {
  if (window.history.state?.back) {
    router.back()
  } else {
    router.replace({ name: 'Home' })
  }
}
</script>

<template>
  <div
    class="normal-header"
    :class="{ 'no-background': background }"
    :style="{
      '--top-height': `${mediaQueryInfo.top}px`
    }"
  >
    <div class="header-box">
      <!-- <van-icon v-if="showBack" name="arrow-left" size="18" class="arrow-left" @click="goBack" /> -->
      <van-image
        v-if="showBack"
        name="arrow-left"
        width="18"
        height="18"
        :src="backIcon"
        @click="goBack"
      />
      <div v-else style="width: 30px; height: 1px"></div>
      <div class="title">{{ title }}</div>
      <slot name="right">
        <div v-if="!slots.right" style="width: 30px; height: 1px"></div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-background {
  background-color: transparent !important;
}

.normal-header {
  width: 100%;
  padding-top: var(--top-height);
  background-color: white;
  position: sticky;
  z-index: 999;
  /* 避免被其他内容遮挡 */
  transform: translateZ(0);
  /* 强制 GPU 合成，防止跟随回弹 */
  top: 0;

  .header-box {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 600;
    box-sizing: border-box;
  }

  .arrow-left {
    padding-right: 12px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
