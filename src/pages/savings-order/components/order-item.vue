<script setup lang="ts" name="GoodOrderItem">
const props = defineProps(['item'])

const currency = __VITE_CURRENCY
</script>

<template>
  <div class="normal-card">
    <div class="top">
      <div>
        <div>{{ item.info }}</div>
        <div>{{ item.create_at }}</div>
      </div>
      <div :class="`cut-${item.type}`">
        {{ item.money }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div:nth-child(2) {
    font-size: 19px;
    font-weight: 500;
    color: #ff3f3f;
  }
  & > div:nth-child(1) {
    font-size: 16px;
    & > div:nth-child(2) {
      font-size: 13px;
      color: #222;
      margin-top: 6px;
    }
  }
  .cut-1 {
    color: #49cc83 !important;
  }
  .cut-2 {
    color: #ff3f3f !important;
  }
  .cut-3 {
    color: #fbc145 !important;
  }
}
</style>
