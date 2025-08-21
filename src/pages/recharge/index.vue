<template>
  <div class="normal-page">
    <BgTwo router="Recharge" />
    <NormalHeader :background="false" title="充值">
      <template #right>
        <van-button
          plain
          round
          size="small"
          type="success"
          style="background: none"
          @click="router.push({ name: 'RechargeProcess' })"
          >充值流程</van-button
        >
      </template>
    </NormalHeader>
    <BalanceBox />
    <PaymentMethod />
  </div>
</template>

<script setup lang="ts" name="Recharge">
import BalanceBox from './components/balance-box.vue'
import PaymentMethod from './components/payment-method.vue'
const router = useRouter()
</script>
