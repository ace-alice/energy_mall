<script setup lang="ts" name="BankCard">
import { formatBankCard } from '@/utils/bankList'
const props = defineProps(['item'])
</script>

<template>
  <div class="bank-card">
    <div>{{ item.bank_name }}</div>
    <div>{{ item.bank_branch }}</div>
    <div>{{ formatBankCard(item.bank_account) }}</div>
    <div class="name">{{ item.name }}</div>
  </div>
</template>

<style lang="scss" scoped>
.bank-card {
  background-image: url('@/assets/images/background/bank_item_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  padding: 16px 20px;
  color: #fff;
  font-size: 14px;
  position: relative;
  .name {
    position: absolute;
    font-size: 20px;
    bottom: 20px;
    right: 20px;
  }
  & > div {
    text-align: start;
    &:nth-child(1) {
      font-size: 16px;
    }
    &:nth-child(2) {
      color: #eee;
      margin-top: 8px;
    }
    &:nth-child(3) {
      margin-top: 20px;
    }
  }
}
</style>
