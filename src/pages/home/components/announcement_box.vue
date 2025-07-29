<script setup name="AnnouncementBox" lang="ts">
import { ref, onMounted } from 'vue'
import announcement_list from './announcement_list.vue'
import { getAnnouncements } from '@/api/announcements'
import type { Announcement } from '@/interface/common'
import more_section from './more_section.vue'
import location_filter from './location_filter.vue'
import { useCommonStore } from '@/stores/common'

const commonStore = useCommonStore()
const showFilterDialog = ref(false)
const announcementList = ref<Announcement[]>([])
const loading = ref(false)

const handleFilter = () => {
  showFilterDialog.value = true
}

const fetchAnnouncements = async (params?: { regionId?: number; cityId?: number }) => {
  try {
    loading.value = true
    const locationParams = params || await commonStore.getLocationParams()

    const [newsData, announcementData, ayudaData, livesData] = await Promise.all([
      getAnnouncements({
        classification: 'News',
        channel: 'Home',
        $pageSize: 2,
        $offsetTime: '',
        ...locationParams
      }),
      getAnnouncements({
        classification: 'Announcement',
        channel: 'Home',
        $pageSize: 2,
        $offsetTime: '',
        ...locationParams
      }),
      getAnnouncements({
        classification: 'Ayuda',
        channel: 'Home',
        $pageSize: 2,
        $offsetTime: '',
        ...locationParams
      }),
      getAnnouncements({
        classification: 'Live',
        channel: 'Home',
        $pageSize: 2,
        $offsetTime: '',
        ...locationParams
      })
    ])

    announcementList.value = [...newsData.data, ...announcementData.data, ...ayudaData.data, ...livesData.data]
  } catch (error) {
    console.error('Failed to fetch announcements:', error)
  } finally {
    loading.value = false
  }
}

const handleFilterConfirm = (params: { regionId?: number; cityId?: number }) => {
  fetchAnnouncements(params)
}

onMounted(() => {
  fetchAnnouncements()
})
</script>

<template>
  <div class="announcement-box">
    <div class="announcement-title">
      <div>Announcement</div>
      <div class="filter-btn" @click="handleFilter">
        <van-icon name="filter-o" />
        <div>Filter</div>
      </div>
    </div>
    <announcement_list :list="announcementList"></announcement_list>
    <more_section />

    <location_filter v-model:show="showFilterDialog" @confirm="handleFilterConfirm" />
  </div>
</template>

<style lang="scss" scoped>
.announcement-box {
  box-sizing: border-box;
  width: 100%;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;

  .announcement-title {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 4px;

    &>div:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .filter-btn {
    font-size: 14px;
    font-weight: 500;
    color: rgba(59, 130, 246, 1);
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
