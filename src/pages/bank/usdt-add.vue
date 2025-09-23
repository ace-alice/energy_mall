<script setup lang="ts" name="UsdtAdd">
import bankBg from '@/assets/images/background/back_bg.png'
import addBankHook from '@/hooks/addBankHook'
import usdtIcon from '@/assets/images/icons/usdt.png'
import usdtAccIcon from '@/assets/images/icons/coin_acc.png'
const { onSubmit, formData, coinBlockchainColumns, blockchainConfirm, showPicker } = addBankHook({
  type: 1,
  style: 'USDT'
})
</script>

<template>
  <div class="normal-page">
    <BgTwo router="UsdtAdd" :img-src="bankBg" />
    <NormalHeader
      title="添加USDT"
      :background="false"
      text-color="#fff"
      :back-icon-tag="2"
      bgColor="#31BF6B"
    />
    <div class="normal-card" style="margin-top: 100px">
      <van-form @submit="onSubmit" required class="login-form self-form add-form">
        <div class="title"><img :src="usdtIcon" alt="" height="24" /> 地址类型</div>
        <van-field
          v-model="formData.coin_blockchain"
          name="coin_blockchain"
          type="text"
          placeholder="请选择地址类型"
          is-link
          readonly
          :rules="[{ required: true, message: '请选择地址类型' }]"
          @click="showPicker = true"
        >
        </van-field>
        <div class="title"><img :src="usdtAccIcon" alt="" height="24" />USDT地址</div>
        <van-field
          v-model="formData.coin_account"
          type="text"
          name="coin_account"
          placeholder="请输入收款钱包地址"
          :rules="[{ required: true, message: '请输入收款钱包地址' }]"
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
          立即添加
        </van-button>
      </van-form>
    </div>

    <van-popup v-model:show="showPicker" destroy-on-close position="bottom" teleport="#app" round>
      <van-picker
        title="地址类型"
        :columns="coinBlockchainColumns"
        :model-value="[formData.coin_blockchain]"
        @confirm="blockchainConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<style scoped lang="scss">
.title {
  height: 48px;
  display: flex;
  align-items: center;
  img {
    margin-right: 8px;
  }
}
</style>
