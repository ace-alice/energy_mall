<template>
  <div class="order-enter">
    <div v-for="enter in enterList">
      <img :src="enter.img" alt="" srcset="" height="32" width="32" />
      <div>{{ enter.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="OrderEnterBox">
import wallet from '@/assets/images/icons/wallet.png'
import g_pig from '@/assets/images/icons/g_pig.png'
import transfer_1 from '@/assets/images/icons/transfer_1.png'
import rich from '@/assets/images/icons/rich.png'

const enterList = [
  { text: '官方承兑', img: wallet, router: '/' },
  { text: '转账', img: transfer_1, router: '/' },
  { text: '存钱罐', img: g_pig, router: '/' },
  { text: '聚宝盆', img: rich, router: '/' }
]
</script>

<style lang="scss" scoped>
.order-enter {
  background-color: white;
  padding: 16px;
  margin: 0 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
