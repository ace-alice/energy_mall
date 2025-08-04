<template>
  <teleport to="#app">
    <img
      class="normal-bg"
      v-show="props.router && props.router == router.currentRoute.value.name"
      :src="imgSrc || bgOne"
      :alt="router.currentRoute.value.name?.toString()"
    />
  </teleport>
</template>

<script name="BgTwo" setup lang="ts">
import bgOne from '@/assets/images/background/bg-2.png'

const props = defineProps(['router', 'imgSrc'])

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
</style>
