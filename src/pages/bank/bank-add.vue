<script setup lang="ts" name="BankAdd">
import bankBg from '@/assets/images/background/back_bg.png'
import addBankHook from '@/hooks/addBankHook'
import usdtIcon from '@/assets/images/icons/usdt.png'
import usdtAccIcon from '@/assets/images/icons/coin_acc.png'

const { onSubmit, formData, bankNameConfirm, showPicker, searchText, allBankFilter, userInfo } =
  addBankHook({
    type: 0,
    style: '银行卡'
  })
</script>

<template>
  <div class="normal-page">
    <BgTwo router="BankAdd" :img-src="bankBg" />
    <NormalHeader
      title="添加银行卡"
      :background="false"
      text-color="#fff"
      :back-icon-tag="2"
      bgColor="#31BF6B"
    />
    <div class="normal-card" style="margin-top: 100px">
      <van-form @submit="onSubmit" required class="login-form self-form add-form">
        <div class="title"><img :src="usdtAccIcon" alt="" height="24" />开户人姓名</div>
        <van-field
          v-model="userInfo.sfz_name"
          type="text"
          name="sfz_name"
          readonly
          placeholder="开户人姓名"
        >
        </van-field>
        <div class="title"><img :src="usdtIcon" alt="" height="24" />请选择银行</div>
        <van-field
          v-model="formData.bank_name"
          name="bank_name"
          type="text"
          placeholder="请选择银行"
          is-link
          readonly
          :rules="[{ required: true, message: '请选择银行' }]"
          @click="showPicker = true"
        >
        </van-field>
        <div class="title"><img :src="usdtAccIcon" alt="" height="24" />银行卡号</div>
        <van-field
          v-model="formData.bank_account"
          type="number"
          name="bank_account"
          :rules="[{ required: true, message: '请输入银行卡号' }]"
          placeholder="请输入银行卡号"
        >
        </van-field>
        <div class="title"><img :src="usdtAccIcon" alt="" height="24" />开户行</div>
        <van-field
          v-model="formData.bank_branch"
          type="text"
          name="bank_branch"
          :rules="[{ required: true, message: '请输入开户行' }]"
          placeholder="请输入开户行"
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
        title="银行名称"
        :columns="allBankFilter"
        :columns-field-names="{ text: 'text', value: 'text' }"
        :model-value="[formData.bank_name]"
        @confirm="bankNameConfirm"
        @cancel="showPicker = false"
      >
        <template #columns-top>
          <van-search v-model="searchText" placeholder="请输入搜索关键词"
        /></template>
      </van-picker>
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
