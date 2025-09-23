<script setup lang="ts" name="ComDetail">
import { articleInfoApi } from '@/api'
import type { ArticleInfoType } from '@/interface/common'
import { htmlDecodeByRegExp } from '@/utils/common'

const props = defineProps(['code'])

const detail = ref<ArticleInfoType>({ content: '' } as ArticleInfoType)

function articleInfo() {
  articleInfoApi({ code: props.code }).then((res) => {
    detail.value = res.data.data
  })
}

const content = computed(() => {
  return htmlDecodeByRegExp(detail.value.content).replace(/<img/g, '<img  width="100%"')
})

onMounted(() => {
  articleInfo()
})
</script>

<template>
  <div class="normal-card" v-html="content"></div>
</template>
