<script setup lang="ts" name="ServiceReg">
import allowRight from '@/assets/images/icons/allow-right.png'
</script>

<template>
  <div class="normal-page">
    <NormalHeader title="用户协议"> </NormalHeader>
    <van-cell title="服务协议" is-link to="/service-private">
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
    <van-cell title="隐私协议" is-link to="/reg-private">
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
  </div>
</template>
