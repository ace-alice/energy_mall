<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-empty description="暂无数据" v-if="!list.length" />
      <ProjectItem v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="ProjectListBox">
import { investOrderApi } from '@/api/index'
import type { InvestOrderItemType } from '@/interface/common'
import ProjectItem from './project-item.vue'
import pageHook from '@/hooks/pageHook'

const props = defineProps(['type'])

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<InvestOrderItemType>({
  api: investOrderApi,
  otherForm: () => ({ tab: props.type })
})
</script>

<style lang="scss" scoped>
:deep(.van-grid-item__content) {
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
  background-color: white;
}
</style>
