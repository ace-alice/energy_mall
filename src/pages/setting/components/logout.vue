<template>
  <div style="margin: 16px">
    <van-button size="large" @click="loginOut" style="border: unset">退出登录</van-button>
  </div>
</template>

<script setup lang="ts" name="LoginOut">
import { useCommonStore } from '@/stores/common'
const { loginOut } = useCommonStore()
</script>

<style lang="scss" scoped></style>
