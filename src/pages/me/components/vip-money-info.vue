<template>
  <div class="vip-money-info">
    <div class="menu-top">
      <div @click="router.push({ name: 'Wallet' })">
        <img src="" alt="" />
        我的钱包
        <van-icon name="arrow" />
      </div>
      <div @click="router.push({ name: 'PointsMall' })">
        <img src="" alt="" />
        商城积分
        <span style="margin: 0 8px; font-weight: 600">{{ userInfo.user_points }}</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="money-box">
      <van-grid :border="false" column-num="3" :center="false">
        <van-grid-item class="direction">
          <div>
            <div>
              <VueCountTo :end-val="Number(userInfo.frozen_money)" :start-val="moneyStartVal" />
            </div>
            <div class="label">可用余额({{ currency }})</div>
          </div>
        </van-grid-item>
        <van-grid-item class="direction">
          <div>
            <div><VueCountTo :end-val="Number(userInfo.money)" /></div>
            <div class="label">可提余额({{ currency }})</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <div>
              <VueCountTo :end-val="Number(userDetail.invest_not_finish)" />
            </div>
            <div class="label">待收本金({{ currency }})</div>
          </div>
        </van-grid-item>
        <van-grid-item class="direction">
          <div>
            <div>
              <VueCountTo :end-val="Number(userDetail.invest_not_earn)" />
            </div>
            <div class="label">待收收益({{ currency }})</div>
          </div>
        </van-grid-item>
        <van-grid-item class="direction">
          <div>
            <div>
              <VueCountTo :end-val="Number(userDetail.recharge_money)" />
            </div>
            <div class="label">累计充值({{ currency }})</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <div>
              <VueCountTo :end-val="Number(userDetail.withdraw_money)" />
            </div>
            <div class="label">累计提现({{ currency }})</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script setup lang="ts" name="VipMoneyInfoBox">
import { useCommonStore } from '@/stores/common'
const { userInfo, userDetail } = storeToRefs(useCommonStore())

const currency = __VITE_CURRENCY

const moneyStartVal = ref(0)

const pointStartVal = ref(0)

const router = useRouter()

watch(
  () => userInfo.value.money,
  (newVal, oldVal) => {
    moneyStartVal.value = +oldVal
  }
)
watch(
  () => userInfo.value.user_points,
  (newVal, oldVal) => {
    pointStartVal.value = +oldVal
  }
)
</script>

<style lang="scss" scoped>
.vip-money-info {
  background-color: #222222;
  border-radius: 14px;
  background-size: 100% 100%;
  margin: 16px;
  .menu-top {
    display: flex;
    padding: 12px 16px;
    color: #fff;
    font-size: 12px;
    justify-content: space-between;
    & > div {
      display: flex;
      align-items: center;
    }
  }
  .money-box {
    width: 100%;
    background-color: white;
    border-radius: 12px;
    padding: 12px;
  }
  .direction {
    position: relative;
    &::after {
      content: '/';
      position: absolute;
      font-size: 12px;
      color: #8d9196;
      opacity: 0.6;
      top: 20px;
      right: 0;
    }
  }
  .label {
    font-size: 12px;
    margin-top: 4px;
    color: #999999;
  }
}
</style>
