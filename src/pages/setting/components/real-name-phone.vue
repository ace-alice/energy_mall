<template>
  <div class="real-name-phone">
    <van-cell title="手机号码" is-link :value="userInfo.nickname || '暂无昵称'">
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
    <van-cell title="实名认证" is-link :value="userInfo.nickname || '暂无昵称'">
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
  </div>
</template>

<script setup lang="ts" name="RealNamePhone">
import allowRight from '@/assets/images/icons/allow-right.png'
import { useCommonStore } from '@/stores/common'
const { userInfo } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
.real-name-phone {
  margin: 16px;
  padding: 4px 0;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
