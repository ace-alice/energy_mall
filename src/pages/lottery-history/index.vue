<script setup lang="ts" name="LotteryHistory">
import { raffleRecordApi } from '@/api'
import pageHook from '@/hooks/pageHook'
import type { RaffleHistoryItemType } from '@/interface/common'
import { getDrawType, getDrawTheme } from '@/utils/common'

const currency = __VITE_CURRENCY

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<RaffleHistoryItemType>({
  api: raffleRecordApi
})

onActivated(() => {
  onRefresh()
})
</script>

<template>
  <div class="normal-page">
    <NormalHeader title="抽奖记录" />
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
              {{ item.raffle_name }}
              <van-tag :type="getDrawTheme(+item.draw_type || 0)" round>{{
                getDrawType(+item.draw_type || 0)
              }}</van-tag>
            </div>
            <div style="font-size: 13px; color: #999">{{ item.create_at }}</div>
          </div>
          <div style="font-size: 24px; font-weight: 500; color: #13b756">
            +{{ item.amount }}
            <span style="font-size: 12px">{{ +item.type ? currency : '积分' }}</span>
          </div>
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
