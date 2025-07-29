<script setup lang="ts" name="DefaultHeader">
import ServiceIcon from '@/assets/images/common/service.png'

const route = useRoute()
const router = useRouter()

function toRouter(name: string) {
  if (route.name === name) {
    return
  }
  router.push({ name })
}
</script>

<template>
  <div class="default-header">
    <img :src="ServiceIcon" alt="" />
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
