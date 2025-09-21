<script setup lang="ts" name="RegPrivate">
import service_un from '@/assets/images/tabs/service_un.png'
import { title } from 'process'
const router = useRouter()

const formData = reactive({
  type: '1',
  scene: '1',
  way: '1',
  suggest: ''
})

const types = [
  { id: '1', title: '功能异常' },
  { id: '2', title: '界面优化' },
  { id: '3', title: '产品建议' },
  { id: '4', title: '其他' }
]

const scenes = [
  { id: '1', title: '功能异常' },
  { id: '2', title: '界面优化' },
  { id: '3', title: '产品建议' },
  { id: '4', title: '其他' }
]

const channels = [
  { id: '1', title: '网络平台' },
  { id: '2', title: '亲朋好友' },
  { id: '3', title: '门店商铺' },
  { id: '4', title: '其他' }
]

function onAdd() {}
</script>

<template>
  <div class="normal-page">
    <NormalHeader title="意见反馈">
      <template #right>
        <img :src="service_un" width="22" alt="" @click="router.push({ name: 'Service' })" />
      </template>
    </NormalHeader>
    <div class="normal-card">
      <div class="title">问题类型</div>
      <van-radio-group v-model="formData.type" icon-size="20" checked-color="#000">
        <van-radio :name="item.id" v-for="item in types">{{ item.title }}</van-radio>
      </van-radio-group>
    </div>
    <div class="normal-card">
      <div class="title">问题发生的场景</div>
      <van-radio-group v-model="formData.scene" icon-size="20" checked-color="#000">
        <van-radio :name="item.id" v-for="item in scenes">{{ item.title }}</van-radio>
      </van-radio-group>
    </div>
    <div class="normal-card">
      <div class="title">了解Iberdrola的途径</div>
      <van-radio-group v-model="formData.way" icon-size="20" checked-color="#000">
        <van-radio :name="item.id" v-for="item in channels">{{ item.title }}</van-radio>
      </van-radio-group>
    </div>
    <div class="title" style="margin-top: 16px; margin-left: 16px">问题和意见</div>
    <div class="normal-card" style="padding: 16px 0">
      <van-cell-group inset>
        <van-field
          v-model="formData.suggest"
          rows="4"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请描述你的问题和意见…"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <van-sticky :offset-bottom="50" position="bottom">
      <div style="margin: 60px 16px 20px">
        <van-button type="primary" round block @click="onAdd">提交反馈</van-button>
      </div>
    </van-sticky>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 600;
}
:deep(.van-radio-group) {
  display: flex;
  flex-wrap: wrap;
  .van-radio {
    width: 50%;
    margin-top: 16px;
  }
}
</style>
