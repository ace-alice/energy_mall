<template>
  <!-- @click="router.push(`/invest-detail/${item.id}`)" -->
  <div class="normal-card project-item">
    <div class="top">
      <van-image width="90" height="65" lazy-load :src="item.img" />
      <div class="p-info">
        <div class="title">
          <span>{{ item.item_name }}</span>
          <van-tag
            :color="currentStatus?.bgColor"
            :text-color="currentStatus?.textColor"
            size="large"
            >{{ currentStatus?.text }}</van-tag
          >
        </div>
        <div>投资日期 {{ item.create_at }}</div>
        <div>收益日期 {{ item.end_time }}</div>
      </div>
    </div>
    <van-divider />
    <div class="bottom">
      <div>
        <div>投资金额</div>
        <div>{{ Number(item.amount) }}<span>USDT</span></div>
      </div>
      <div style="text-align: center">
        <div>项目利率</div>
        <div>{{ item.profit_rate }}<span>%</span></div>
      </div>
      <div style="text-align: right">
        <div>持有时间</div>
        <div>
          {{ item.profit_cycle * getCycleTime(item.profit_cycle_time).value
          }}<span>{{ getCycleTime(item.profit_cycle_time).label }}</span>
        </div>
      </div>
    </div>
    <van-divider />
    <div style="display: flex; justify-content: space-between; align-items: center">
      <div style="flex-grow: 1; font-size: 14px">
        {{ getProfitType(item.profit_type, item.profit_cycle_time) }}
      </div>
      <van-button type="primary" size="mini" :to="`/invest-agreement/${item.id}`"
        >查看合同</van-button
      >
      <!-- <van-button type="primary" size="mini" style="margin-left: 12px">查看详情</van-button> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="ProjectItem">
import type { InvestOrderItemType } from '@/interface/common'
import { getCycleTime, getProfitType } from '@/utils/common'
const { item } = defineProps<{ item: InvestOrderItemType }>()
const router = useRouter()

const statusOptions = [
  {
    text: '进行中',
    bgColor: '#E7F7EE',
    textColor: '#13B756',
    type: 0
  },
  {
    text: '已完成',
    bgColor: '#F4F4F4',
    textColor: '#999',
    type: 1
  },
  {
    text: '待派本金',
    bgColor: '#FFD57B',
    textColor: '#FFD57B',
    type: 2
  }
]

const currentStatus = computed(() => {
  return statusOptions.find((s) => item.item_status == s.type)
})
</script>

<style lang="scss" scoped>
.project-item {
  .top {
    display: flex;
  }
  .bottom {
    display: flex;
    & > div {
      width: 33%;
      position: relative;
      & + div {
        &::before {
          content: '/';
          position: absolute;
          color: #999;
          left: -1px;
          top: 12px;
        }
      }
      & > div:nth-child(1) {
        font-size: 12px;
        color: #999;
      }
      & > div:nth-child(2) {
        font-size: 18px;
        font-weight: 600;
        margin-top: 4px;
        span {
          font-size: 12px;
        }
      }
    }
  }
  .p-info {
    height: 65px;
    flex-grow: 1;
    padding: 8px 12px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > div:nth-child(1) {
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & > div:nth-child(2) {
      font-size: 12px;
      margin-top: 8px;
    }
    & > div:nth-child(3) {
      font-size: 12px;
      margin-top: 4px;
    }
  }
}
</style>
