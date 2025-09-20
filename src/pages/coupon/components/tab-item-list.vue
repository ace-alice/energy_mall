<script setup name="GoodItemList" lang="ts">
import { getCouponListApi } from '@/api/index'
import type { CouponItemType } from '@/interface/common'
import CouponItem from './coupon-item.vue'
import pageHook from '@/hooks/pageHook'

const props = defineProps(['status'])

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<CouponItemType>({
  api: getCouponListApi,
  otherForm: () => ({
    status: props.status
  })
})

onActivated(() => {
  onRefresh()
})
</script>

<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CouponItem v-for="item in list" :key="item.id" :item="item" />
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
</template>
