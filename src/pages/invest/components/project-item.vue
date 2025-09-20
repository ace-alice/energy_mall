<template>
  <!-- @click="router.push(`/invest-detail/${item.id}`)" -->
  <div class="normal-card project-item" @click="router.push(`/invest-detail/${item.id}`)">
    <div class="coupon-btn" v-if="item.gift_coupon">
      {{ item.coupon_info.type == 1 ? '现金抵扣券' : '加息券' }}
    </div>
    <div class="top">
      <van-image width="90" height="65" lazy-load :src="item.img" />
      <div class="p-info">
        <div>{{ item.title }}</div>
        <div>{{ getProfitType(item.profit_type, item.profit_cycle_time) }}</div>
        <van-progress
          :pivot-text="`${item.progress}%`"
          :color="Number(item.progress) == 100 ? '#FBC145' : '#13B756'"
          track-color="#C7EED7"
          :percentage="Number(item.progress)"
        />
      </div>
    </div>
    <van-divider />
    <div class="bottom three-del">
      <div>
        <div>总投资额(USDT)</div>
        <div>
          {{ Number(item.discounted_invest) || Number(item.invest) }}
          <span
            v-if="
              Number(item.discounted_invest) &&
              Number(item.discounted_invest) != Number(item.invest)
            "
            style="text-decoration: line-through; margin-right: 4px"
            >{{ Number(item.invest) }}</span
          >
          <!-- <span>USDT</span> -->
        </div>
      </div>
      <div style="text-align: center">
        <div>项目利率</div>
        <div>{{ rateMath(item.profit_rate, userInfo.level_extra).toFixed(2) }}<span>%</span></div>
      </div>
      <div style="text-align: right">
        <div>持有时间</div>
        <div>
          {{ item.profit_cycle * getCycleTime(item.profit_cycle_time).value
          }}<span>{{ getCycleTime(item.profit_cycle_time).label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ProjectItem">
import type { InvestItemType } from '@/interface/common'
import { useCommonStore } from '@/stores/common'
import { getCycleTime, getProfitType, rateMath } from '@/utils/common'
const { item } = defineProps<{
  item: InvestItemType
}>()
const router = useRouter()

const { userInfo } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
.coupon-btn {
  position: absolute;
  right: 0;
  top: 16px;
  background-color: #13b756;
  color: #fff;
  padding: 2px 6px;
  font-size: 12px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.project-item {
  position: relative;
  .top {
    display: flex;
  }
  .p-info {
    height: 65px;
    flex-grow: 1;
    padding: 0 12px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > div:nth-child(1) {
      font-size: 16px;
    }
    & > div:nth-child(2) {
      font-size: 14px;
      margin: 0 0 6px;
    }
  }
}
</style>
