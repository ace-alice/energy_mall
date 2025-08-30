<script setup name="Home" lang="ts">
import { articleInfoApi, getSigninListApi, signinApi } from '@/api'
import signinBg from '@/assets/images/background/signin_bg.png'
import dayjs from 'dayjs'

import { useCommonStore } from '@/stores/common'
import { htmlDecodeByRegExp } from '@/utils/common'
import type { ArticleInfoType } from '@/interface/common'
import { defaultArticleInfo } from '@/defaultValue'
import starIcon from '@/assets/images/icons/star.png'

const { userDetail, userInfo } = storeToRefs(useCommonStore())

const { getUserInfo, getUserDetail } = useCommonStore()

const dayScore = ref(0)

const maxSigninDays = ref(0)

const signinDays = ref(0)

const signinList = ref<any[]>([])

const router = useRouter()

const showPopup = ref(false)

const rules = ref<ArticleInfoType>(Object.assign({}, defaultArticleInfo))

const signinOk = computed(() => {
  var nowDate = dayjs().format('yyyy-mm-dd')
  return signinList.value.some((item) => item.date === nowDate)
})

function getSigninList() {
  getSigninListApi().then((res) => {
    // maxSigninDays.value = res.data.max
    signinList.value = res.data.data.data
    // dayScore.value = res.data.score
  })
}

function signin() {
  signinApi().then((res) => {
    showPopup.value = true
    getSigninList()
    getUserInfo()
    getUserDetail()
  })
}

function getRules() {
  articleInfoApi({ code: 'team_recward_system' }).then((res) => {
    rules.value = res.data.data
  })
}

const content = computed(() => {
  return htmlDecodeByRegExp(rules.value.content || '').replace(/<img/g, '<img  width="100%"')
})

onMounted(() => {
  getSigninList()
  getRules()
})
</script>

<template>
  <div class="normal-page">
    <NormalHeader :background="false" :backIconTag="2">
      <template #right>
        <van-button type="primary" size="small" @click="router.push({ name: 'SigninHistory' })"
          >签到记录</van-button
        >
      </template>
    </NormalHeader>
    <div class="green-bg"></div>
    <BgTwo :imgSrc="signinBg" router="Signin" />
    <div class="signin-box">
      <van-row :gutter="[12, 12]">
        <van-col :span="item == 7 ? 12 : 6" v-for="item in 7" :key="item">
          <div class="day-card">
            <div class="days">{{ item }} Day</div>
            <div class="point-box">
              <img :src="starIcon" alt="" height="36" width="36" style="margin: 4px" />
              <div style="color: #999">{{ userInfo.outside_level_sign_amount || '0' }}元</div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="signin-card">
      <div style="font-size: 18px; font-weight: 600; text-align: center; margin-bottom: 16px">
        签到已获得 {{ userDetail.signin_money }} 元
        <!-- USDT -->
      </div>
      <van-button
        color="linear-gradient(to right, #13B756, #78C465)"
        round
        block
        :disabled="signinOk"
        @click="signin"
      >
        立即签到
      </van-button>
    </div>
    <div class="normal-card">
      <TitleDel title="签到规则" />
      <div v-html="content"></div>
    </div>
    <van-popup
      v-model:show="showPopup"
      :close-on-click-overlay="false"
      style="background: transparent; width: 360px"
    >
      <div class="signin-pop">
        <div class="signin-text">
          恭喜您获得 <img :src="starIcon" alt="" height="36" width="36" /> <span>{{ '5' }}</span
          >元
        </div>
      </div>
      <van-icon class="close-icon" size="40" name="close" color="#fff" @click="showPopup = false" />
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.point-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.close-icon {
  margin-left: 160px;
  margin-top: 10px;
}
.signin-pop {
  width: 100%;
  height: 280px;
  background-image: url('@/assets/images/background/signin_pop_bg.png');
  background-size: 100% 100%;
  padding-top: 140px;
  display: flex;
  justify-content: center;
  .signin-text {
    margin: auto;
    font-size: 16px;
    span {
      color: #56ba6d;
      font-size: 24px;
      margin: 0 4px;
    }
  }
}
.signin-card {
  margin: 16px 16px;
  padding: 24px;
  background-color: #fff;
  border-radius: 16px;
}
.day-card {
  background-color: #f7f8fb;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
  .days {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    background-color: #000;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
.green-bg {
  background-color: #78c465;
  height: calc(100% - 200px);
  width: 100%;
  position: absolute;
  top: 200px;
  left: 0;
  z-index: -1000;
}
.home-content {
  width: 100%;
  padding: 20px 16px;
  box-sizing: border-box;
}
.signin-box {
  margin: 120px 16px 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
}
</style>
