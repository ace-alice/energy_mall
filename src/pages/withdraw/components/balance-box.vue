<template>
  <div class="money-info">
    <div>
      <div>可提余额(元)</div>
      <div><VueCountTo :end-val="Number(userInfo.outside_money)" :start-val="moneyStartVal" /></div>
    </div>
    <div>
      <div>可用余额(元)</div>
      <div>
        <VueCountTo :end-val="Number(userInfo.outside_frozen_money)" :start-val="0" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="BalanceBox">
import { useCommonStore } from '@/stores/common'
const { userInfo } = storeToRefs(useCommonStore())

const moneyStartVal = ref(0)

watch(
  () => userInfo.value.outside_money,
  (newVal, oldVal) => {
    moneyStartVal.value = +oldVal
  }
)
</script>

<style lang="scss" scoped>
.money-info {
  display: flex;
  align-items: center;
  height: 120px;
  background-image: url('@/assets/images/background/recharge_bg.png');
  background-size: 100% 100%;
  margin: 0 16px;
  padding: 0 40px;
  & > div {
    color: #ffffff99;
    width: 160px;
    font-size: 16px;
    & > div:nth-child(2) {
      color: #fff;
      margin-top: 12px;
      font-size: 28px;
    }
  }
}
</style>
