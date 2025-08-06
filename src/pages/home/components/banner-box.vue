<template>
  <div v-if="images.length > 0">
    <van-swipe :autoplay="3000" lazy-render height="360" class="home-swipe">
      <van-swipe-item v-for="image in images" :key="image.id">
        <div class="item-box">
          <img :src="image.img" width="100%" />
          <div class="info">
            <div>{{ image.title }}</div>
            <div>{{ image.content }}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts" name="BannerBox">
import { bannerApi } from '@/api/index'
import type { BannerItem } from '@/interface/common'

const images = ref<BannerItem[]>([])

function getBanners() {
  bannerApi().then((res) => {
    if (res.data.data.length > 0) {
      images.value = res.data.data
    }
  })
}
onMounted(() => {
  getBanners()
})
</script>

<style lang="scss" scoped>
.home-swipe {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
}
.item-box {
  position: relative;
  width: 100%;
  height: 100%;
  .info {
    position: absolute;
    top: 60px;
    left: 20px;
    color: #0f5438;
    div:nth-child(1) {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    div:nth-child(2) {
      font-size: 12px;
    }
  }
}
</style>
