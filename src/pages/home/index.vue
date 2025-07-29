<script setup name="Home" lang="ts">
import HomeHeader from './components/home_header.vue'
import GuideRegister from './components/guide_register.vue'
import PesteUpdate from './components/peste_update.vue'
import BantayPresyo from './components/bantay_presyo.vue'
import AnnouncementBox from './components/announcement_box.vue'
</script>

<template>
  <div class="home">
    <HomeHeader />
    <div class="home-content">
      <GuideRegister />
      <van-row gutter="12" style="margin-top: 12px">
        <van-col span="12">
          <BantayPresyo />
        </van-col>
        <van-col span="12">
          <PesteUpdate />
        </van-col>
      </van-row>
      <AnnouncementBox />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  // height: 100%;
  // overflow: auto;

  .home-content {
    width: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
  }

  .enter-box {
    display: flex;
    justify-items: center;
  }
}
</style>
