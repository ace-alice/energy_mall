<script setup lang="ts" name="GoodsCount">
const currency = __VITE_CURRENCY
const props = defineProps(['item', 'isPoint'])

const count = ref(1)
</script>

<template>
  <div class="normal-card">
    <div class="flex-between">
      <van-image width="60" height="60" lazy-load :src="item.good_img" />
      <div
        style="
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 12px;
        "
      >
        <div>{{ item.title }}</div>
        <div style="display: flex; justify-content: space-between; margin-top: 12px">
          <div style="color: #d95555; font-size: 18px">
            {{ isPoint ? '积分' : currency }} {{ item.price }}
          </div>
          <van-stepper v-model="count" disabled />
        </div>
      </div>
    </div>
    <van-divider />
    <div class="flex-between">
      <div>合计</div>
      <div>{{ isPoint ? ' 积分' : currency }} <VueCountTo :end-val="item.price * count" /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
