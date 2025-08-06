<template>
  <div class="avatar-username">
    <van-image :src="userInfo.avatar || avatarIcon" width="74" height="74" round>
      <template v-slot:error>加载失败</template>
    </van-image>
    <van-button type="primary" style="margin: 12px; height: 36px" round>更换头像</van-button>
    <van-cell title="昵称" is-link :value="userInfo.nickname || '暂无昵称'">
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
  </div>
</template>

<script setup lang="ts" name="AvatarUsername">
import avatarIcon from '@/assets/images/common/avatar.png'
import { useCommonStore } from '@/stores/common'
import allowRight from '@/assets/images/icons/allow-right.png'
const { userInfo } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
.avatar-username {
  margin: 16px;
  padding: 24px 0 6px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
