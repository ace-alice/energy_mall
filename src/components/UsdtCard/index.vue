<script setup lang="ts" name="UsdtCard">
const props = defineProps(['item', 'delAble'])

function del() {
  showConfirmDialog({
    title: '提示',
    message: '您确定删除该账户吗？'
  }).then(() => {
    // on confirm
  })
}
</script>

<template>
  <div class="usdt-card">
    <div>{{ item.coin_blockchain }}</div>
    <div>{{ item.coin_account }}</div>
    <!-- <van-icon v-if="delAble" class="name" name="delete-o" @click="del" /> -->
  </div>
</template>

<style lang="scss" scoped>
.usdt-card {
  padding: 12px;
  border-radius: 6px;
  background-color: #d0f1dd;
  color: #222222;
  position: relative;
  .name {
    position: absolute;
    font-size: 20px;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
  }
  & > div {
    text-align: start;
    &:nth-child(1) {
      font-size: 16px;
    }
    &:nth-child(2) {
      font-size: 14px;
      max-width: calc(100% - 50px);
      margin-top: 6px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: noWrap;
    }
  }
}
</style>
