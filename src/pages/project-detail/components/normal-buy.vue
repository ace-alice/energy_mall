<template>
  <div class="buy-box">
    <div @click="router.push({ name: 'Service' })">
      <img :src="service_2" height="20" alt="" />
      <div>客服</div>
    </div>
    <div>
      <img :src="share" height="20" alt="" />
      <div>分享</div>
    </div>
    <van-button
      class="shop-button"
      round
      size="large"
      block
      type="primary"
      @click="toAddShopCart(item)"
    >
      {{ !!hasCart ? '查看' : '加入' }}购物车
    </van-button>
    <van-button class="submit-button" round size="large" block type="primary">
      立即购买
    </van-button>
  </div>
</template>

<script setup lang="ts" name="NormalBuy">
import service_2 from '@/assets/images/icons/service_2.png'
import share from '@/assets/images/icons/share.png'
import type { ProjectItemType } from '@/interface/common'
import { useShopCartStore } from '@/stores/shopCart'
const props = defineProps(['item'])

const router = useRouter()

const { addShopCart } = useShopCartStore()

function toAddShopCart(item: ProjectItemType) {
  if (!!hasCart.value) {
    router.push({ name: 'Shopping' })
  } else {
    addShopCart(item)
  }
}

const { shopCartList } = storeToRefs(useShopCartStore())

const hasCart = computed(() => {
  return !!shopCartList.value.find((item1) => props.item?.id == item1.id)
})
</script>

<style lang="scss" scoped>
.buy-box {
  position: fixed;
  height: 68px;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 0 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  font-size: 12px;
  & > div {
    width: 60px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.shop-button {
  background-color: #13b756;
  color: #222;
  border: none;
  margin-right: 12px;
}
</style>
