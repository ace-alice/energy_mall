<script setup name="Home" lang="ts">
import HomeHeader from './components/home_header.vue'
import GuideRegister from './components/guide_register.vue'
</script>

<template>
  <div class="normal-page">
    <NormalHeader title="Home" />
    <div class="home-content">
      <GuideRegister />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-content {
  width: 100%;
  padding: 20px 16px;
  box-sizing: border-box;
}

.enter-box {
  display: flex;
  justify-items: center;
}
</style>
