<template>
  <div class="money-info">
    <div>
      <div>商城余额(元)</div>
      <div><VueCountTo :end-val="Number(userInfo.money)" :start-val="moneyStartVal" /></div>
    </div>
    <div>
      <div>商城积分</div>
      <div><VueCountTo :end-val="Number(userInfo.user_points)" :start-val="pointStartVal" /></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="MoneyInfoBox">
import { useCommonStore } from '@/stores/common'
const { userInfo } = storeToRefs(useCommonStore())

const moneyStartVal = ref(0)

const pointStartVal = ref(0)

watch(
  () => userInfo.value.money,
  (newVal, oldVal) => {
    moneyStartVal.value = +oldVal
  }
)
watch(
  () => userInfo.value.user_points,
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
