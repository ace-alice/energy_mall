<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-empty description="暂无数据" v-if="!list.length" />
      <TeamItem v-for="item in list" :key="item.id" :item="item">{{ item }}</TeamItem>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="TeamList">
import { getTeamMemberSelfApi } from '@/api'
import pageHook from '@/hooks/pageHook'
import type { TeamMemberType } from '@/interface/common'
import { useCommonStore } from '@/stores/common'
import TeamItem from './team-item.vue'

const props = defineProps(['lv'])

const { userDetail } = storeToRefs(useCommonStore())

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<TeamMemberType>({
  api: getTeamMemberSelfApi,
  otherForm: () => ({ lv: +props.lv })
})
</script>
