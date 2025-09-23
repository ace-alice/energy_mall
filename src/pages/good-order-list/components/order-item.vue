<script setup lang="ts" name="GoodOrderItem">
const props = defineProps(['item'])

const statusEnum: any = {
  status_0: '待发货',
  status_2: '已完成',
  status_1: '待收货'
}
</script>

<template>
  <div class="normal-card good-order-item">
    <div style="display: flex; align-items: center">
      <van-image width="72" height="72" lazy-load :src="item.good_img" />
      <div style="flex-grow: 1; padding-left: 12px">
        <div style="display: flex; justify-content: space-between; margin-top: 12px">
          <div>{{ item.goods_title }}</div>
          <div style="font-size: 13px">{{ statusEnum[`status_${item.status}`] }}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 12px">
          <div style="font-size: 18px">￥{{ item.money }}</div>
          <div>x1</div>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: flex-end">
      <van-button plain size="small" :to="`/project-detail-normal/${item.goods_id}`"
        >再次购买</van-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.good-order-item {
  border-top: 1px solid #000;
}
</style>
