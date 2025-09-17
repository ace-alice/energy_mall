<template>
  <div class="normal-page">
    <BgTwo :imgSrc="teamBg" router="TeamVip" />
    <HomeHeader :imgSrc="teamBg">
      <template #box>
        <div class="header-box">
          <img :src="homeLogo" height="32" width="140" class="header-log" alt="" />
          <!-- <van-field
            v-model="searchText"
            type="number"
            name="searchText"
            placeholder="输入手机号查询"
            style="height: 44px; padding: 0 16px"
          >
            <template #left-icon>
              <van-icon name="search" />
            </template>
            <template #right-icon>
              <van-button type="success" size="small" style="width: 60px" round>查询</van-button>
            </template>
          </van-field> -->
        </div>
      </template>
    </HomeHeader>
    <div class="team-box">
      <van-tabs
        animated
        style="border-radius: 12px; overflow: hidden"
        type="card"
        background="#E7F8EE"
        color="#fff"
        title-active-color="#13B756"
        title-inactive-color="#999999"
        swipeable
      >
        <van-tab title="二级内概况">
          <WithThreeInfoBox />
        </van-tab>
        <van-tab title="团队概况">
          <TeamOverviewBox />
        </van-tab>
        <!-- <van-tab title="团队佣金">
          <TeamCommissionBox />
        </van-tab> -->
      </van-tabs>
    </div>
    <div style="padding: 0 16px">
      <van-tabs
        class="team-tabs"
        sticky
        swipeable
        type="card"
        color="#13B756"
        title-active-color="#fff"
        title-inactive-color="#13B756"
        :offset-top="52 + mediaQueryInfo.top"
      >
        <van-tab title="直属下级"><TeamList lv="1" /></van-tab>
        <van-tab title="查看二级下层"> <TeamList lv="2" /> </van-tab>
        <!-- <van-tab title="查看三级下层"> <TeamList lv="3" /> </van-tab> -->
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts" name="TeamVip">
import teamBg from '@/assets/images/background/team_bg.png'
import homeLogo from '@/assets/images/common/home_logo.png'
import WithThreeInfoBox from './components/with-three-info.vue'
import TeamCommissionBox from './components/team-commission.vue'
import TeamOverviewBox from './components/team-overview.vue'
import TeamList from './components/team-list.vue'
import { useCommonStore } from '@/stores/common'

const searchText = ref('')

const { mediaQueryInfo } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
:deep(.team-tabs.van-tabs--card) {
  .van-sticky--fixed {
    .van-tabs__nav--card {
      border-radius: unset;
      background-color: #000;
    }
  }

  .van-tabs__nav--card {
    padding: 4px;
  }
  .van-tab--card {
    border: unset;
    border-radius: 18px;
    margin: 0 4px;
    background-color: #e7f8ee;
    height: 36px;
  }
  .van-tabs__wrap {
    height: 44px;
  }
  .van-tabs__nav--card {
    margin: 0;
    border: unset;
    height: 44px;
    border-radius: 22px;
  }
}
:deep(.van-tabs--card) {
  .van-tab--active {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .van-tab--card {
    border: unset;
  }
  .van-tabs__wrap {
    height: 36px;
  }
  .van-tabs__nav--card {
    margin: 0;
    border: unset;
    height: 36px;
  }
}
.header-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px 4px;
  .header-log {
    margin: 8px 0;
  }

  &:deep(.van-field) {
    margin-bottom: 0;
    border-radius: 30px;
    // padding: 0;
    .van-field__right-icon {
      padding: 0;
    }
  }
}
.team-box {
  height: 240px;
  padding: 12px 18px;
  background-image: url('@/assets/images/background/team_box_bg.png');
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .change-item {
    flex-shrink: 0;
  }
}
</style>
