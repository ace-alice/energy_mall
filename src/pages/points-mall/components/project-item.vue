<template>
  <div class="project-item">
    <van-image width="100%" height="140" lazy-load :src="item.img" />
    <div class="p-info">
      <div>{{ item.title }}</div>
      <div>
        <img :src="starIcon" height="24" width="24" style="margin-right: 4px" alt="" />
        {{ item.price || '0.00' }}
      </div>
    </div>
    <div style="padding: 12px">
      <van-button type="primary" size="small" block>去兑换</van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="ProjectItem">
import starIcon from '@/assets/images/icons/star.png'
const props = defineProps(['item'])
</script>

<style lang="scss" scoped>
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
      max-width: 125px;
      overflow: hidden;
    }
    & > div:nth-child(2) {
      font-size: 22px;
      color: #ff4949;
      font-weight: 600;
      margin-top: 4px;
      display: flex;
    }
  }
}
</style>
