<script setup name="HomeHeader" lang="ts">
import { useCommonStore } from '@/stores/common'
import bg02 from '@/assets/images/background/bg-2.png'

const { mediaQueryInfo } = storeToRefs(useCommonStore())

const isFixed = ref(false)

const slots = useSlots()

const props = defineProps(['imgSrc'])
</script>

<template>
  <van-sticky :offset-top="0" @change="(fixed) => (isFixed = fixed)">
    <div></div>
  </van-sticky>
  <div
    class="home-header"
    :class="{ 'is-fixed': isFixed }"
    :style="{
      '--top-height': `${mediaQueryInfo.top}px`,
      backgroundImage: isFixed ? `url(${props.imgSrc || bg02})` : 'unset'
    }"
  >
    <slot name="box">
      <div v-if="!slots.box" style="width: 30px; height: 1px"></div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.is-fixed {
  background-color: var(--main-bg-color);
  // background-image: url('@/assets/images/background/bg-2.png');
  background-size: 100% auto;
}

.home-header {
  width: 100%;
  padding-top: var(--top-height);
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
    padding-left: 16px;
    font-size: 14px;
    font-weight: 600;
  }

  .arrow-left {
    padding-right: 12px;
  }
}
</style>
