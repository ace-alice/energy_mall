<script setup name="Home" lang="ts">
import HomeHeaderBox from './components/home-header-box.vue'
import BannerBox from './components/banner-box.vue'
import ComIntroduceBox from './components/com-introduce.vue'
import ComVideoBox from './components/com-video.vue'
import NewsListBox from './components/news-list.vue'
</script>

<template>
  <div class="normal-page">
    <BgTwo router="HomeVip" />
    <HomeHeader>
      <template #box>
        <HomeHeaderBox />
      </template>
    </HomeHeader>
    <div style="padding: 0 16px">
      <BannerBox />
      <ComIntroduceBox />
      <ComVideoBox />
      <NewsListBox />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-content {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
