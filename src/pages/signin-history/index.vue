<script setup name="SigninHistory" lang="ts">
import { getSigninListApi } from '@/api'
import pageHook from '@/hooks/pageHook'
import type { SigninHistoryItemType } from '@/interface/common'

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<SigninHistoryItemType>({
  api: getSigninListApi,
  otherForm: {}
})
</script>

<template>
  <div class="normal-page">
    <NormalHeader title="签到记录" />
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
            <div style="margin-bottom: 4px; font-size: 16px">
              签到奖励{{ Number(item.amount) }}元
            </div>
            <div style="font-size: 13px; color: #999">{{ item.create_at }}</div>
          </div>
          <div style="font-size: 24px; font-weight: 500">+{{ Number(item.amount) }}</div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss">
.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
