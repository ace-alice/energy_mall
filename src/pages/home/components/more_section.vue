<template>
  <div class="more-section" v-if="list.length > 0">
    <div class="more-title">More</div>
    <div class="more-content">
      <van-swipe class="my-swipe" :width="190" :autoplay="0" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="item in list" :key="item.id" @click="handleItemClick(item)">
          <div class="more-card">
            <div class="image-wrapper">
              <van-image :src="item.coverUrl" width="100%" height="120" fit="cover" radius="8" />
              <template v-if="item.type === 'Video'">
                <div class="play-icon">
                  <van-icon name="play-circle-o" size="32" color="#fff" />
                </div>
              </template>
            </div>
            <div class="card-content">
              <div class="title">{{ item.title }}</div>
              <div class="time">{{ formatDate(item.updateTime) }}</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="see-more" @click="goToMore">
        <span>See More</span>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Announcement } from '@/interface/common'
import { formatDate } from '@/utils/date'
import { getAnnouncements } from '@/api/announcements'
import { useCommonStore } from '@/stores/common'

const { proxy } = getCurrentInstance()!
const commonStore = useCommonStore()
const router = useRouter()
const list = ref<Announcement[]>([])

const fetchMoreList = async () => {
  try {
    const locationParams = await commonStore.getLocationParams()
    const { data } = await getAnnouncements({
      classification: '',
      channel: 'MoreRelatedArticles',
      $pageSize: 2,
      $offsetTime: '',
      ...locationParams
    })
    list.value = data || []
  } catch (error) {
    console.error('Failed to fetch more list:', error)
  }
}

const handleItemClick = (item: Announcement) => {
  router.push(`/announcement_detail?id=${item.id}`)
}

const goToMore = () => {
  router.push('/announcement')
}

onMounted(() => {
  fetchMoreList()
  // 监听位置变更事件
  proxy?.mittBus.on('refresh-location', fetchMoreList)
})

onUnmounted(() => {
  // 移除事件监听
  proxy?.mittBus.off('refresh-location', fetchMoreList)
})
</script>

<style lang="scss" scoped>
.more-section {
  margin-top: 16px;

  .more-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    padding: 0 4px;
  }

  .more-content {
    position: relative;
  }

  .my-swipe {
    :deep(.van-swipe__track) {
      display: flex;
      gap: 12px;
    }
  }

  .more-card {
    width: 190px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
  }

  .play-icon {
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

  .duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.6);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    color: white;
  }

  .card-content {
    padding: 12px;

    .title {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .time {
      font-size: 12px;
      color: #666;
    }
  }

  .see-more {
    position: absolute;
    right: 0;
    top: -36px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #3b82f6;
    font-size: 14px;
    font-weight: 500;
    padding: 4px;
    cursor: pointer;

    .van-icon {
      font-size: 12px;
    }
  }
}
</style>
