<template>
  <van-grid square :border="false" class="home-enter" :column-num="5" icon-size="36" clickable>
    <van-grid-item
      v-for="rout in routerList"
      :key="rout.router"
      :icon="rout.icon"
      :text="rout.title"
      :to="rout.router"
    />
  </van-grid>
</template>

<script setup lang="ts" name="ComIntroduce">
import sigin from '@/assets/images/icons/sigin.png'
import intro from '@/assets/images/icons/com.png'
import intIcon from '@/assets/images/icons/int.png'
import price_enter from '@/assets/images/icons/price_enter.png'
import book from '@/assets/images/icons/book.png'

const routerList = [
  {
    title: '签到有礼',
    icon: sigin,
    router: '/signin'
  },
  {
    title: '公司介绍',
    icon: intro,
    router: ''
  },
  {
    title: '邀请好友',
    icon: intIcon,
    router: '/invite'
  },
  {
    title: '幸运抽奖',
    icon: price_enter,
    router: ''
  },
  {
    title: '知识课堂',
    icon: book,
    router: ''
  }
]
</script>

<style lang="scss" scoped>
.home-enter {
  background: unset !important;
  &:deep(.van-grid-item__content) {
    background: none !important;
  }
}
</style>
