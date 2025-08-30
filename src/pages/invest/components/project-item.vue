<template>
  <div class="normal-card project-item" @click="router.push(`/invest-detail/${item.id}`)">
    <div class="top">
      <van-image width="90" height="65" lazy-load :src="item.img" />
      <div class="p-info">
        <div>{{ item.title }}</div>
        <van-progress
          :pivot-text="`${item.progress}%`"
          :color="Number(item.progress) == 100 ? '#FBC145' : '#13B756'"
          track-color="#C7EED7"
          :percentage="Number(item.progress)"
        />
      </div>
    </div>
    <van-divider />
    <div class="bottom">
      <div>
        <div>总投资额</div>
        <div>{{ item.invest_scale }}<span>元</span></div>
      </div>
      <div style="text-align: center">
        <div>项目利率</div>
        <div>{{ item.profit_rate }}<span>%</span></div>
      </div>
      <div style="text-align: right">
        <div>持有时间</div>
        <div>{{ item.profit_cycle }}<span>天</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ProjectItem">
const props = defineProps(['item'])
const router = useRouter()
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
    }
    & > div:nth-child(2) {
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
    }
  }
}
</style>
