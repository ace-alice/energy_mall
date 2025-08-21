<script setup lang="ts" name="RegPrivate">
import service_un from '@/assets/images/tabs/service_un.png'
const router = useRouter()

const formData = reactive({
  type: '1',
  scene: '1',
  way: '1',
  suggest: ''
})

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
        <van-radio name="1">功能异常</van-radio>
        <van-radio name="2">界面优化</van-radio>
        <van-radio name="3">产品建议</van-radio>
        <van-radio name="4">其他</van-radio>
      </van-radio-group>
    </div>
    <div class="normal-card">
      <div class="title">问题发生的场景</div>
      <van-radio-group v-model="formData.scene" icon-size="20" checked-color="#000">
        <van-radio name="1">功能异常</van-radio>
        <van-radio name="2">界面优化</van-radio>
        <van-radio name="3">产品建议</van-radio>
        <van-radio name="4">其他</van-radio>
      </van-radio-group>
    </div>
    <div class="normal-card">
      <div class="title">了解曼鸥甄品的途径</div>
      <van-radio-group v-model="formData.way" icon-size="20" checked-color="#000">
        <van-radio name="1">网络平台</van-radio>
        <van-radio name="2">亲朋好友</van-radio>
        <van-radio name="3">门店商铺</van-radio>
        <van-radio name="4">其他</van-radio>
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
