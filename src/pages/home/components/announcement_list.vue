<template>
  <div class="announcement-list">
    <div v-for="item in announcements" :key="item.id" class="card" @click="handleItemClick(item)">
      <!-- Tag -->
      <div class="tag" v-if="showType">
        <van-image :src="isLive(item.type) ? LiveIcon : typeMap[item.classification].icon" width="20" height="20"
          fit="contain" />
        <span class="tag-text">{{ isLive(item.type) ? "Live" : typeMap[item.classification].text }}</span>
      </div>
      <!-- Title -->
      <div class="card-title">{{ item.title }}</div>
      <!-- Image -->
      <div class="image-wrapper">
        <div class="overlay" v-if="isLive(item.type)">
          <!-- <div class="viewers">
              <van-icon name="eye-o" />
              <span>100k</span>
            </div> -->
          <van-button class="live-overlay-button" round>
            <template #icon>
              <van-image :src="LiveIcon" width="20" height="20" fit="contain" />
            </template>
            <span class="button-text">Join Live</span>
          </van-button>
        </div>
        <div v-else-if="item.type === 'Video'" class="video-overlay">
          <div class="play-icon">
            <van-icon name="play-circle-o" size="32" color="#fff" />
          </div>
        </div>
        <van-image :src="item.coverUrl" width="100%" height="160px" fit="cover" class="card-image" />
      </div>
      <!-- Source and Time -->
      <div class="card-footer">
        <div class="source">{{ item.userInfo.displayName }}</div>
        <div class="time">{{ formatDate(item.updateTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAnnouncements } from '@/api/announcements'
import { formatDate } from '@/utils/date'
import AnnouncementIcon from '@/assets/images/common/Announcement.png'
import GiveIcon from '@/assets/images/common/Give.png'
import LiveIcon from '@/assets/images/common/Layer_1.png'
import type { Announcement } from '@/interface/common'
import { useAnnouncement } from '@/composables/useAnnouncement'
import type { PropType } from 'vue'

const router = useRouter()
const { isLive, handleItemClick } = useAnnouncement()

const props = defineProps({
  showType: {
    type: Boolean,
    default: true
  },
  list: {
    type: Array as PropType<Announcement[]>,
    default: () => []
  }
})

const announcements = ref<Announcement[]>([])

const typeMap = {
  News: {
    text: 'News',
    icon: AnnouncementIcon
  },
  Announcement: {
    text: 'Announcement',
    icon: AnnouncementIcon
  },
  Ayuda: {
    text: 'Ayuda',
    icon: GiveIcon
  },
  Live: {
    text: 'Live',
    icon: LiveIcon
  }

}

// 监听 props.list 的变化
watch(
  () => props.list,
  (newList) => {
    announcements.value = newList
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.announcement-list {
  .card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 16px;
    padding: 12px;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:active {
      transform: scale(0.98);
    }
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 8px;
  }

  .tag-text {
    font-size: 12px;
    font-weight: 600;
    color: #1e293b;
  }

  .card-image {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .card-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #222;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #888;
  }

  .source {
    color: #475569;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 160px;
    margin-bottom: 10px;
    border-radius: 8px;
    overflow: hidden;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .viewers {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(0, 0, 0, 0.5);
    padding: 4px 12px;
    border-radius: 16px;
    color: white;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }

  .live-overlay-button {
    --van-button-default-background: white;
    --van-button-default-border-color: white;
    padding: 8px 24px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .button-text {
    color: #ff385c;
    font-size: 16px;
    font-weight: 600;
    margin-left: 4px;
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .play-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
}
</style>
