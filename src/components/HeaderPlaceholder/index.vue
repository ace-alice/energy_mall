<script setup name="HeaderPlaceholder" lang="ts">
import { useCommonStore } from '@/stores/common'

const { mediaQueryInfo } = storeToRefs(useCommonStore())
</script>

<template>
  <div
    class="header-placeholder"
    :style="{
      '--top-height': `${mediaQueryInfo.top}px`,
      width: '100%'
    }"
  ></div>
</template>

<style lang="scss" scoped>
.header-placeholder {
  width: 100%;
  padding-top: var(--top-height);
  background-color: transparent;
}
</style>
