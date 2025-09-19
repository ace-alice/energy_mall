<script setup lang="ts" name="CouponItem">
const props = defineProps(['item'])

const statusEnum: any = {
  status_0: '待发货',
  status_2: '已完成',
  status_1: '待收货'
}
</script>

<template>
  <div class="good-order-item"></div>
</template>

<style lang="scss" scoped>
.good-order-item {
  height: 126px;
  margin: 0 2px 0 12px;
  background-image: url('@/assets/images/background/coupon_bg.png');
  background-size: 100% 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
