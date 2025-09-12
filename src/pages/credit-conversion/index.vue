<script setup lang="ts" name="CreditConversion">
import { useCommonStore } from '@/stores/common'
import CreditMoneyInfo from './components/money-info.vue'
import withdraw from '@/assets/images/icons/withdraw.png'

const { userInfo } = storeToRefs(useCommonStore())

const currency = __VITE_CURRENCY

const option1 = [
  { text: '外转内', value: 1 },
  { text: '内转外', value: 2 }
]
const option2 = [
  { text: '可提余额', value: 1 },
  { text: '可用余额', value: 2 }
]

const formData = reactive({
  type: 1,
  wallet: 1,
  amount: undefined
})

function onSubmit() {}

const disabled = computed(() => {
  return (formData.amount || 0) <= 0
})
</script>

<template>
  <div class="normal-page">
    <BgTwo router="CreditConversion" />
    <NormalHeader :background="false" title="额度转换" />
    <CreditMoneyInfo
      title="外部商城"
      :value1="userInfo.outside_money"
      :value2="userInfo.outside_frozen_money"
    />
    <div class="normal-card" style="padding: 0; margin: 0 16px 12px">
      <van-dropdown-menu>
        <van-dropdown-item v-model="formData.wallet" :options="option2" />
        <van-dropdown-item v-model="formData.type" :options="option1" />
      </van-dropdown-menu>
    </div>
    <CreditMoneyInfo title="内部商城" :value1="userInfo.money" :value2="userInfo.frozen_money" />

    <van-form @submit="onSubmit" required class="login-form self-form" style="margin: 0 16px">
      <van-field
        v-model="formData.amount"
        name="amount"
        type="number"
        placeholder="请输入金额"
        :rules="[{ required: true, message: '请输入金额' }]"
      >
        <template #left-icon>
          <img :src="withdraw" width="24" height="24" alt="" />
        </template>
      </van-field>
    </van-form>
    <van-sticky :offset-bottom="50" position="bottom">
      <div style="margin-top: 60px; padding: 16px">
        <van-button block round type="primary" :disabled="disabled" native-type="submit">
          转换
        </van-button>
      </div>
    </van-sticky>
  </div>
</template>

<style lang="scss" scoped></style>
