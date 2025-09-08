<template>
  <div style="margin-top: 240px" v-if="!projectDetail.id">
    <van-loading vertical>
      <template #icon>
        <van-icon name="star-o" size="30" />
      </template>
      加载中...
    </van-loading>
  </div>
  <div
    class="normal-page"
    v-else
    :style="{
      '--height': `${mediaQueryInfo.top + 20}px`
    }"
  >
    <div class="back" @click="router.back()">
      <img :src="backIcon" height="20" width="20" alt="" />
    </div>
    <van-image width="100%" style="aspect-ratio: 1/1" :src="projectDetail.img" />
    <div style="padding: 0 16px">
      <div class="title">{{ projectDetail.title }}</div>
    </div>
    <!-- <div class="ways">
      <img :src="send_way" width="20" height="20" alt="" />
      <div style="flex-grow: 1; font-weight: 600">配送方式</div>
      <div style="font-size: 14px">物流配送</div>
      <van-icon name="play" />
    </div> -->
    <!-- <div style="font-size: 17px; padding: 0 16px 16px">图文介绍</div> -->
    <van-sticky>
      <div style="background-color: #fff; padding: 6px 16px">
        <div class="normal-card item-info">
          <div style="font-size: 16px">概况</div>
          <div style="margin-top: 4px; color: #999">
            收益类型：{{
              getProfitType(projectDetail.profit_type, projectDetail.profit_cycle_time)
            }}
          </div>
          <div style="margin-top: 4px; color: #999">积分赠送：{{ projectDetail.gift_points }}</div>
          <div class="three-del">
            <div>
              <div>{{ Number(projectDetail.invest) }}<span>USDT</span></div>
              <div>总投资额</div>
            </div>
            <div style="text-align: center">
              <div>{{ projectDetail.profit_rate }}<span>%</span></div>
              <div>项目利率</div>
            </div>
            <div style="text-align: right">
              <div>
                {{ projectDetail.profit_cycle * getCycleTime(projectDetail.profit_cycle_time).value
                }}<span>{{ getCycleTime(projectDetail.profit_cycle_time).label }}</span>
              </div>
              <div>持有时间</div>
            </div>
          </div>
        </div>
      </div>
    </van-sticky>

    <van-tabs v-model:active="active" scrollspy sticky offset-top="142" class="team-tabs">
      <van-tab title="产品信息">
        <ItemInfo :info="projectDetail" />
      </van-tab>
      <van-tab title="产品详情">
        <div style="padding: 0 16px; width: 100%">
          <van-divider>产品详情</van-divider>
          <div v-html="content"></div>
        </div>
      </van-tab>
      <van-tab title="产品协议">
        <Agreement :info="projectDetail" />
      </van-tab>
    </van-tabs>
    <!-- <TitleDel title="产品介绍" /> -->
    <div class="buy-box">
      <van-button type="primary" round block @click="toPins">立即购买</van-button>
    </div>
    <NormalPinAction ref="normalPinActionRef" @submit="toBuy" />
  </div>
</template>

<script setup lang="ts" name="InvestDetailVip">
import { getInvestDetailApi, investBuyApi } from '@/api'
import type { InvestItemType } from '@/interface/common'
import backIcon from '@/assets/images/icons/back_white_icon.png'
import { useCommonStore } from '@/stores/common'
import { htmlDecodeByRegExp, getProfitType, getCycleTime } from '@/utils/common'
import Agreement from './components/agreement.vue'
import ItemInfo from './components/item-info.vue'

const normalPinActionRef = ref()

const active = ref(0)

const { mediaQueryInfo } = storeToRefs(useCommonStore())

const { getUserInfo, getUserDetail } = useCommonStore()

const router = useRouter()
const route = useRoute()

const projectDetail = reactive<InvestItemType>({} as InvestItemType)

function getProjectDetail(id: string) {
  getInvestDetailApi({ id }).then((res) => {
    Object.assign(projectDetail, res.data.data)
  })
}

const content = computed(() => {
  return htmlDecodeByRegExp(projectDetail.content).replace(/<img/g, '<img  width="100%"')
})

onMounted(() => {
  if (route.params.id) {
    getProjectDetail(route.params.id.toString())
  } else {
    router.push({ name: 'HomeSearch' })
  }
})

function toPins() {
  nextTick(() => {
    if (normalPinActionRef.value) {
      normalPinActionRef.value.toOpenPin()
    }
  })
}

function toBuy(pin: string) {
  showToast({ type: 'loading', overlay: true })
  investBuyApi({ id: projectDetail.id, pin: pin })
    .then((res) => {
      closeToast()
      getUserInfo()
      getUserDetail()
      showToast({ type: 'text', message: '购买成功，请到订单页查看详情' })
    })
    .catch((e) => {})
}
</script>

<style lang="scss" scoped>
.three-del {
  margin-top: 8px;
  & > div {
    width: 33%;
    position: relative;
    & > div:nth-child(1) {
      font-size: 18px;
      font-weight: 600;
      margin-top: 4px;
      color: #fecd7f;
      span {
        font-size: 12px;
      }
    }
    & > div:nth-child(2) {
      font-size: 12px;
      color: #999;
    }
  }
}
.item-info {
  background-image: url('@/assets/images/background/item_info_bg.png');
  background-size: 100% 100%;
  color: #fff;
  font-size: 12px;
  margin: unset;
}
.buy-box {
  background-color: #fff;
  padding: 8px 16px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}
.ways {
  margin: 0 16px 16px;
  background-color: #f9f9f9;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 6px;
  & > * + * {
    margin-left: 6px;
  }
}
.title {
  padding: 20px 0;
  font-size: 18px;
  font-size: 600;
}
.good-price {
  width: 100%;
  height: 60px;
  background-color: #13b756;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #fff;
  & > div {
    &:nth-child(1) {
      margin-top: 8px;
      margin-right: 2px;
    }
    &:nth-child(2) {
      font-size: 32px;
    }
    &:nth-child(3) {
      flex-grow: 1;
      padding: 0 20px;
      opacity: 0.8;
      text-decoration: line-through;
      font-size: 14px;
    }
    &:nth-child(4) {
      opacity: 0.8;
      font-size: 14px;
    }
  }
}
.back {
  position: fixed;
  top: var(--height);
  left: 16px;
  z-index: 100;
  height: 40px;
  width: 40px;
  border-radius: 28px;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
}
.normal-page {
  background-color: #fff;
  &:deep(.title img) {
    filter: brightness(0) saturate(100%);
  }
}
</style>
