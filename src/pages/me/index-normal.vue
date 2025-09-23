<script setup name="MeNormal" lang="ts">
import MeHeaderBox from './components/me-header-box.vue'
import bg03 from '@/assets/images/background/bg-3.png'
import UserInfoBox from './components/user-info.vue'
import MoneyInfoBox from './components/money-info.vue'
import OrderEnterBox from './components/order-enter.vue'
import MenuRouterBox from './components/menu-router.vue'
</script>

<template>
  <div class="normal-page">
    <BgTwo :imgSrc="bg03" router="MeNormal" />
    <HomeHeader :imgSrc="bg03">
      <template #box>
        <MeHeaderBox />
      </template>
    </HomeHeader>
    <div class="me-box">
      <UserInfoBox />
      <MoneyInfoBox />
      <OrderEnterBox />
      <MenuRouterBox />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
