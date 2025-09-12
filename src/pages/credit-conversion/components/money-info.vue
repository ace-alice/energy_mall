<script setup lang="ts" name="CreditMoneyInfo">
const { title, value1, value2 } = defineProps<{ title: string; value1: string; value2: string }>()
const currency = __VITE_CURRENCY
</script>

<template>
  <div class="money-info">
    <TitleDel :title="title" />
    <div class="info-box">
      <div>
        <div>可提余额({{ currency }})</div>
        <div>
          <VueCountTo :end-val="Number(value1)" />
        </div>
      </div>
      <div>
        <div>可用余额({{ currency }})</div>
        <div>
          <VueCountTo :end-val="Number(value2)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.money-info {
  height: 150px;
  background-image: url('@/assets/images/common/money_bg.png');
  background-size: 100% 100%;
  margin: 0 4px;
  padding: 12px 16px 0;
  .title {
    font-size: 18px;
    color: #fff;
    margin-bottom: 8px;
  }
  .info-box {
    display: flex;
    align-items: center;
    padding: 0 30px;
    & > div {
      color: #cccccc;
      width: 160px;
      font-size: 12px;
      & > div:nth-child(2) {
        color: #fbc145;
        margin-top: 12px;
        font-size: 18px;
      }
    }
  }
}
</style>
