<script setup name="Shopping" lang="ts">
import homeLogo from '@/assets/images/common/home_logo.png'
import service_un from '@/assets/images/tabs/service_un.png'
import CartShopCartItem from './components/shop-cart-item.vue'

import { useShopCartStore } from '@/stores/shopCart'
const router = useRouter()

const { searchText, filterCart, checkedCart, allCheck, totalPrice } =
  storeToRefs(useShopCartStore())

const { onSubmit, changeCheck } = useShopCartStore()
</script>

<template>
  <div class="normal-page">
    <BgTwo router="Shopping" />
    <HomeHeader>
      <template #box>
        <div class="header-box">
          <img :src="homeLogo" height="32" alt="" />
          <img :src="service_un" width="22" alt="" @click="router.push({ name: 'Service' })" />
        </div>
        <div style="padding: 0 16px" class="search">
          <van-field
            v-model="searchText"
            placeholder="请输入要搜索的内容"
            autocomplete="off"
            right-icon="search"
          />
          <div class="search-icon" @click="searchText = ''">
            <van-icon name="filter-o" size="20" v-if="!searchText" />
            <van-icon name="cross" size="20" v-else />
          </div>
        </div>
      </template>
    </HomeHeader>
    <div>
      <van-checkbox-group v-model="checkedCart" v-if="filterCart.length > 0" checked-color="#000">
        <CartShopCartItem v-for="item in filterCart" :key="item.id" :item="item" />
      </van-checkbox-group>
      <van-empty description="暂无数据" v-else />
    </div>
    <van-sticky :offset-bottom="80" position="bottom">
      <div class="submit-bar">
        <div>
          <van-checkbox v-model="allCheck" checked-color="#000" @click="changeCheck"
            >全选</van-checkbox
          >
        </div>
        <div style="font-size: 12px; flex-grow: 1; padding-left: 12px">
          总计¥
          <VueCountTo style="font-size: 16px; font-weight: 600" :end-val="totalPrice" />
        </div>
        <van-button
          style="width: 80px"
          type="primary"
          round
          size="small"
          :disabled="checkedCart.length < 1"
          >结算({{ checkedCart.length }})</van-button
        >
      </div>
    </van-sticky>
  </div>
</template>

<style lang="scss" scoped>
.submit-bar {
  position: absolute;
  bottom: 80px;
  left: 12%;
  width: 76%;
  padding: 8px;
  border-radius: 28px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}
.header-box {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
.search {
  display: flex;
  align-items: center;
  .search-icon {
    height: 44px;
    width: 44px;
    border-radius: 22px;
    background-color: #fff;
    margin-left: 12px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:deep(.van-field) {
    border-radius: 30px;
    margin: unset;
    .van-field__body {
      padding-left: 12px;
    }
  }
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
