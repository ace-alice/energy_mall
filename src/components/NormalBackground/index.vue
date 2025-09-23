<template>
  <teleport to="#app">
    <img
      class="normal-bg"
      v-show="props.router && props.router == router.currentRoute.value.name"
      :src="normalBg"
      alt=""
    />
  </teleport>
</template>

<script name="NormalBackground" setup lang="ts">
import normalBg from '@/assets/images/background/bg_1.png'

const props = defineProps(['router'])

const router = useRouter()
</script>

<style lang="scss" scoped>
.normal-bg {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
