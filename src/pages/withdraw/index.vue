<template>
  <div class="normal-page">
    <BgTwo router="Withdraw" />
    <NormalHeader :background="false" title="提现"> </NormalHeader>
    <BalanceBox />
    <div class="normal-card">
      <div class="select-method">
        选择提现方式
        <div v-waves @click="router.push({ name: 'WithdrawOrder' })">提现记录</div>
      </div>
      <van-row :gutter="12" style="margin-top: 16px">
        <van-col span="12">
          <van-button
            :plain="channelType != 'usdt'"
            block
            :type="channelType == 'usdt' ? 'primary' : 'default'"
            @click="() => (channelType = 'usdt')"
            :color="channelType == 'usdt' ? '' : '#222222'"
          >
            USDT
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button
            :plain="channelType != 'bank'"
            :type="channelType == 'bank' ? 'primary' : 'default'"
            block
            :color="channelType == 'bank' ? '' : '#222222'"
            @click="() => (channelType = 'bank')"
          >
            银行卡
          </van-button>
        </van-col>
      </van-row>
    </div>
    <div class="normal-card">
      <div style="font-size: 14px">提现金额</div>
      <div class="self-form recharge-form">
        <van-field v-model="amount" type="number" placeholder="请输入提现金额" :min="0">
          <template #left-icon> </template>
          <template #right-icon>
            <span style="font-size: 14px; margin-right: 4px; color: #13b756">{{ currency }}</span>
            <van-icon name="arrow" size="16" color="#13B756" />
          </template>
        </van-field>
      </div>
      <div class="rate" v-if="channelType != 'usdt'">
        <div>
          <span style="opacity: 0.6; font-size: 14px">兑换结果</span>
          {{ ((amount || 0) * Number(userInfo.rate)).toFixed(0) }} {{ notionCurrency }}
        </div>
        <div style="color: #13b756">
          1{{ currency }}={{ Number(userInfo.rate) }}{{ notionCurrency }}
        </div>
      </div>
    </div>
    <div class="normal-card" v-if="channelType == 'bank'">
      <div v-waves class="select-cell" @click="selectHandle">
        银行卡
        <van-icon name="arrow" size="16" color="#13B756" />
      </div>
      <BankCard v-if="currentMethod.id && currentMethod.type == 0" :item="currentMethod" />
      <van-button
        v-if="bankItems.length == 0"
        plain
        block
        icon="plus"
        type="primary"
        color="#13B756"
        to="/bank-add"
        >暂无收款银行账号，去添加</van-button
      >
    </div>
    <div class="normal-card" v-if="channelType == 'usdt'">
      <div v-waves class="select-cell" @click="selectHandle">
        USDT
        <van-icon name="arrow" size="16" color="#13B756" />
      </div>
      <UsdtCard v-if="currentMethod.id && currentMethod.type == 1" :item="currentMethod" />
      <van-button
        v-if="usdtItems.length == 0"
        plain
        block
        icon="plus"
        type="primary"
        color="#13B756"
        to="/usdt-add"
        >暂无收款USDT账号，去添加</van-button
      >
    </div>
    <van-sticky :offset-bottom="50" position="bottom">
      <div style="margin-top: 40px; padding: 16px">
        <van-button block round type="primary" :disabled="disabled" @click="toOpenPin"
          >提交提现订单</van-button
        >
      </div>
    </van-sticky>
    <!-- :disabled="disabled" @click="submit" -->

    <van-popup
      v-model:show="showSelect"
      round
      :style="{ 'max-height': '60%', width: '100%' }"
      :close-on-click-overlay="false"
    >
      <div class="box">
        <div class="radio-group">
          <van-radio-group v-model="checked">
            <van-cell-group inset>
              <van-cell
                :title="
                  channelType == 'bank' ? '选择银行卡' : channelType == 'usdt' ? '选择USDT' : ''
                "
              >
                <template #right-icon>
                  <van-button
                    plain
                    icon="plus"
                    type="primary"
                    color="#13B756"
                    style="border: none; padding: 0; height: unset"
                    :to="
                      channelType == 'bank' ? '/bank-add' : channelType == 'usdt' ? '/usdt-add' : ''
                    "
                    >新增</van-button
                  >
                </template>
              </van-cell>
              <van-cell
                v-for="(item, index) in channelType == 'bank'
                  ? bankItems
                  : channelType == 'usdt'
                    ? usdtItems
                    : []"
              >
                <van-radio :name="item.id"
                  >{{ channelType == 'bank' ? '银行卡' : channelType == 'usdt' ? 'USDT' : '支付宝'
                  }}{{ index + 1 }}</van-radio
                >
                <BankCard style="margin-top: 8px" v-if="channelType == 'bank'" :item="item" />
                <UsdtCard style="margin-top: 8px" v-if="channelType == 'usdt'" :item="item" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="submit">
          <div v-waves @click="cancelChecked">取消</div>
          <div v-waves @click="submitChecked">确定</div>
        </div>
      </div>
    </van-popup>
    <NormalPinAction ref="normalPinActionRef" @submit="toWithdraw" />
  </div>
</template>

<script setup lang="ts" name="Recharge">
import withdrawalHook from '@/hooks/withdrawalHook'
import BalanceBox from './components/balance-box.vue'
import { useCommonStore } from '@/stores/common'
const currency = __VITE_CURRENCY

const notionCurrency = __VITE_NATION_CURRENCY
const router = useRouter()
const { userInfo } = storeToRefs(useCommonStore())
const {
  channelType,
  amount,
  usdtItems,
  bankItems,
  currentMethod,
  showSelect,
  selectHandle,
  checked,
  submitChecked,
  cancelChecked,
  toWithdraw,
  disabled,
  normalPinActionRef,
  toOpenPin
} = withdrawalHook()
</script>

<style lang="scss" scoped>
.rate {
  display: flex;
  justify-content: space-between;

  padding: 12px;
}
.box {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .radio-group {
    flex-grow: 1;
    overflow: auto;
  }
}
.submit {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 12px;
  flex-shrink: 0;
  div {
    height: 40px;
    width: 45%;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
}
.select-cell {
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 8px;
}
.select-method {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    font-size: 14px;
    color: #13b756;
    padding: 8px 12px;
    background-color: #edf8f2;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    transform: translateX(16px);
    cursor: pointer;
  }
}
</style>
