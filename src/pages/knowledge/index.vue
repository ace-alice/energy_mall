<script setup name="Knowledge" lang="ts">
import { useCommonStore } from '@/stores/common'
import knowledgeBg from '@/assets/images/background/know_ledge.png'
import { getArticles } from '@/api'
import pageHook from '@/hooks/pageHook'
import type { ArticleInfoType } from '@/interface/common'

const { mediaQueryInfo } = storeToRefs(useCommonStore())

const { list, loading, finished, refreshing, onLoad, onRefresh } = pageHook<ArticleInfoType>({
  api: getArticles,
  otherForm: () => ({ class_id: 13 })
})

const router = useRouter()

function toDetail(item: ArticleInfoType) {
  router.push({
    name: 'ArticleDetail',
    query: {
      id: item.id
    }
  })
}
</script>

<template>
  <div class="normal-page knowledge">
    <BgTwo :img-src="knowledgeBg" router="Knowledge" bg-color="#2E6432" />
    <NormalHeader
      :back-icon-tag="2"
      :background="false"
      bg-color="#000"
      title="知识课堂"
      text-color="#fff"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div style="width: 100%; height: 80px"></div>
        <van-empty description="暂无数据" v-if="!list.length" />
        <div
          class="normal-card known-card"
          v-for="item in list"
          :key="item.id"
          @click="toDetail(item)"
        >
          <van-image
            :src="item.img"
            height="70"
            width="95"
            style="flex-shrink: 0; margin-right: 16px"
          />
          <div>
            <van-text-ellipsis :content="item.title" />
            <van-text-ellipsis style="font-size: 12px; color: #999" :content="item.desc" rows="2" />
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
.known-card {
  display: flex;
}
</style>
