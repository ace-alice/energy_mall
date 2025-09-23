<script setup lang="ts" name="SavingMoneyInfo">
import { useCommonStore } from '@/stores/common'
const currency = __VITE_CURRENCY
const { userDetail } = storeToRefs(useCommonStore())
</script>

<template>
  <div class="money-info">
    <div class="info-box">
      <div>
        <div>存钱罐金额({{ currency }})</div>
        <div>
          <VueCountTo :end-val="Number(userDetail.yuebao_money)" />
        </div>
      </div>
      <div>
        <div>存钱罐收益({{ currency }})</div>
        <div>
          <VueCountTo :end-val="Number(userDetail.yuebao_earn)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.money-info {
  height: 150px;
  background-image: url('@/assets/images/background/saving_bg.png');
  background-size: 100% 100%;
  margin: 0 4px;
  padding: 12px 16px 0;
  .info-box {
    display: flex;
    align-items: center;
    padding: 30px 30px 0;
    & > div {
      color: #cccccc;
      width: 160px;
      font-size: 14px;
      & > div:nth-child(2) {
        color: #fbc145;
        margin-top: 12px;
        font-size: 24px;
      }
    }
  }
}
</style>
