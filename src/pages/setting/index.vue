<script setup name="Setting" lang="ts">
import AvatarUsernameBox from './components/avatar-username.vue'
import RealNamePhoneBox from './components/real-name-phone.vue'
import SetMenuRouterBox from './components/set-menu-router.vue'
import LoginOutBox from './components/logout.vue'
</script>

<template>
  <div class="normal-page">
    <NormalHeader title="账号设置" />
    <AvatarUsernameBox />
    <RealNamePhoneBox />
    <SetMenuRouterBox />
    <LoginOutBox />
  </div>
</template>

<style lang="scss" scoped></style>
