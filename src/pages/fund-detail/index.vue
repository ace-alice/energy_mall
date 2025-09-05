<script setup lang="ts" name="FundDetail">
import { getMoneyLogApi } from '@/api'
import pageHook from '@/hooks/pageHook'
import type { MoneyLogType } from '@/interface/common'

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<MoneyLogType>({
  api: getMoneyLogApi
})
</script>

<template>
  <div class="normal-page">
    <BgTwo
      :is-color="true"
      bg-color="linear-gradient( 180deg, #A9F1C6 0%, #FFFFFF 100%)"
      height="160px"
      router="FundDetail"
    />
    <NormalHeader title="资金明细" :background="false" bg-color="#A9F1C6" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
        <template #loading>
          <div style="margin-top: 10px">
            <van-loading vertical>
              <template #icon>
                <van-icon name="star-o" size="30" />
              </template>
              加载中...
            </van-loading>
          </div>
        </template>
        <template #finished>
          <van-empty description="暂无数据" v-if="!list.length" />
          <div
            v-else
            style="
              height: 40px;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            没有更多了
          </div>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div:nth-child(2) {
    font-size: 19px;
    font-weight: 600;
    color: #ff3f3f;
  }
  & > div:nth-child(1) {
    font-size: 16px;
    & > div:nth-child(2) {
      font-size: 13px;
      color: #222;
      margin-top: 6px;
    }
  }
  .cut {
    color: #49cc83 !important;
  }
}
.after-m {
  font-size: 14px;
  color: #999999;
  margin-top: 8px;
  span {
    font-size: 19px;
    font-weight: 600;
    color: #222;
    margin-left: 4px;
  }
}
</style>
