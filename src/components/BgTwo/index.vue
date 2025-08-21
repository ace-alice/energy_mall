<template>
  <teleport to="#app">
    <div
      :style="{
        '--height': height,
        '--bg-color': bgColor,
        width: '100%'
      }"
      v-if="isColor"
      class="normal-bg"
    >
      <div style="width: 100%" class="is-color"></div>
    </div>
    <img
      v-else
      class="normal-bg"
      v-show="props.router && props.router == router.currentRoute.value.name"
      :src="imgSrc || bgOne"
      :alt="router.currentRoute.value.name?.toString()"
    />
  </teleport>
</template>

<script name="BgTwo" setup lang="ts">
import bgOne from '@/assets/images/background/bg-2.png'

const props = defineProps(['router', 'imgSrc', 'isColor', 'bgColor', 'height'])

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
</style>
