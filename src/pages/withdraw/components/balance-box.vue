<template>
  <div class="money-info">
    <div>
      <div>可提余额({{ currency }})</div>
      <div>
        <VueCountTo
          :end-val="isVip ? Number(userInfo.money) : Number(userInfo.outside_money)"
          :start-val="0"
        />
      </div>
    </div>
    <div>
      <div>可用余额({{ currency }})</div>
      <div>
        <VueCountTo
          :end-val="isVip ? Number(userInfo.frozen_money) : Number(userInfo.outside_frozen_money)"
          :start-val="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="BalanceBox">
import { useCommonStore } from '@/stores/common'

const currency = __VITE_CURRENCY

const notionCurrency = __VITE_NATION_CURRENCY
const { userInfo, isVip } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
.money-info {
  display: flex;
  align-items: center;
  height: 120px;
  background-image: url('@/assets/images/background/recharge_bg.png');
  background-size: 100% 100%;
  margin: 0 16px;
  padding: 0 20px;
  & > div {
    color: #ffffff99;
    width: 170px;
    font-size: 12px;
    & > div:nth-child(2) {
      color: #fff;
      margin-top: 12px;
      font-size: 22px;
    }
  }
}
</style>
