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
    <van-button class="submit-button" round size="large" block type="primary"> 提交 </van-button>
  </div>
</template>

<script setup lang="ts" name="NormalBuy">
import service_2 from '@/assets/images/icons/service_2.png'
import share from '@/assets/images/icons/share.png'
const router = useRouter()
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
</style>
