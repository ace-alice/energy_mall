<script setup lang="ts" name="CouponItem">
import type { CouponItemType } from '@/interface/common'
import status_1 from '@/assets/images/icons/coupon_used.png'

const currency = __VITE_CURRENCY

const { item } = defineProps<{ item: CouponItemType }>()
</script>

<template>
  <div class="coupon-item">
    <div class="left">
      <span>{{ item.coupon_type == 1 ? '抵扣' : '加息' }}</span
      >{{ Number(item.coupon_amount) }}<span>{{ item.coupon_type == 1 ? currency : '%' }}</span>
    </div>
    <div class="center">
      <div>{{ item.coupon_name }}</div>
      <div>{{ item.coupon_type_text }}</div>
    </div>
    <div class="right">
      <van-button v-if="item.status == 0" type="default" round block to="/invest" size="small"
        >使用</van-button
      >
      <img v-else height="50" width="65" :src="status_1" alt="" />
    </div>
    <div class="time">获取时间：{{ item.create_at }}</div>
  </div>
</template>

<style lang="scss" scoped>
.time {
  position: absolute;
  font-size: 10px;
  color: #fff;
  top: 18px;
  left: 22%;
}
.left {
  width: 27.5%;
  flex-shrink: 0;
  text-align: center;
  font-size: 22px;
  padding-left: 10px;
  span {
    font-size: 10px;
  }
}
.center {
  flex-grow: 1;
  padding: 0 12px;
  & > div:nth-child(1) {
    margin: 6px 0;
    font-weight: 600;
  }
  & > div:nth-child(2) {
    font-size: 12px;
    color: #13b756;
  }
}
.right {
  width: 27.5%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding-right: 20px;
  padding-left: 10px;
}
.coupon-item {
  height: 126px;
  margin: 0 2px 0 12px;
  background-image: url('@/assets/images/background/coupon_bg.png');
  background-size: 100% 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
</style>
