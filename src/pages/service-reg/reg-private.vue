<script setup lang="ts" name="RegPrivate">
import { articleInfoApi } from '@/api'
import type { ArticleInfoType } from '@/interface/common'
import { htmlDecodeByRegExp } from '@/utils/common'

const info = reactive<ArticleInfoType>({
  id: 0,
  title: '',
  img: '',
  code: '',
  desc: '',
  release_time: 0,
  content: '',
  create_time: 0,
  update_time: 0,
  create_at: '',
  update_at: '',
  class_id: 0,
  class_name: ''
})

function articleInfo() {
  articleInfoApi({ code: 'reg_private' }).then((res) => {
    Object.assign(info, res.data.data)
  })
}

const content = computed(() => {
  return htmlDecodeByRegExp(info.content).replace(/<img/g, '<img  width="100%"')
})

onMounted(() => {
  articleInfo()
})
</script>

<template>
  <div class="normal-page">
    <NormalHeader title="隐私协议" bg-color="#000" text-color="#fff" :back-icon-tag="2">
    </NormalHeader>
    <div class="box" v-if="info.content" v-html="content"></div>
    <div style="margin-top: 240px" v-else>
      <van-loading vertical>
        <template #icon>
          <van-icon name="star-o" size="30" />
        </template>
        加载中...
      </van-loading>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  margin: 0 16px;
  background-color: #fff;
  border-radius: 16px;
  padding: 0 12px;
}
</style>
