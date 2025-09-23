<script setup lang="ts" name="RefreshUserInfo">
import { useCommonStore } from '@/stores/common'

const { getUserInfo, getUserDetail } = useCommonStore()

const loading = ref(false)

function refresh() {
  loading.value = true
  getUserInfo()
  getUserDetail()
  setTimeout(() => {
    loading.value = false
  }, 1200)
}
</script>

<template>
  <teleport to="#app">
    <van-button
      class="user-refresh"
      size="small"
      icon="replay"
      type="default"
      :loading="loading"
      round
      @click="refresh"
    />
  </teleport>
</template>

<style lang="scss" scoped>
.user-refresh {
  position: absolute;
  bottom: 70px;
  right: 10px;
  z-index: 1000;
}
</style>
