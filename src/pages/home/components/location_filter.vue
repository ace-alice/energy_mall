<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance } from 'vue'
import { getRegionList, getCityList } from '@/api/location'
import { useCommonStore } from '@/stores/common'

const { proxy } = getCurrentInstance()!
const commonStore = useCommonStore()

const props = defineProps<{
    show: boolean
}>()

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'confirm', params: { regionId?: number; cityId?: number }): void
}>()

const activeTab = ref('Region')
const searchValue = ref('')
const selectedRegion = ref<number>()
const selectedCity = ref<number>()

// 防抖定时器
let searchTimer: NodeJS.Timeout | null = null

const tabs = [
    { name: 'Region', title: 'Region' },
    { name: 'City', title: 'City' }
]

const regions = ref<{ text: string; value: number }[]>([])
const cities = ref<{ text: string; value: number }[]>([])

// 城市列表分页相关
const pageSize = 20
const cityLoading = ref(false)
const cityFinished = ref(false)
const cityRefreshing = ref(false)

const scrollTop = ref(0)
const canPullRefresh = computed(() => scrollTop.value <= 10)

const onScroll = (e: Event) => {
    const target = e.target as HTMLElement
    scrollTop.value = target.scrollTop
}

const filteredList = computed(() => {
    if (activeTab.value === 'Region') {
        const list = regions.value
        if (!searchValue.value) return list
        return list.filter((item) => item.text.toLowerCase().includes(searchValue.value.toLowerCase()))
    }
    return cities.value
})

const handleClose = () => {
    emit('update:show', false)
}

const handleReset = () => {
    searchValue.value = ''
    selectedRegion.value = undefined
    selectedCity.value = undefined
    // 清除全局存储的位置信息
    commonStore.updateLocation({})
    // 触发刷新事件
    proxy?.mittBus.emit('refresh-location')
    if (activeTab.value === 'City') {
        cities.value = []
        cityFinished.value = false
        fetchCities(true)
    }
}

const handleDone = () => {
    const params: { 
        regionId?: number; 
        cityId?: number;
        regionName?: string;
        cityName?: string;
    } = {}
    if (activeTab.value === 'Region') {
        const selectedRegionItem = regions.value.find(r => r.value === selectedRegion.value)
        params.regionId = selectedRegion.value
        params.regionName = selectedRegionItem?.text
        params.cityId = undefined
        params.cityName = undefined
    } else {
        const selectedCityItem = cities.value.find(c => c.value === selectedCity.value)
        params.regionId = undefined
        params.regionName = undefined
        params.cityId = selectedCity.value
        params.cityName = selectedCityItem?.text
    }
    // 更新全局状态
    commonStore.updateLocation(params)
    // 触发刷新事件
    proxy?.mittBus.emit('refresh-location')
    emit('confirm', params)
    handleClose()
}

const handleRegionSelect = (region: { text: string; value: number }) => {
    selectedRegion.value = region.value
}

const handleCitySelect = (city: { text: string; value: number }) => {
    selectedCity.value = city.value
}

const fetchRegions = async () => {
    try {
        const res = await getRegionList()
        if (res.data) {
            regions.value = res.data.map((item: any) => ({
                text: item.regionName,
                value: item.id
            }))
        }
    } catch (error) {
        console.error('Failed to fetch regions:', error)
    }
}

const fetchCities = async (isRefresh = false) => {
    if (cityFinished.value && !isRefresh) return

    try {
        cityLoading.value = true
        const res = await getCityList({
            $pageSize: pageSize,
            $offsetId: isRefresh ? undefined : cities.value[cities.value.length - 1]?.value,
            name: searchValue.value
        })

        if (res.data) {
            const newCities = res.data.map((item: any) => ({
                text: item.name,
                value: item.id
            }))

            if (isRefresh) {
                cities.value = newCities
            } else {
                cities.value = [...cities.value, ...newCities]
            }

            cityFinished.value = res.data.length < pageSize
        }
    } catch (error) {
        console.error('Failed to fetch cities:', error)
    } finally {
        cityLoading.value = false
        cityRefreshing.value = false
    }
}

const onRefresh = async () => {
    if (activeTab.value === 'City') {
        cityRefreshing.value = true
        cityFinished.value = false
        await fetchCities(true)
    }
}

