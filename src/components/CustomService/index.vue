<script setup name="CustomService" lang="ts">
import customIcon from '@/assets/images/icons/custom.png'
const router = useRouter()
</script>

<template>
  <img
    :src="customIcon"
    class="custom-service"
    width="24"
    height="24"
    alt=""
    @click="router.push({ name: 'Service' })"
  />
</template>

<style lang="scss" scoped>
.custom-service {
  width: 24px;
  cursor: pointer;
}
</style>
