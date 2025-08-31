<script setup name="Home" lang="ts">
import HomeHeaderBox from './components/home-header-box.vue'
import BannerBox from './components/banner-box.vue'
import ProjectListBox from './components/project-list.vue'
import { useCommonStore } from '@/stores/common'

const { mediaQueryInfo, groupClasses } = storeToRefs(useCommonStore())
const active = ref(0)
</script>

<template>
  <div class="normal-page">
    <BgTwo router="HomeNormal" />
    <HomeHeader>
      <template #box>
        <HomeHeaderBox />
      </template>
    </HomeHeader>
    <div style="padding: 0 16px">
      <BannerBox />
    </div>
    <van-tabs
      class="team-tabs"
      v-model:active="active"
      sticky
      swipeable
      shrink
      color="#27B6AD"
      title-active-color="#333333"
      title-inactive-color="#333333"
      :offset-top="70 + mediaQueryInfo.top"
    >
      <van-tab title="全部"><ProjectListBox type="" /></van-tab>
      <van-tab v-for="tab in groupClasses" :title="tab.title"
        ><ProjectListBox :type="tab.id"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home-content {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}
:deep(.team-tabs) {
  .van-tabs__nav {
    background: var(--main-bg-color);
  }
  .van-sticky--fixed {
    .van-tabs__nav--card {
      border-radius: unset;
      background-color: white;
    }
  }
  .van-tabs__wrap {
    height: 44px;
    .van-tabs__line {
      height: 6px;
      background: linear-gradient(to right, #27b6ad, #f3b546);
    }
  }
}
</style>
