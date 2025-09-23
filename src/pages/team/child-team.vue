<script setup lang="ts" name="ChildTeam">
import { getTeamMemberApi } from '@/api'
import pageHook from '@/hooks/pageHook'
import type { TeamMemberType } from '@/interface/common'
import TeamItem from './components/team-item.vue'

const route = useRoute()

const pageTitle = ref('')

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<TeamMemberType>({
  api: getTeamMemberApi,
  otherForm: () => ({ uid: route.params.uid })
})

onMounted(() => {
  pageTitle.value = route.query.title?.toString() || ''
})
</script>

<template>
  <div class="normal-page">
    <NormalHeader :title="pageTitle" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-empty description="暂无数据" v-if="!list.length" />
        <TeamItem style="margin: 12px 16px" v-for="item in list" :key="item.id" :item="item">{{
          item
        }}</TeamItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
