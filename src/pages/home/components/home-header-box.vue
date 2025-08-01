<template>
  <div class="header-box">
    <img :src="homeLogo" height="32" alt="" />
    <div class="box-right">
      <img
        :src="searchIcon"
        style="margin-right: 24px"
        width="22"
        alt=""
        @click="router.push({ name: 'HomeSearch' })"
      />
      <div class="right-img" @click="router.push({ name: 'Signin' })">
        <img :src="signinIcon" class="arrow-left" width="20" alt="" />
        <img :src="priceIcon" class="price" width="20" alt="" />
      </div>
    </div>
  </div>
</template>

<script name="HomeHeaderBox" setup lang="ts">
import homeLogo from '@/assets/images/common/home_logo.png'
import searchIcon from '@/assets/images/icons/search.png'
import signinIcon from '@/assets/images/icons/signin.png'
import priceIcon from '@/assets/images/icons/price.png'

const router = useRouter()
</script>

<style lang="scss" scoped>
.header-box {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.box-right {
  display: flex;
  align-items: center;

  img {
    cursor: pointer;
  }
}

.arrow-left {
  padding-right: 12px;
}

.right-img {
  position: relative;
  cursor: pointer;

  .price {
    position: absolute;
    left: 16px;
    top: -5px;
  }
}
</style>
