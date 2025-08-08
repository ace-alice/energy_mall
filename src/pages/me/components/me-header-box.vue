<template>
  <div class="header-box">
    <img :src="homeLogo" height="32" alt="" />
    <div class="box-right">
      <img
        v-if="isVip"
        :src="service_un"
        width="22"
        alt=""
        @click="router.push({ name: 'Service' })"
        style="margin-right: 24px"
      />
      <img :src="settingIcon" width="22" alt="" @click="router.push({ name: 'Setting' })" />
      <div class="right-img" @click="router.push({ name: 'Signin' })" v-if="!isVip">
        <img :src="signinIcon" class="arrow-left" width="20" alt="" />
        <img :src="priceIcon" class="price" width="20" alt="" />
      </div>
    </div>
  </div>
</template>

<script name="MeHeaderBox" setup lang="ts">
import homeLogo from '@/assets/images/common/home_logo.png'
import settingIcon from '@/assets/images/icons/me_setting.png'
import signinIcon from '@/assets/images/icons/signin.png'
import priceIcon from '@/assets/images/icons/price.png'
import service_un from '@/assets/images/tabs/service_un.png'
import { useCommonStore } from '@/stores/common'

const { userInfo, isVip } = storeToRefs(useCommonStore())

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
  margin-left: 24px;

  .price {
    position: absolute;
    left: 16px;
    top: -5px;
  }
}
</style>
