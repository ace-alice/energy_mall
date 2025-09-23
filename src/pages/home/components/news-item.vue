<template>
  <div
    class="news-item"
    @click="
      router.push({
        name: 'ArticleDetail',
        query: {
          id: item.id
        }
      })
    "
  >
    <van-image
      width="100"
      height="80"
      lazy-load
      radius="8"
      style="flex-shrink: 0; margin-right: 12px"
      :src="item.img"
    />
    <div style="flex-grow: 1; overflow: hidden">
      <div class="title">{{ item.title }}</div>
      <div
        style="height: 28px; font-size: 12px; color: #999; margin-top: 8px"
        v-html="content"
      ></div>
    </div>
    <img class="news-bg" :src="news_bg" alt="" />
  </div>
</template>

<script setup lang="ts" name="TeamItem">
import news_bg from '@/assets/images/background/news_bg.png'
import { htmlDecodeByRegExp } from '@/utils/common'

const router = useRouter()

const props = defineProps(['item'])

const content = computed(() => {
  return htmlDecodeByRegExp(props.item.content)
    .replace('<img', '<img mode="widthFix"')
    .replace(/<[^>]*>/g, '')
})
</script>

<style lang="scss" scoped>
.news-item {
  margin: 12px 0;
  background-color: white;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  position: relative;
  .title {
    line-height: 1.4;
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .news-bg {
    position: absolute;
    height: 20px;
    bottom: 2px;
    right: 10px;
  }
}
</style>
