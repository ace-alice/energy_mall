<template>
  <teleport to="#app">
    <img class="normal-bg" :src="bgOne" alt="" />
  </teleport>
</template>

<script name="BgTwo" setup lang="ts">
import bgOne from '@/assets/images/background/bg-2.png'
</script>

<style lang="scss" scoped>
.normal-bg {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
