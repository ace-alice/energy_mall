<script setup lang="ts" name="Legend">
import { articleInfoApi } from '@/api'
import type { ArticleInfoType } from '@/interface/common'
import market_rule from '@/assets/images/background/rules.png'
import user_level from '@/assets/images/background/user_level.png'
import team_level from '@/assets/images/background/team.png'
import { useCommonStore } from '@/stores/common'
import { htmlDecodeByRegExp } from '@/utils/common'

const { mediaQueryInfo } = storeToRefs(useCommonStore())

const route = useRoute()
const code = route.params['code']

const articleInfo = ref<ArticleInfoType>({ content: '', title: '' } as ArticleInfoType)

function getTitle() {
  switch (code) {
    case 'market_rule':
      return '市场制度说明'
    case 'team_level':
      return '团队等级说明'
    case 'user_level':
      return '会员等级说明'
    default:
      return '会员等级说明'
  }
}

function getImg() {
  switch (code) {
    case 'market_rule':
      return market_rule
    case 'team_level':
      return team_level
    case 'user_level':
      return user_level
    default:
      return user_level
  }
}

function getArticleInfo() {
  articleInfoApi({ code }).then((res) => {
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
  <div
    class="normal-page legend"
    :style="{
      '--top': `${mediaQueryInfo.top}px`
    }"
  >
    <div class="header">
      <img :src="getImg()" alt="" />
      <NormalHeader :background="false" />
      <div class="title">
        {{ getTitle() }}
      </div>
    </div>
    <div class="normal-card content-box" v-html="content"></div>
  </div>
</template>

<style lang="scss" scoped>
.content-box {
  flex-grow: 1;
  transform: translateY(-10px);
  overflow: auto;
}
.legend {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  .header {
    position: relative;
    .title {
      height: 110px;
      z-index: 10;
      padding-top: 40px;
      margin-left: 70px;
      font-size: 18px;
      font-weight: 600;
    }
    img {
      width: 100%;
      position: absolute;
      bottom: -100px;
      left: 0;
      z-index: -1;
    }
  }
}
</style>
