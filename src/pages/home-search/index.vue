<script setup name="Home" lang="ts">
// import HomeHeaderBox from './components/home-header-box.vue'
</script>

<template>
  <div class="normal-page">
    <BgTwo />
    <HomeHeader>
      <template #box>
        <!-- <HomeHeaderBox /> -->
      </template>
    </HomeHeader>
  </div>
</template>

<style lang="scss" scoped>
.home-content {
  width: 100%;
  padding: 20px 16px;
  box-sizing: border-box;
}
</style>
