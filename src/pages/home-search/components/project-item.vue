<template>
  <div class="project-item">
    <van-image width="100%" height="140" lazy-load :src="item.img" />
    <div class="p-info">
      <div>{{ item.title }}</div>
      <div>¥{{ item.price || '0.00' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ProjectItem">
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
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
    }
  }
}
</style>
