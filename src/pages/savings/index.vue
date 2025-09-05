<script setup lang="ts" name="Savings"></script>

<template>
  <div class="normal-page">
    <BgTwo router="SavingsVip" />
    <NormalHeader title="存钱罐" :background="false">
      <template #right>
        <van-button type="primary" size="small">交易记录</van-button>
      </template>
    </NormalHeader>
  </div>
</template>

<style lang="scss" scoped></style>
