<script setup name="NormalHeader" lang="ts">
const {
  title,
  showBack = true,
  background = true,
  backIconTag = 1,
  textColor = '#222',
  bgColor = '#fff'
} = defineProps<{
  title?: string
  showBack?: boolean
  background?: boolean
  backIconTag?: number
  textColor?: string
  bgColor?: string
}>()

import { useCommonStore } from '@/stores/common'
import { useSlots } from 'vue'
import backIcon from '@/assets/images/icons/back_icon.png'
import backIcon2 from '@/assets/images/icons/back_white_icon.png'

const { mediaQueryInfo } = storeToRefs(useCommonStore())
const slots = useSlots()

const router = useRouter()

const isFixed = ref(false)

function goBack() {
  if (window.history.state?.back) {
    router.back()
  } else {
    router.replace({ name: 'Home' })
  }
}
</script>

<template>
  <van-sticky :offset-top="0" @change="(fixed) => (isFixed = fixed)">
    <div></div>
  </van-sticky>
  <div
    class="normal-header"
    :class="{ 'no-background': isFixed ? false : !background }"
    :style="{
      '--top-height': `${mediaQueryInfo.top}px`,
      '--bg-color': bgColor,
      '--text-color': textColor
    }"
  >
    <div class="header-box">
      <!-- <van-icon v-if="showBack" name="arrow-left" size="18" class="arrow-left" @click="goBack" /> -->
      <van-image
        v-if="showBack"
        name="arrow-left"
        width="18"
        height="18"
        :src="backIconTag == 1 ? backIcon : backIcon2"
        @click="goBack"
      />
      <div v-else style="width: 30px; height: 1px"></div>
      <div class="title">{{ title }}</div>
      <slot name="right">
        <div v-if="!slots.right" style="width: 30px; height: 1px"></div>
      </slot>
    </div>
    <slot name="bottom"> </slot>
  </div>
</template>

<style lang="scss" scoped>
.no-background {
  background-color: transparent !important;
}

.normal-header {
  width: 100%;
  padding-top: var(--top-height);
  background: var(--bg-color);
  color: var(--text-color);
  position: sticky;
  z-index: 999;
  /* 避免被其他内容遮挡 */
  transform: translateZ(0);
  /* 强制 GPU 合成，防止跟随回弹 */
  top: 0;

  .header-box {
    height: 56px;
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
