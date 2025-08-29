<template>
  <div>
    <img :src="nice_p" height="32" alt="" style="padding: 12px 8px" />
    <van-empty description="暂无数据" v-if="!list.length" />
    <van-grid :border="false" :column-num="3" gutter="8" v-else>
      <van-grid-item v-for="item in list" :key="item.id" :to="`/project-detail-normal/${item.id}`">
        <div class="project-item">
          <van-image width="100%" height="110" lazy-load :src="item.img" />
          <div class="p-info">
            <div>{{ item.title }}</div>
            <div style="display: flex; justify-content: space-between; margin-top: 8px">
              <div>¥{{ item.price || '0.00' }}</div>
              <van-icon name="play-circle" />
            </div>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup lang="ts" name="NiceGoodsBox">
import nice_p from '@/assets/images/icons/nice_p.png'

const props = defineProps(['list'])
</script>

<style lang="scss" scoped>
:deep(.van-grid-item__content) {
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
  background-color: white;
}
.project-item {
  background-color: white;
  width: 100%;
  .p-info {
    height: 42px;
    margin-top: 4px;
    padding: 0 12px;
    font-size: 12px;
    & > div:nth-child(1) {
      text-overflow: ellipsis;
      text-wrap: nowrap;
      max-width: 80px;
      overflow: hidden;
    }
    & > div:nth-child(2) {
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
    }
  }
}
</style>
