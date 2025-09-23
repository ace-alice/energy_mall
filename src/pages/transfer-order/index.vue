<template>
  <div class="normal-page">
    <NormalHeader title="转账记录" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-empty description="暂无数据" v-if="!list.length" />
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in list" :key="item.id" class="normal-card order-item">
          <div>
            <div>转账人手机号</div>
            <div>
              {{ item.from_phone
              }}<Clipboard :content="item.from_phone">
                <template #label>
                  <van-icon name="link-o" size="18" />
                </template>
              </Clipboard>
            </div>
          </div>
          <div>
            <div>收款人手机号</div>
            <div>
              {{ item.to_phone
              }}<Clipboard :content="item.to_phone">
                <template #label>
                  <van-icon name="link-o" size="18" />
                </template>
              </Clipboard>
            </div>
          </div>
          <div>
            <div>转账金额({{ currency }})</div>
            <div>{{ item.amount }}</div>
          </div>
          <div>
            <div>转账时间</div>
            <div>{{ item.create_at }}</div>
          </div>
          <div>
            <div>转账订单编号</div>
            <div>
              {{ item.order_no
              }}<Clipboard :content="item.order_no">
                <template #label>
                  <van-icon name="link-o" size="18" />
                </template>
              </Clipboard>
            </div>
          </div>
          <div>
            <div>转账订单状态</div>
            <div v-if="item.status == 0" class="tag success">成功</div>
            <div v-else-if="item.status == 2" class="tag fail">已拒绝</div>
            <div v-else class="tag load">待审核</div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts" name="TransferOrder">
import { getMemberTransferAuditListApi } from '@/api'
import pageHook from '@/hooks/pageHook'
import type { TransferOrderItemType } from '@/interface/common'

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<TransferOrderItemType>({
  api: getMemberTransferAuditListApi,
  otherForm: () => ({})
})

const currency = __VITE_CURRENCY

onActivated(() => {
  onRefresh()
})
</script>

<style lang="scss" scoped>
.tag {
  padding: 3px 6px;
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
    height: 20px;
    justify-content: space-between;
    align-items: center;
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
