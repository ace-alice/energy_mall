<script setup lang="ts" name="CouponItem">
import type { CouponItemType } from '@/interface/common'
import status_1 from '@/assets/images/icons/coupon_used.png'

const currency = __VITE_CURRENCY

const { item } = defineProps<{ item: CouponItemType }>()
</script>

<template>
  <div class="normal-card coupon-item">
    <div class="left">
      <span>{{ item.coupon_type == 1 ? '抵扣' : '加息' }}</span
      >{{ Number(item.coupon_amount) }}<span>{{ item.coupon_type == 1 ? currency : '%' }}</span>
    </div>
    <div class="center">
      <div>{{ item.coupon_name }}</div>
      <div>{{ item.coupon_type_text }}</div>
    </div>
    <div class="time">获取时间：{{ item.create_at }}</div>
  </div>
</template>

<style lang="scss" scoped>
.time {
  position: absolute;
  font-size: 10px;
  color: #fff;
  top: 2px;
  left: 16px;
}
.left {
  width: 40%;
  flex-shrink: 0;
  text-align: center;
  font-size: 22px;
  span {
    font-size: 10px;
  }
}
.center {
  flex-grow: 1;
  padding: 0 6px;
  text-align: start;
  & > div:nth-child(1) {
    font-weight: 600;
  }
  & > div:nth-child(2) {
    font-size: 12px;
  }
}
.coupon-item {
  background-color: #13b756;
  position: relative;
  margin: 6px 0;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 28px;
}
</style>
