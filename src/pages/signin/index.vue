<script setup name="Home" lang="ts">
import { getSigninListApi, signinApi } from '@/api'
import signinBg from '@/assets/images/background/signin_bg.png'
import dayjs from 'dayjs'

import { useCommonStore } from '@/stores/common'
const { userInfo } = storeToRefs(useCommonStore())

const dayScore = ref(0)

const maxSigninDays = ref(0)

const signinDays = ref(0)

const signinList = ref<any[]>([])

const signinOk = computed(() => {
  var nowDate = dayjs().format('yyyy-mm-dd')
  return signinList.value.some((item) => item.date === nowDate)
})

function getSigninList() {
  getSigninListApi().then((res) => {
    // maxSigninDays.value = res.data.max
    signinList.value = res.data.data
    // dayScore.value = res.data.score
  })
}

function signin() {
  signinApi().then((res) => {
    getSigninList()
  })
}

onMounted(() => {
  getSigninList()
})
</script>

<template>
  <div class="normal-page">
    <NormalHeader :background="false" :backIconTag="2" />
    <div class="green-bg"></div>
    <BgTwo :imgSrc="signinBg" router="Signin" />
    <div class="signin-box">
      <van-row :gutter="[12, 12]">
        <van-col :span="item == 7 ? 12 : 6" v-for="item in 7" :key="item">
          <div class="day-card">
            <div class="days">{{ item }} Day</div>
            <div class="point-box"></div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="signin-card">
      <div style="font-size: 18px; font-weight: 600; text-align: center; margin-bottom: 16px">
        签到已获得 {{ 30.5 }} USDT
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
  </div>
</template>

<style lang="scss" scoped>
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
