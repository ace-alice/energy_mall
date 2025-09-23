<template>
  <div class="header-box">
    <img :src="homeLogo" height="32" alt="" />
    <div class="box-right">
      <img :src="service_un" width="22" alt="" @click="router.push({ name: 'Service' })" />
    </div>
  </div>
</template>

<script name="InvestHeaderBox" setup lang="ts">
import homeLogo from '@/assets/images/common/home_logo.png'
import service_un from '@/assets/images/tabs/service_un.png'

import { useCommonStore } from '@/stores/common'

const {} = storeToRefs(useCommonStore())

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
