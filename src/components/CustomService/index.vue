<script setup name="CustomService" lang="ts">
import customIcon from '@/assets/images/icons/custom.png'
</script>

<template>
  <img :src="customIcon" class="custom-service" width="24" height="24" alt="" />
</template>

<style lang="scss" scoped>
.custom-service {
  width: 24px;
  cursor: pointer;
}
</style>
