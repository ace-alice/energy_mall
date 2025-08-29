<template>
  <div style="margin-top: 240px" v-if="!projectDetail.id">
    <van-loading vertical>
      <template #icon>
        <van-icon name="star-o" size="30" />
      </template>
      加载中...
    </van-loading>
  </div>
  <div
    class="normal-page"
    v-else
    :style="{
      '--height': `${mediaQueryInfo.top + 20}px`
    }"
  >
    <div class="back" @click="router.back()">
      <img :src="backIcon" height="20" width="20" alt="" />
    </div>
    <van-image width="100%" style="aspect-ratio: 1/1" :src="projectDetail.img" />
    <div class="good-price">
      <div>¥</div>
      <div>{{ projectDetail.price }}</div>
      <div>¥{{ projectDetail.original_price }}</div>
      <div>已出售{{ '100' }}+</div>
    </div>
    <div style="padding: 0 16px">
      <div class="title">{{ projectDetail.title }}</div>
    </div>
    <div class="ways" v-if="projectDetail.type != 2">
      <img :src="send_way" width="20" height="20" alt="" />
      <div style="flex-grow: 1; font-weight: 600">配送方式</div>
      <div style="font-size: 14px">物流配送</div>
      <van-icon name="play" />
    </div>
    <div class="ways" v-if="false">
      <img :src="mallIcon" width="20" height="20" alt="" />
      <div style="flex-grow: 1; font-weight: 600">优惠券</div>
      <div style="font-size: 14px">2张</div>
      <van-icon name="play" />
    </div>
    <div style="font-size: 17px; padding: 0 16px 16px">图文介绍</div>
    <div style="padding: 0 16px 60px">
      <div v-html="content"></div>
    </div>
    <NormalBuy :item="projectDetail" />
  </div>
</template>

<script setup lang="ts" name="ProjectDetailNormal">
import { getProjectDetailApi } from '@/api'
import type { ProjectItemType } from '@/interface/common'
import backIcon from '@/assets/images/icons/back_white_icon.png'
import NormalBuy from './components/normal-buy.vue'
import send_way from '@/assets/images/icons/send_way.png'
import mallIcon from '@/assets/images/icons/mall.png'
import { useCommonStore } from '@/stores/common'
import { htmlDecodeByRegExp } from '@/utils/common'

const { mediaQueryInfo } = storeToRefs(useCommonStore())

const router = useRouter()
const route = useRoute()

const projectDetail = reactive<ProjectItemType>({} as ProjectItemType)

function getProjectDetail(id: string) {
  getProjectDetailApi({ id }).then((res) => {
    Object.assign(projectDetail, res.data.data)
  })
}

const content = computed(() => {
  return htmlDecodeByRegExp(projectDetail.content).replace(/<img/g, '<img  width="100%"')
})

onMounted(() => {
  if (route.params.id) {
    getProjectDetail(route.params.id.toString())
  } else {
    router.push({ name: 'HomeSearch' })
  }
})
</script>

<style lang="scss" scoped>
.ways {
  margin: 0 16px 16px;
  background-color: #f9f9f9;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 6px;
  & > * + * {
    margin-left: 6px;
  }
}
.title {
  padding: 20px 0;
  font-size: 18px;
  font-size: 600;
}
.good-price {
  width: 100%;
  height: 60px;
  background-color: #13b756;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #fff;
  & > div {
    &:nth-child(1) {
      margin-top: 8px;
      margin-right: 2px;
    }
    &:nth-child(2) {
      font-size: 32px;
    }
    &:nth-child(3) {
      flex-grow: 1;
      padding: 0 20px;
      opacity: 0.8;
      text-decoration: line-through;
      font-size: 14px;
    }
    &:nth-child(4) {
      opacity: 0.8;
      font-size: 14px;
    }
  }
}
.back {
  position: fixed;
  top: var(--height);
  left: 16px;
  z-index: 100;
  height: 40px;
  width: 40px;
  border-radius: 28px;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
}
.normal-page {
  background-color: #fff;
}
</style>
