<template>
  <div class="user-info">
    <div class="avatar">
      <img :src="userInfo.avatar || avatarIcon" width="100%" alt="" />
    </div>
    <div>
      <div class="user-level">
        <img :src="hiIcon" width="22" style="margin-right: 4px" alt="" />
        <div>{{ userInfo.username || userInfo.phone2 }}</div>
        <img
          :src="getIconByLevel(userInfo.level)"
          height="20"
          style="margin-left: 4px"
          alt=""
          srcset=""
        />
      </div>
      <div class="level">等级: {{ userInfo.level_name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="UserInfoBox">
import hiIcon from '@/assets/images/icons/hi.png'
import { useCommonStore } from '@/stores/common'
import avatarIcon from '@/assets/images/common/avatar.png'
import { getIconByLevel } from '@/utils/level'

const { userInfo } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 0 16px;
  .user-level {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }
}
.avatar {
  height: 74px;
  width: 74px;
  border: 6px solid white;
  border-radius: 50%;
  margin-right: 12px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
}

.level {
  font-size: 12px;
  opacity: 0.7;
}
</style>
