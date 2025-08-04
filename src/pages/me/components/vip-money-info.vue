<template>
  <div class="vip-money-info">
    <div class="menu-top">
      <div>
        <img src="" alt="" />
        我的钱包
        <van-icon name="arrow" />
      </div>
      <div>
        <img src="" alt="" />
        商城积分
        <span style="margin: 0 8px; font-weight: 600">{{ userInfo.user_points }}</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="money-box">acasc</div>
  </div>
</template>

<script setup lang="ts" name="VipMoneyInfoBox">
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
.vip-money-info {
  background-color: #222222;
  border-radius: 14px;
  background-size: 100% 100%;
  margin: 16px;
  .menu-top {
    display: flex;
    padding: 12px 16px;
    color: #fff;
    font-size: 12px;
    justify-content: space-between;
    & > div {
      display: flex;
      align-items: center;
    }
  }
  .money-box {
    width: 100%;
    background-color: white;
    border-radius: 12px;
    padding: 12px;
  }
}
</style>
