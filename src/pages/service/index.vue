<script setup name="Service" lang="ts">
import { useCommonStore } from '@/stores/common'

const { serviceUrl, userInfo } = storeToRefs(useCommonStore())

const { geServiceUrl } = useCommonStore()

const serviceSrc = computed(() => {
  if (serviceUrl.value) {
    let data = ''
    if (userInfo.value.phone) {
      data = `metadata={"name":"${userInfo.value.sfz_name || userInfo.value.phone}","tel":"${userInfo.value.phone}"}`
    }
    return `${serviceUrl.value}?${data}`
  }
  return ''
})

onMounted(() => {
  geServiceUrl()
})
</script>

<template>
  <div class="normal-page service-box">
    <BgTwo router="Service" />
    <HomeHeader>
      <template #box>
        <!-- <HomeHeaderBox /> -->
      </template>
    </HomeHeader>
    <div class="service-iframe">
      <iframe :src="serviceSrc" width="100%" height="100%" frameborder="0"></iframe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-box {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0;
  .service-iframe {
    flex-grow: 1;
  }
}
</style>
