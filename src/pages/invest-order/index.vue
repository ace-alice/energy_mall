<script setup name="InvestOrder" lang="ts">
import { useCommonStore } from '@/stores/common'
import ProjectListBox from './components/project-list.vue'
import investOrderBg from '@/assets/images/background/invest_order_bg.png'

const { userDetail, mediaQueryInfo } = storeToRefs(useCommonStore())
const activeId = ref(0)
const router = useRouter()

const tabs = [
  { text: '全部', type: '' },
  { text: '进行中', type: '0' },
  { text: '已完成', type: '1' },
  { text: '代派本金', type: '2' }
]
const active = ref(0)
</script>

<template>
  <div class="normal-page">
    <BgTwo :imgSrc="investOrderBg" router="InvestOrderVip" />
    <HomeHeader :imgSrc="investOrderBg">
      <template #box>
        <div class="header-title">我的投资</div>
        <div class="header-box">
          <div class="box-item">
            <div>待收本金(USDT)</div>
            <div><VueCountTo :end-val="Number(userDetail.invest_not_finish || 0)" /></div>
          </div>
          <div class="box-item">
            <div>待收利息(USDT)</div>
            <div><VueCountTo :end-val="Number(userDetail.invest_not_earn || 0)" /></div>
          </div>
        </div>
      </template>
    </HomeHeader>
    <van-tabs
      class="team-tabs"
      sticky
      v-model:active="active"
      swipeable
      color="#27B6AD"
      title-active-color="#333333"
      title-inactive-color="#333333"
      :offset-top="181 + mediaQueryInfo.top"
    >
      <van-tab v-for="tab in tabs" :title="tab.text"><ProjectListBox :type="tab.type" /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.box-item {
  width: calc(50% - 16px);
  padding-left: 40px;
  color: #5e0000;
  & > div:nth-child(1) {
    font-size: 14px;
  }
  & > div:nth-child(2) {
    margin-top: 12px;
    font-size: 24px;
  }
}
.header-box {
  display: flex;
  background-image: url('@/assets/images/background/invest_order_card.png');
  background-size: 100% 100%;
  height: 120px;
  width: 100%;
  padding: 24px 16px;
}
.header-title {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: #fff;
}
</style>
