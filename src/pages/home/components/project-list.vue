<template>
  <div>
    <img :src="news" height="32" alt="" style="padding: 12px 0 0" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="item in list"
          :key="item.id"
          :item="item"
          style="height: 300px; width: 100%"
        ></div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts" name="ProjectListBox">
import { getArticles } from '@/api/index'
import news from '@/assets/images/icons/news.png'
import type { NewsItemType } from '@/interface/common'

const list = ref<NewsItemType[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const page = ref(0)

const onLoad = () => {
  getArticles({ page: page.value + 1, class_id: 4 })
    .then((res) => {
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }

      page.value = page.value + 1
      list.value = [...list.value, ...res.data.data.data]
      if (res.data.data.current_page == res.data.data.last_page) {
        finished.value = true
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  page.value = 0
  onLoad()
}
</script>

<style lang="scss" scoped>
.video-box {
  height: 225px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}
</style>