const onLoad = () => {
    if (activeTab.value === 'City' && !cityFinished.value) {
        fetchCities()
    }
}

// 监听搜索值变化，添加防抖
watch(searchValue, (newValue) => {
    if (activeTab.value === 'City') {
        // 清除之前的定时器
        if (searchTimer) {
            clearTimeout(searchTimer)
        }

        // 设置新的定时器，500ms 后执行搜索
        searchTimer = setTimeout(() => {
            cities.value = []
            cityFinished.value = false
            fetchCities(true)
        }, 500)
    }
})

fetchRegions()
</script>

<template>
    <van-popup :show="show" position="bottom" :lock-scroll="true" :style="{ height: '50%' }" class="filter-popup" round
        @update:show="emit('update:show', $event)">
        <div class="filter-header">
            <van-icon name="cross" @click="handleClose" />
            <div class="title">Filter</div>
            <div class="reset" @click="handleReset">Reset All</div>
        </div>

        <div class="filter-tabs">
            <div v-for="tab in tabs" :key="tab.name" class="tab-item" :class="{ active: activeTab === tab.name }"
                @click="activeTab = tab.name">
                {{ tab.title }}
            </div>
        </div>

        <div class="search-box">
            <van-search v-model="searchValue" placeholder="Search" shape="round" background="transparent" />
        </div>

        <template v-if="activeTab === 'Region'">
            <div class="region-list">
                <div v-for="region in filteredList" :key="region.value" class="region-item"
                    @click="handleRegionSelect(region)">
                    <span>{{ region.text }}</span>
                    <van-icon v-if="region.value === selectedRegion" name="success" class="check-icon" />
                </div>
            </div>
        </template>
        <template v-else>
            <van-pull-refresh v-model="cityRefreshing" @refresh="onRefresh" class="city-list-wrapper"
                :disabled="!canPullRefresh">
                <van-list v-model:loading="cityLoading" :finished="cityFinished" finished-text="No more data"
                    @load="onLoad" class="region-list" @scroll="onScroll">
                    <div v-for="city in filteredList" :key="city.value" class="region-item"
                        @click="handleCitySelect(city)">
                        <span>{{ city.text }}</span>
                        <van-icon v-if="city.value === selectedCity" name="success" class="check-icon" />
                    </div>
                </van-list>
            </van-pull-refresh>
        </template>

        <div class="done-button">
            <van-button round block type="primary" @click="handleDone">Done</van-button>
        </div>
    </van-popup>
</template>

<style lang="scss" scoped>
:deep(.van-popup) {
    z-index: 100000000;
}

:deep(.van-overlay) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99999999;
}

.filter-popup {
    position: fixed !important;
    background: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 24px 24px 0 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50%;

    .filter-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid #f1f5f9;

        .van-icon {
            font-size: 20px;
            color: #64748b;
        }

        .title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }

        .reset {
            font-size: 14px;
            color: #3b82f6;
            font-weight: 500;
        }
    }

    .filter-tabs {
        display: flex;
        gap: 8px;
        padding: 16px;
        background: #fff;

        .tab-item {
            padding: 8px 24px;
            border-radius: 100px;
            font-size: 14px;
            color: #64748b;
            background: #fff;
            border: 1px solid #e2e8f0;
            cursor: pointer;

            &.active {
                background: #3b82f6;
                color: #fff;
                border: none;
            }
        }
    }

    .search-box {
        padding: 0 16px;

        :deep(.van-search) {
            padding: 0;

            .van-search__content {
                background: #f8fafc;
                border-radius: 100px;
            }
        }
    }

    .region-list {
        flex: 1;
        overflow-y: auto;
        padding: 16px;

        .region-item {
            padding: 16px;
            font-size: 14px;
            color: #1e293b;
            border-bottom: 1px solid #f1f5f9;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &:last-child {
                border-bottom: none;
            }

            .check-icon {
                color: #3b82f6;
            }
        }
    }

    .done-button {
        padding: 16px;
        background: #fff;
        border-top: 1px solid #f1f5f9;

        .van-button {
            height: 44px;
            font-size: 16px;
            font-weight: 600;
            background: #3b82f6;
        }
    }
}

.city-list-wrapper {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    :deep(.van-pull-refresh) {
        overflow: visible;
    }

    :deep(.van-list) {
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
}
</style>