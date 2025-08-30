<script setup lang="ts" name="UserGuide">
import user_level from '@/assets/images/icons/user_level.png'
import team_level from '@/assets/images/icons/team_level.png'
import market from '@/assets/images/icons/market.png'
import goIcon from '@/assets/images/icons/go_icon.png'

const router = useRouter()

const enterList = [
  { text: '会员等级', icon: user_level, router: '/legend/user_level' },
  { text: '团队等级', icon: team_level, router: '/legend/team_level' },
  { text: '市场制度', icon: market, router: '/legend/market' }
]
</script>

<template>
  <div class="normal-bg invite">
    <NormalHeader :background="false" :backIconTag="2" />
    <div style="margin-top: 420px">
      <van-sticky :offset-bottom="200" position="bottom">
        <div
          class="normal-card enter-card"
          v-for="item in enterList"
          @click="router.push(item.router)"
        >
          <img :src="item.icon" height="58" width="58" alt="" srcset="" />
          <div>
            <div>{{ item.text }}</div>
            <div></div>
          </div>
          <img :src="goIcon" width="30" height="18" alt="" srcset="" />
        </div>
      </van-sticky>
    </div>
  </div>
</template>

<style scoped lang="scss">
.enter-card {
  display: flex;
  align-items: center;
  div {
    flex-grow: 1;
    padding: 0 12px;
    font-size: 20px;
    font-weight: 600;
  }
}
.invite {
  background-color: #09090c;
  min-height: 100vh;
  background-image: url('@/assets/images/background/guide_bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
