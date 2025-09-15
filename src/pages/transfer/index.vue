<template>
  <div class="normal-page">
    <BgTwo router="Transfer" />
    <NormalHeader :background="false" title="转账">
      <template #right>
        <van-button
          plain
          round
          size="small"
          type="success"
          style="background: none"
          @click="router.push({ name: 'TransferOrder' })"
          >转账记录</van-button
        >
      </template>
    </NormalHeader>
    <BalanceBox />
    <div class="normal-card">
      <van-form @submit="onSubmit" required class="login-form self-form add-form">
        <div class="title"><img :src="rechargeIcon" alt="" height="24" />对方手机号</div>
        <van-field
          v-model="formData.phone"
          name="phone"
          type="number"
          placeholder="请输入对方手机号"
          :rules="[
            { required: true, message: '请输入对方手机号' },
            {
              validator: (val) => {
                const v = String(val ?? '').trim()
                return !v || /^1\d{10}$/.test(v)
              },
              message: '手机号格式不正确'
            }
          ]"
        >
        </van-field>
        <div class="title"><img :src="rechargeIcon" alt="" height="24" />转账金额</div>
        <van-field
          v-model="formData.amount"
          type="number"
          name="amount"
          :rules="[{ required: true, message: '请输入转账金额' }]"
          placeholder="请输入转账金额"
        >
        </van-field>
        <van-button
          class="submit-button"
          size="large"
          block
          type="primary"
          native-type="submit"
          style="margin-top: 80px"
        >
          申请转账
        </van-button>
      </van-form>
    </div>
    <NormalPinAction ref="normalPinActionRef" @submit="toTransfer" />
  </div>
</template>

<script setup lang="ts" name="Transfer">
import TransferHook from '@/hooks/TransferHook'
import rechargeIcon from '@/assets/images/icons/recharge.png'
import BalanceBox from './components/balance-box.vue'
const router = useRouter()

const { onSubmit, formData, toTransfer, normalPinActionRef } = TransferHook()
</script>

<style lang="scss" scoped>
.title {
  height: 48px;
  display: flex;
  align-items: center;
  img {
    margin-right: 8px;
  }
}
</style>
