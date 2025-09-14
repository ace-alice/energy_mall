<template>
  <div class="menu-router">
    <van-cell-group :border="false">
      <van-cell title="外部商城" :border="false" :icon="mall" is-link @click="backMall">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <van-cell title="额度转换" :border="false" :icon="transfer" is-link to="/credit-conversion">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <van-cell title="我的卡券" :border="false" :icon="mall" is-link to="/me-vip">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <van-cell title="资金明细" :border="false" :icon="recharge" is-link to="/fund-detail/in">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <van-cell title="充值记录" :border="false" :icon="transfer" is-link to="/recharge-order-list">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <van-cell title="提现记录" :border="false" :icon="transfer" is-link to="/withdraw-order">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <van-cell title="兑换记录" :border="false" :icon="transfer" is-link to="/good-order-list">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <van-cell title="用户指南" :border="false" :icon="guide" is-link to="/user-guide">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <!-- <van-cell title="贷款" :border="false" :icon="withdraw" is-link to="index">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell> -->
      <!-- <van-cell title="特殊积分" :border="false" :icon="points" is-link to="index">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell> -->
      <!-- <van-cell
        title="会员等级说明"
        :border="false"
        :icon="level_notice"
        is-link
        to="/legend/user_level"
      >
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell> -->
    </van-cell-group>
  </div>
</template>

<script name="VipMenuRouterBox" setup lang="ts">
import allowRight from '@/assets/images/icons/allow-right.png'
import recharge from '@/assets/images/icons/recharge.png'
import mall from '@/assets/images/icons/mall.png'
import withdraw from '@/assets/images/icons/withdraw.png'
import transfer from '@/assets/images/icons/transfer.png'
import guide from '@/assets/images/icons/guide.png'
import level_notice from '@/assets/images/icons/level_notice.png'
import points from '@/assets/images/icons/points.png'

import { useCommonStore } from '@/stores/common'

const { isVip } = storeToRefs(useCommonStore())

const router = useRouter()

function backMall() {
  isVip.value = false
  router.push({ name: 'MeNormal' })
}
</script>

<style lang="scss" scoped>
.menu-router {
  padding: 8px 0;
  margin: 16px;
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  &:deep(.van-cell__title) {
    font-size: 14px;
    font-weight: 600;
  }
  &:deep(.van-cell__left-icon) {
    display: flex;
    align-items: center;

    .van-icon__image {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
