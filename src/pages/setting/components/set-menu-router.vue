<template>
  <div class="set-menu-router">
    <van-cell title="修改登录密码" is-link>
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
    <van-cell title="修改支付密码" is-link>
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
    <van-cell title="地址管理" is-link to="/address">
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
    <van-cell title="意见反馈" is-link>
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
    <van-cell title="隐私政策" is-link>
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
  </div>
</template>

<script setup lang="ts" name="SetMenuRouter">
import allowRight from '@/assets/images/icons/allow-right.png'
import { useCommonStore } from '@/stores/common'
const { userInfo } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
.set-menu-router {
  margin: 16px;
  padding: 4px 0;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
