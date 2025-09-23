<script setup lang="ts" name="ArticleDetail">
import { articleInfoApi } from '@/api'
import type { ArticleInfoType } from '@/interface/common'
import { htmlDecodeByRegExp, isVideoUrl } from '@/utils/common'

const route = useRoute()

const articleInfo = ref<ArticleInfoType>({ content: '', title: '' } as ArticleInfoType)

function getArticleInfo() {
  const obj: any = {}
  console.log(route.query['id'])
  if (route.query['id']) {
    obj['id'] = route.query['id']
  }
  if (route.query['code']) {
    obj['code'] = route.query['code']
  }
  articleInfoApi(obj).then((res) => {
    articleInfo.value = res.data.data
  })
}

const content = computed(() => {
  return htmlDecodeByRegExp(articleInfo.value.content).replace(/<img/g, '<img  width="100%"')
})

onMounted(() => {
  getArticleInfo()
})
</script>

<template>
  <div class="normal-page">
    <NormalHeader :title="articleInfo.title" />
    <div style="margin-top: 240px" v-if="!articleInfo.id">
      <van-loading vertical>
        <template #icon>
          <van-icon name="star-o" size="30" />
        </template>
        加载中...
      </van-loading>
    </div>
    <div class="normal-card" v-if="isVideoUrl(articleInfo.desc)" style="padding: 0; height: 540px">
      <VideoPlayer :src="articleInfo.desc" />
    </div>
    <div class="box" v-html="content"></div>
  </div>
</template>

<style scoped lang="scss">
.box {
  padding: 16px;
  overflow: auto;
}
</style>
