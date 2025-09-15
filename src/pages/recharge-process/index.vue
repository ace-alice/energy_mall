<template>
  <div class="normal-page">
    <BgTwo router="RechargeProcess" />
    <NormalHeader :background="false" title="充值流程"> </NormalHeader>
    <div style="margin-top: 240px" v-if="!articleInfo.id">
      <van-loading vertical>
        <template #icon>
          <van-icon name="star-o" size="30" />
        </template>
        加载中...
      </van-loading>
    </div>
    <div class="c-box" v-else>
      <div class="h-box">{{ articleInfo.title }}</div>
      <div class="b-box">
        <div class="box" v-html="content"></div>
        <!-- <van-steps direction="vertical" :active="-1">
          <van-step>
            <h3>STEP 1</h3>
            <p class="step">点击[我的]</p>
          </van-step>
          <van-step>
            <h3>STEP 2</h3>
            <p class="step">点击进入 [钱包]界面</p>
          </van-step>
          <van-step>
            <h3>STEP 3</h3>
            <p class="step">点击进入 [钱包]界面点击进入 [钱包]</p>
          </van-step>
          <van-step>
            <h3>STEP 4</h3>
            <p class="step">点击进入 [钱包]界面点击进入 [钱包]</p>
          </van-step>
          <van-step>
            <h3>STEP 5</h3>
            <p class="step">点击进入 [钱包]界面点击进入 [钱包]</p>
          </van-step>
          <van-step>
            <h3>STEP 6</h3>
            <p class="step">点击进入 [钱包]界面点击进入 [钱包]</p>
          </van-step>
        </van-steps> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RechargeProcess">
import { articleInfoApi } from '@/api'
import type { ArticleInfoType } from '@/interface/common'
import { htmlDecodeByRegExp, isVideoUrl } from '@/utils/common'

const route = useRoute()

const articleInfo = ref<ArticleInfoType>({ content: '', title: '' } as ArticleInfoType)

function getArticleInfo() {
  const obj: any = {}
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

<style lang="scss" scoped>
.c-box {
  margin: 16px;
  background-color: #13b756;
  border-radius: 16px;
  overflow: hidden;
  .b-box {
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    padding: 8px;
  }
  .h-box {
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    color: #fff;
    font-weight: 600;
  }
}
h3 {
  color: #13b756;
}
step {
  color: #222;
}
</style>
