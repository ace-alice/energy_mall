<template>
  <div>
    <img :src="intro" height="32" alt="" style="padding: 8px 0 12px" />
    <div class="video-box">
      <VideoPlayer v-if="comVideoUrl" :src="comVideoUrl" />
    </div>
  </div>
</template>

<script setup lang="ts" name="ComVideoBox">
import intro from '@/assets/images/icons/intro.png'
import { useCommonStore } from '@/stores/common'

const { comVideoUrl } = storeToRefs(useCommonStore())

const { getComVideoUrl } = useCommonStore()

onMounted(() => {
  getComVideoUrl()
})
</script>

<style lang="scss" scoped>
.video-box {
  height: 225px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}
</style>
