<script setup lang="ts" name="CartShopCartItem">
import { useShopCartStore } from '@/stores/shopCart'

const { delShopCart } = useShopCartStore()
const props = defineProps(['item'])
</script>

<template>
  <div class="normal-card">
    <van-swipe-cell>
      <div class="shop-item">
        <van-checkbox :name="item.id.toString()" style="flex-shrink: 0"></van-checkbox>
        <van-image
          width="80px"
          style="aspect-ratio: 1/1; margin: 0 12px; flex-shrink: 0"
          :src="item.good_img"
        />
        <div class="info">
          <div class="good-name">{{ item.good_name }}acsacascascascasc</div>
          <div class="price">
            <div>¥{{ item.price }}</div>
            <div>x1</div>
          </div>
        </div>
      </div>
      <!-- 右侧滑动操作 -->
      <template #right>
        <van-button
          type="danger"
          style="height: 100%; width: 100%"
          text="删除"
          @click="delShopCart(item.id.toString())"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<style lang="scss" scoped>
.shop-item {
  display: flex;
  align-items: center;
  .info {
    flex-grow: 1;
    height: 80px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 0;
    .good-name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: nowrap;
    }
    .price {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      & > div:nth-child(1) {
        font-size: 16px;
        font-weight: 600;
      }
      & > div:nth-child(2) {
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 12px;
        border: 1px solid #22222290;
      }
    }
  }
}
</style>
