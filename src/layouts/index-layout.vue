<script setup lang="ts" name="IndexLayout">
import home_se from '@/assets/images/tabs/home_se.png'
import shopping_un from '@/assets/images/tabs/shopping_un.png'
import service_un from '@/assets/images/tabs/service_un.png'
import me_un from '@/assets/images/tabs/me_un.png'
const active = ref(0)

const router = useRouter()
</script>

<template>
  <div class="normal-page">
    <router-view />
    <teleport to="#app">
      <van-tabbar
        v-if="['Home', 'Me', 'Shopping'].includes((router.currentRoute?.value.name as any) || '')"
        v-model="active"
        active-color="#000"
        route
        safe-area-inset-bottom
      >
        <van-tabbar-item to="/index/home">
          <span>首页</span>
          <template #icon="props">
            <img :src="home_se" v-show="props.active" />
            <img :src="home_se" v-show="!props.active" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/index/shopping">
          <span>购物车</span>
          <template #icon="props">
            <img :src="shopping_un" v-show="props.active" />
            <img :src="shopping_un" v-show="!props.active" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/service">
          <span>客服</span>
          <template #icon="props">
            <img :src="service_un" v-show="props.active" />
            <img :src="service_un" v-show="!props.active" /> </template
        ></van-tabbar-item>
        <van-tabbar-item to="/index/me">
          <span>我的</span>
          <template #icon="props">
            <img :src="me_un" v-show="props.active" />
            <img :src="me_un" v-show="!props.active" /> </template
        ></van-tabbar-item>
      </van-tabbar>
    </teleport>
  </div>
</template>

<style lang="scss" scoped></style>
