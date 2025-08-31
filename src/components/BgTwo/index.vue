<template>
  <teleport to="#app">
    <div
      :style="{
        '--height': height,
        '--bg-color': bgColor,
        width: '100%'
      }"
      v-if="isColor"
      v-show="props.router && props.router == router.currentRoute.value.name"
      class="normal-bg"
    >
      <div style="width: 100%" class="is-color"></div>
    </div>
    <div
      v-else
      :style="{
        '--top': `${mediaQueryInfo.top - 44}px`
      }"
    >
      <img
        class="normal-bg"
        :class="{
          'hidden-tool': hiddenTool
        }"
        v-show="props.router && props.router == router.currentRoute.value.name"
        :src="imgSrc || bgOne"
        :alt="router.currentRoute.value.name?.toString()"
      />
    </div>
  </teleport>
</template>

<script name="BgTwo" setup lang="ts">
import bgOne from '@/assets/images/background/bg-2.png'
import { useCommonStore } from '@/stores/common'

const props = defineProps(['router', 'imgSrc', 'isColor', 'bgColor', 'height', 'hiddenTool'])

const { mediaQueryInfo } = storeToRefs(useCommonStore())

const router = useRouter()
</script>

<style lang="scss" scoped>
.normal-bg {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.is-color {
  height: var(--height);
  background: var(--bg-color);
}
.hidden-tool {
  top: var(--top);
}
</style>
