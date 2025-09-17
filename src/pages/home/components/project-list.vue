<template>
  <div style="padding: 0 8px">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <NiceGoodsBox :list="list.slice(0, 3)" />
        <HotGoodsBox :list="list" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts" name="ProjectListBox">
import { projectListApi } from '@/api/index'
import pageHook from '@/hooks/pageHook'
import type { ProjectItemType } from '@/interface/common'
import NiceGoodsBox from './nice-goods.vue'
import HotGoodsBox from './hot-goods.vue'

const props = defineProps(['type'])

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<ProjectItemType>({
  api: projectListApi,
  otherForm: () => ({ class_id: props.type })
})
</script>

<style lang="scss" scoped>
.video-box {
  height: 225px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}
</style>
