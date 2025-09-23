<script setup lang="ts" name="TitleDel">
import titleDelIcon from '@/assets/images/icons/title_del.png'
const props = defineProps(['title'])
</script>

<template>
  <div class="title">
    <img :src="titleDelIcon" alt="" />
    <div style="margin: 0 16px">{{ title }}</div>
    <img class="rotateZ" :src="titleDelIcon" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  img {
    height: 13px;
    flex-grow: 1;
  }
  div {
    flex-shrink: 0;
  }
  .rotateZ {
    transform: rotateZ(180deg);
  }
}
</style>
