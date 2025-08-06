<script setup name="MeVip" lang="ts">
import MeHeaderBox from './components/me-header-box.vue'
import bg03 from '@/assets/images/background/bg-3.png'
import UserInfoBox from './components/user-info.vue'
import VipMoneyInfoBox from './components/vip-money-info.vue'
import VipServerEnterBox from './components/vip-server-enter.vue'
import VipMenuRouterBox from './components/vip-menu-router.vue'
</script>

<template>
  <div class="normal-page">
    <BgTwo :imgSrc="bg03" router="MeVip" />
    <HomeHeader :imgSrc="bg03">
      <template #box>
        <MeHeaderBox />
      </template>
    </HomeHeader>
    <div class="me-box">
      <UserInfoBox />
      <VipMoneyInfoBox />
      <VipServerEnterBox />
      <VipMenuRouterBox />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
