<script setup name="ComIntro" lang="ts">
import { useCommonStore } from '@/stores/common'
import ComDetail from './components/detail.vue'

const { mediaQueryInfo } = storeToRefs(useCommonStore())
const activeCode = ref('company_permission')

const tabs = [
  { text: '公司资质', code: 'company_permission' },
  { text: '关于公司', code: 'about_company' },
  { text: '企业文化', code: 'company_culture' }
]
</script>

<template>
  <div class="normal-page com-intro">
    <NormalHeader :back-icon-tag="2" :background="false" bg-color="#000" />
    <div style="height: 100px; flex-shrink: 0"></div>
    <van-sticky :offset-top="55 + mediaQueryInfo.top">
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab.code"
          :class="{ active: activeCode == tab.code }"
          @click="activeCode = tab.code"
        >
          {{ tab.text }}
        </div>
      </div>
    </van-sticky>
    <KeepAlive>
      <ComDetail :key="activeCode" :code="activeCode" />
    </KeepAlive>
  </div>
</template>

<style lang="scss" scoped>
:deep(.van-sticky--fixed) {
  .tabs {
    background-color: #000;
  }
}
.tabs {
  padding: 8px 20px 24px;
  display: flex;
  align-items: center;
  & > div {
    font-size: 16px;
    color: #fff;
    margin-right: 30px;
  }
  .active {
    font-weight: 600;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -20px;
      width: 100%;
      height: 10px;
      background-image: url('@/assets/images/icons/com_tab.png');
      background-size: 100% 100%;
    }
  }
}
.com-intro {
  background-color: #000;
  min-height: 100%;
  background-image: url('@/assets/images/background/com_intro.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
}
</style>
