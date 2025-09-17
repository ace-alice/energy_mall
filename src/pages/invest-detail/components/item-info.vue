<script setup name="ItemInfo" lang="ts">
import type { InvestItemType } from '@/interface/common'
import richIcon from '@/assets/images/icons/rich.png'
import { getCycleTime, incomeMath, incomeRateMathText, rateMath } from '@/utils/common'
import { useCommonStore } from '@/stores/common'

const currency = __VITE_CURRENCY

const { userInfo } = storeToRefs(useCommonStore())

const { info } = defineProps<{
  info: InvestItemType
}>()

const incomeMoney = computed(() => {
  return incomeMath(
    Number(info.invest),
    rateMath(info.profit_rate, userInfo.value.level_extra),
    getCycleTime(info.profit_cycle_time).value == 2
      ? 0
      : getCycleTime(info.profit_cycle_time).value == 3
        ? 2
        : 1,
    Number(info.profit_type) == 5,
    Number(info.profit_cycle)
  )
})

const incomeText = computed(() => {
  return incomeRateMathText(
    Number(info.invest),
    rateMath(info.profit_rate, userInfo.value.level_extra),
    Number(info.profit_type) == 5,
    Number(info.profit_cycle),
    getCycleTime(info.profit_cycle_time),
    getCycleTime(info.profit_cycle_time).value == 2
  )
})
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
            incomeMoney
          }}</span>
          {{ currency }}
        </div>
      </div>
    </div>
    <div style="font-size: 14px; padding: 8px 20px; line-height: 1.4">
      {{ incomeText }} = 预计利息收益
      <span style="color: green">
        {{ (incomeMoney - Number(info.invest)).toFixed(2) }}
        {{ currency }}</span
      >，总预计本息
      <span style="color: green">
        {{ incomeMoney.toFixed(2) }}
        {{ currency }}</span
      >
    </div>
    <div style="padding: 0 16px">
      <div class="title">可认购金额</div>
      <div class="desc">{{ info.invest }} {{ currency }}</div>
      <!-- <div class="title">项目利率</div>
      <div class="desc">
        (基础利率
        {{ Number(info.profit_rate) }}% x VIP收益加成 {{ Number(info.profit_extra) }}%) + 基础利率
        {{ info.profit_rate }}% =
        <span style="font-size: 18px; color: red"
          >{{ rateMath(info.profit_rate, info.profit_extra).toFixed(2) }}%</span
        >
      </div> -->
      <div class="title">认购等级</div>
      <div class="desc">{{ info.level_name || '普通会员' }} 及以上</div>
      <div class="title">产品概述</div>
      <div class="desc">{{ info.desc }}</div>
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
