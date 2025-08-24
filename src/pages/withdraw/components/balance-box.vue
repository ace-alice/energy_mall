<template>
  <div class="money-info">
    <div>
      <div>商城余额(元)</div>
      <div><VueCountTo :end-val="Number(userInfo.money)" :start-val="moneyStartVal" /></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="BalanceBox">
import { useCommonStore } from '@/stores/common'
const { userInfo } = storeToRefs(useCommonStore())

const moneyStartVal = ref(0)

watch(
  () => userInfo.value.money,
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
