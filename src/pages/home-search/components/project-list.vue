<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-grid :border="false" :column-num="2" gutter="8">
        <van-grid-item
          v-for="item in list"
          :key="item.id"
          :to="`/project-detail-normal/${item.id}`"
        >
          <ProjectItem :item="item" />
        </van-grid-item>
      </van-grid>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="ProjectListBox">
import { projectListApi } from '@/api/index'
import type { ProjectItemType } from '@/interface/common'
import ProjectItem from './project-item.vue'
import pageHook from '@/hooks/pageHook'

const props = defineProps(['type'])

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<ProjectItemType>({
  api: projectListApi,
  otherForm: { type: props.type }
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
