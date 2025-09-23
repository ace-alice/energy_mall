<template>
  <div class="normal-page">
    <NormalHeader title="额度转换记录" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-empty description="暂无数据" v-if="!list.length" />
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in list" :key="item.id" class="normal-card">
          <div class="top">
            <div>
              <div>{{ item.desc }}</div>
              <div>{{ item.create_at }}</div>
            </div>
            <div
              :class="{
                cut: (+item.after || 0) - (+item.before || 0) < 0
              }"
            >
              {{ (+item.after || 0) - (+item.before || 0) >= 0 ? '+' : '-' }} {{ item.amount }}
            </div>
          </div>
          <div class="after-m">
            现有投资金额 <span>{{ item.after }}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts" name="CreditOrder">
import { getMoneyLogApi } from '@/api'
import pageHook from '@/hooks/pageHook'
import type { MoneyLogType } from '@/interface/common'
import { useCommonStore } from '@/stores/common'

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<MoneyLogType>({
  api: getMoneyLogApi
})

const currency = __VITE_CURRENCY

onActivated(() => {
  onRefresh()
})
</script>

<style lang="scss" scoped></style>
