<template>
  <div class="order-enter">
    <div class="menu">
      <div>我的订单</div>
      <div @click="router.push({ name: 'GoodOrderList' })">
        <div>全部订单</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div>
      <div
        v-for="enter in enterList"
        @click="router.push({ name: 'GoodOrderList', query: { tab: enter.tab } })"
      >
        <img :src="enter.img" alt="" srcset="" height="28" width="28" />
        <div>{{ enter.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="OrderEnterBox">
import already from '@/assets/images/icons/already.png'
import will_dev from '@/assets/images/icons/will_dev.png'
import will_send from '@/assets/images/icons/will_send.png'

const router = useRouter()

const enterList = [
  { text: '待发货', img: will_send, tab: 0 },
  { text: '待收货', img: will_dev, tab: 1 },
  { text: '已完成', img: already, tab: 2 }
]
</script>

<style lang="scss" scoped>
.order-enter {
  background-color: white;
  padding: 8px 16px;
  margin: 0 16px;
  border-radius: 16px;
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    & > div {
      padding: 0 8px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        margin-bottom: 8px;
      }
    }
  }
  .menu {
    & > div {
      padding: 4px 8px 0;
    }
    & > div:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
    }
    & > div:nth-child(2) {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
