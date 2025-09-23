<script setup name="Home" lang="ts">
import { useCommonStore } from '@/stores/common'
import ProjectListBox from './components/project-list.vue'
const { groupClasses } = storeToRefs(useCommonStore())
const searchText = ref('')
const activeId = ref(0)
const router = useRouter()

watch(
  () => groupClasses.value,
  (newVal) => {
    if (newVal.length) {
      activeId.value = newVal[0].id
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="normal-page">
    <BgTwo router="HomeSearch" />
    <HomeHeader>
      <template #box>
        <div class="header-box">
          <div class="back-icon" @click="router.push({ name: 'HomeNormal' })">
            <van-icon name="down" />
          </div>
          <van-field
            v-model="searchText"
            placeholder="请输入要搜索的内容"
            autocomplete="off"
            right-icon="search"
          />
        </div>
      </template>
    </HomeHeader>
    <div class="sidebar-box">
      <div class="box-left">
        <div
          class="sidebar-item"
          v-for="item in groupClasses"
          :key="item.id"
          :class="{
            active: item.id == activeId
          }"
          @click="activeId = item.id"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="box-right">
        <ProjectListBox
          v-if="activeId"
          :key="`${activeId}-${searchText || 'search'}`"
          :type="activeId"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.normal-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
}
.sidebar-box {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  .box-right {
    flex-grow: 1;
    // padding: 0 8px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .box-left {
    width: 100px;
    background: white;
    padding: 16px 8px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    .sidebar-item {
      width: 100%;
      padding: 8px;
      border-radius: 20px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #222;
      text-align: center;
      text-overflow: ellipsis;
      text-wrap: nowrap;
      overflow: hidden;
    }
    .active {
      background-color: #222;
      color: white;
    }
  }
}
.header-box {
  display: flex;
  padding: 8px 16px 12px;
  .back-icon {
    height: 52px;
    width: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-right: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    transform: rotateZ(90deg);
  }
  &:deep(.van-field) {
    border-radius: 30px;
    margin: unset;
    .van-field__body {
      padding-left: 12px;
    }
  }
}
</style>
