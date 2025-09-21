<template>
  <div class="normal-page wallet">
    <BgTwo router="Wallet" />
    <NormalHeader :background="false" title="我的钱包">
      <template #right>
        <van-button
          plain
          round
          size="small"
          type="success"
          style="background: none"
          @click="router.push('/fund-detail/in')"
          >资金明细</van-button
        >
      </template>
      <template #bottom>
        <div class="normal-card money-info-box">
          <div>
            <div style="margin-bottom: 10px">可用金额(USDT)</div>
            <div style="font-size: 28px; font-weight: 500">
              {{ userInfo.frozen_money }}
            </div>
          </div>
          <div>
            <div style="margin-bottom: 10px">可提金额(USDT)</div>
            <div style="font-size: 28px; font-weight: 500">
              {{ userInfo.money }}
            </div>
          </div>
        </div>
      </template>
    </NormalHeader>
    <InfoBox
      title="投资"
      label1="累计投资(USDT)"
      label2="在投金额(USDT)"
      :value1="userDetail.invest_money"
      :value2="userDetail.invest_not_finish"
    />
    <InfoBox
      title="充值提现"
      label1="累计充值(USDT)"
      label2="累计提现(USDT)"
      :value1="userDetail.recharge_money"
      :value2="userDetail.withdraw_money"
    />
    <InfoBox
      title="投资收益"
      label1="待收收益(USDT)"
      label2="累计收益(USDT)"
      :value1="userDetail.invest_not_earn"
      :value2="userInfo.income_money"
    />
    <!-- <InfoBox
      title="投资"
      label1="可用金额(USDT)"
      label2="可提金额(USDT)"
      :value1="userInfo.money"
      :value2="userInfo.frozen_money"
    />
    <InfoBox
      title="投资"
      label1="可用金额(USDT)"
      label2="可提金额(USDT)"
      :value1="userInfo.money"
      :value2="userInfo.frozen_money"
    />
    <InfoBox
      title="投资"
      label1="可用金额(USDT)"
      label2="可提金额(USDT)"
      :value1="userInfo.money"
      :value2="userInfo.frozen_money"
    /> -->
  </div>
</template>

<script setup lang="ts" name="Wallet">
import titleIcon from '@/assets/images/icons/valid_total.png'
import { useCommonStore } from '@/stores/common'
import InfoBox from './components/info-cared.vue'

const { userDetail, userInfo } = storeToRefs(useCommonStore())

const router = useRouter()
</script>

<style lang="scss" scoped>
.money-info-box {
  margin: 0 16px;
  padding: 0;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/background/transfer.png');
  color: #fff;
  & > div {
    width: 50%;
    padding-left: 24px;
    & > div:nth-child(1) {
      font-size: 14px;
    }
  }
}
</style>
