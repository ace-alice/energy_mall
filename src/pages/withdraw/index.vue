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
        <van-field v-model="amount" type="number" placeholder="请输入提现金额" :min="100">
          <template #left-icon> </template>
          <template #right-icon>
            <span style="font-size: 14px; margin-right: 4px; color: #13b756">{{
              channelType == 'usdt' ? 'USDT' : 'RMB'
            }}</span>
            <van-icon name="arrow" size="16" color="#13B756" />
          </template>
        </van-field>
      </div>
      <!-- <template v-if="channelType == 'usdt'">
        <div>兑换结果</div>
      </template> -->
    </div>
    <div class="normal-card" v-if="channelType == 'bank'">
      <div v-waves class="select-cell">
        银行卡
        <van-icon name="arrow" size="16" color="#13B756" />
      </div>
      <van-button plain block icon="plus" type="primary" color="#13B756"
        >暂无收款银行账号，去添加</van-button
      >
    </div>
    <div class="normal-card" v-if="channelType == 'usdt'">
      <div v-waves class="select-cell">
        USDT
        <van-icon name="arrow" size="16" color="#13B756" />
      </div>
      <van-button plain block icon="plus" type="primary" color="#13B756"
        >暂无收款USDT账号，去添加</van-button
      >
    </div>
    <van-sticky :offset-bottom="50" position="bottom">
      <div style="margin-top: 40px; padding: 16px">
        <van-button block round type="primary">提交充值订单</van-button>
      </div>
    </van-sticky>
    <!-- :disabled="disabled" @click="submit" -->
  </div>
</template>

<script setup lang="ts" name="Recharge">
import withdrawalHook from '@/hooks/withdrawalHook'
import BalanceBox from './components/balance-box.vue'
const router = useRouter()
const { channelType, amount } = withdrawalHook()
</script>

<style lang="scss" scoped>
.select-cell {
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 8px;
}
</style>
