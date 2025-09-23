<template>
  <div class="money-info">
    <div>
      <div>可提余额({{ currency }})</div>
      <div><VueCountTo :end-val="Number(userInfo.outside_money)" :start-val="moneyStartVal" /></div>
    </div>
    <div>
      <div>可用余额({{ currency }})</div>
      <div>
        <VueCountTo :end-val="Number(userInfo.outside_frozen_money)" :start-val="pointStartVal" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="MoneyInfoBox">
import { useCommonStore } from '@/stores/common'
const { userInfo } = storeToRefs(useCommonStore())

const currency = __VITE_CURRENCY

const moneyStartVal = ref(0)

const pointStartVal = ref(0)

watch(
  () => userInfo.value.outside_money,
  (newVal, oldVal) => {
    moneyStartVal.value = +oldVal
  }
)
watch(
  () => userInfo.value.outside_frozen_money,
  (newVal, oldVal) => {
    pointStartVal.value = +oldVal
  }
)
</script>

<style lang="scss" scoped>
.money-info {
  display: flex;
  align-items: center;
  height: 150px;
  background-image: url('@/assets/images/common/money_bg.png');
  background-size: 100% 100%;
  margin: 0 4px;
  padding: 0 46px;
  padding-bottom: 20px;
  & > div {
    color: #cccccc;
    width: 160px;
    font-size: 12px;
    & > div:nth-child(2) {
      color: #fbc145;
      margin-top: 12px;
      font-size: 18px;
    }
  }
}
</style>
