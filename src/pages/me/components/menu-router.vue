<template>
  <div class="menu-router">
    <van-cell-group :border="false">
      <van-cell
        title="会员专属商场"
        :border="false"
        :icon="mall"
        is-link
        to="/me-vip"
        @click="toVipPage"
      >
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <van-cell title="充值" :border="false" :icon="recharge" is-link to="/recharge">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <van-cell title="提现" :border="false" :icon="withdraw" is-link to="/withdraw">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
      <!-- <van-cell title="转账" :border="false" :icon="transfer" is-link to="/transfer">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell> -->
      <van-cell title="额度转换" :border="false" :icon="transfer" is-link to="/credit-conversion">
        <template #right-icon>
          <img :src="allowRight" width="20" height="20" alt="" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script name="MenuRouterBox" setup lang="ts">
import allowRight from '@/assets/images/icons/allow-right.png'
import recharge from '@/assets/images/icons/recharge.png'
import mall from '@/assets/images/icons/mall.png'
import withdraw from '@/assets/images/icons/withdraw.png'
import transfer from '@/assets/images/icons/transfer.png'
import { useCommonStore } from '@/stores/common'

const { isVip } = storeToRefs(useCommonStore())

function toVipPage() {
  isVip.value = true
}

const router = useRouter()
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
