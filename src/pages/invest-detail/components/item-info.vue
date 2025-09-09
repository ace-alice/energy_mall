<script setup name="ItemInfo" lang="ts">
import type { InvestItemType } from '@/interface/common'
import richIcon from '@/assets/images/icons/rich.png'
import { getCycleTime } from '@/utils/common'

const currency = __VITE_CURRENCY

const { info } = defineProps<{
  info: InvestItemType
}>()
</script>
<template>
  <div class="pro-info">
    <van-divider>产品信息</van-divider>
    <div
      class="normal-card"
      style="background-color: antiquewhite; font-size: 14px; display: flex; align-items: center"
    >
      <img :src="richIcon" height="50" width="50" alt="" />
      <div style="margin-left: 12px">
        <div style="margin-bottom: 8px">
          {{ info.profit_cycle * getCycleTime(info.profit_cycle_time).value
          }}{{ getCycleTime(info.profit_cycle_time).label }}内
        </div>
        <div>
          买入{{ info.invest }} {{ currency }}，预计本息收入<span style="color: green">{{
            (info.invest * (+info.profit_rate / 100) * info.profit_cycle + info.invest).toFixed(2)
          }}</span>
          {{ currency }}
        </div>
      </div>
    </div>
    <div style="font-size: 14px; padding: 8px 20px; line-height: 1.4">
      生产计算：按照最低起投金额{{ info.invest }}，收益公式：{{ info.invest }} x
      {{ +info.profit_rate }}% x {{ info.profit_cycle }} ({{
        getCycleTime(info.profit_cycle_time).value
      }}{{ getCycleTime(info.profit_cycle_time).label }}) = 预计收益
      <span style="color: green">
        {{ (info.invest * (+info.profit_rate / 100) * info.profit_cycle).toFixed(2) }}
        {{ currency }}</span
      >，总预计本息
      <span style="color: green">
        {{ (info.invest * (+info.profit_rate / 100) * info.profit_cycle + info.invest).toFixed(2) }}
        {{ currency }}</span
      >
    </div>
    <div style="padding: 0 16px">
      <div class="title">可认购金额</div>
      <div class="desc">{{ info.invest }} {{ currency }}</div>
      <div class="title">认购等级</div>
      <div class="desc">{{ info.level_name }} 及以上</div>
      <div class="title">产品概述</div>
      <div class="desc">{{ info.desc }}及以上</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  color: #13b756;
  margin: 8px 0;
}
.desc {
  font-size: 14px;
}
</style>
