<template>
  <div class="normal-page">
    <BgTwo
      router="WithdrawOrder"
      bg-color="linear-gradient( 180deg, #13B756 0%, #FFFFFF 100%)"
      :is-color="true"
      height="320px"
    />
    <NormalHeader
      :background="false"
      title="提现记录"
      text-color="#fff"
      :back-icon-tag="2"
      bg-color="linear-gradient( 180deg, #13B756 0%, #A8E1C2 100%)"
    >
      <template #bottom>
        <div class="normal-card money-info-box">
          <div>
            <div style="color: #9b5230; margin-bottom: 10px">提现成功金额({{ currency }})</div>
            <div style="color: #5e0000; font-size: 28px; font-weight: 600">
              {{ userDetail.withdraw_money }}
            </div>
          </div>
        </div>
      </template>
    </NormalHeader>
    <div class="normal-card box">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-empty description="暂无数据" v-if="!list.length" />
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="item in list" :key="item.id" class="order-item">
            <div class="order-item-title">
              <div>
                {{ item.bank_name || item.coin_blockchain || '支付宝' }}({{
                  maskEmail(item.bank_account || item.coin_account || item.alipay_account)
                }})
              </div>
              <div v-if="item.status == 0" class="tag success">成功</div>
              <div v-else-if="item.status == 2" class="tag fail">已拒绝</div>
              <div v-else class="tag load">待审核</div>
            </div>
            <div>
              <div>提现金额({{ currency }})</div>
              <div>{{ item.amount }}</div>
            </div>
            <!-- <div>
              <div>到账金额({{ currency }})</div>
              <div>{{ item.amount_real }}</div>
            </div> -->
            <div>
              <div>提现时间</div>
              <div>{{ item.create_at }}</div>
            </div>
            <div>
              <div>订单编号</div>
              <div>
                {{ item.order_no
                }}<Clipboard :content="item.order_no">
                  <template #label>
                    <van-icon name="link-o" size="18" />
                  </template>
                </Clipboard>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts" name="RechargeOrderList">
import { withdrawRecordApi } from '@/api'
import pageHook from '@/hooks/pageHook'
import type { WithdrawOrderItemType } from '@/interface/common'
import { useCommonStore } from '@/stores/common'
import { maskEmail } from '@/utils/parseTools'

const { userDetail, isVip } = storeToRefs(useCommonStore())

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<WithdrawOrderItemType>({
  api: withdrawRecordApi,
  otherForm: () => ({ type: isVip.value ? 2 : 1 })
})

const currency = __VITE_CURRENCY

onActivated(() => {
  onRefresh()
})
</script>

<style lang="scss" scoped>
.tag {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
}
.success {
  color: #13b756;
  background-color: #e7f7ee;
}
.fail {
  color: #f84c2b;
  background-color: #feede9;
}
.load {
  color: #ffd275;
  background-color: #f9efdb;
}
.order-item {
  .order-item-title {
    font-size: 16px;
    color: #000;
    font-weight: 600;
    margin-top: 12px;
  }
  & + .order-item {
    border-top: 0.5px solid #e6e7eb;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 8px;
    font-size: 12px;
    color: #999999;
  }
}
.money-info-box {
  height: 130px;
  background-color: #ffce71;
  display: flex;
  align-items: center;
  padding-left: 40px;
}
</style>
