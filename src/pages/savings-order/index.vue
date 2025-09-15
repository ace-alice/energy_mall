<script setup lang="ts" name="GoodOrderList">
import GoodItemList from './components/tab-item-list.vue'

const route = useRoute()

const active = ref(0)

const enterList = [
  { text: '全部', tab: null },
  { text: '转入', tab: 1 },
  { text: '取出', tab: 2 },
  { text: '收益', tab: 3 }
]

onActivated(() => {
  if (route.query.tab) {
    active.value = Number(route.query.tab) + 1
  }
})
</script>

<template>
  <div class="normal-page">
    <BgTwo
      :is-color="true"
      bg-color="linear-gradient( 180deg, #A9F1C6 0%, #FFFFFF 100%)"
      height="160px"
      router="SavingsOrder"
    />
    <NormalHeader title="存钱罐记录" :background="false" bg-color="#A9F1C6" />
    <van-tabs
      v-model:active="active"
      background="transparent"
      sticky
      offset-top="56px"
      animated
      swipeable
      line-height="5px"
      color="#F3B546"
    >
      <van-tab v-for="tab in enterList" :title="tab.text">
        <GoodItemList :status="tab.tab"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.sc {
  background: transparent;
}

:deep(.van-sticky--fixed) {
  .van-tabs__nav {
    background-color: #a9f1c6 !important;
  }
}
</style>
