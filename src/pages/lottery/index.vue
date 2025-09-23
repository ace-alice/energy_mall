<script setup lang="ts" name="Lottery">
import drawHook from '@/hooks/drawHook'

const {
  myLucky,
  defaultConfig,
  buttons,
  defaultStyle,
  blocks,
  startCallback,
  endCallback,
  content,
  prizes,
  userDetail,
  winInfo,
  showPopup,
  userInfo,
  loading,
  winText
} = drawHook()

const currency = __VITE_CURRENCY
</script>

<template>
  <div class="normal-page lottery-bg">
    <NormalHeader :background="false" :back-icon-tag="2">
      <template #right>
        <van-button type="success" size="small" to="/lottery-history">抽奖记录</van-button>
      </template>
    </NormalHeader>
    <div class="wheel-box">
      <LuckyWheel
        class="lucky-wheel"
        ref="myLucky"
        width="200px"
        height="200px"
        :defaultConfig="defaultConfig"
        :defaultStyle="defaultStyle"
        :prizes="prizes"
        :blocks="blocks"
        :buttons="buttons"
        @end="endCallback"
      />
    </div>
    <div class="normal-card draw-rule-card">
      <TitleDel title="抽奖规则" />
      <div v-html="content"></div>
    </div>
    <van-sticky :offset-bottom="0" position="bottom">
      <div class="bottom-btn">
        <van-button type="primary" round block @click="startCallback" :loading="loading"
          >立即抽奖
          <span v-if="Number(userInfo.raffle_num)"> ( {{ userInfo.raffle_num }}次 )</span>
          <span v-else> ( {{ userInfo.user_points }}积分 )</span>
        </van-button>
        <!-- <div v-waves class="btn-card points" @click="startCallback(2)">
          {{ userInfo.raffle_num }}次
        </div> -->
      </div>
    </van-sticky>
    <van-popup
      v-model:show="showPopup"
      :close-on-click-overlay="false"
      style="background: transparent; width: 360px"
    >
      <div class="signin-pop">
        <div class="signin-text">
          恭喜您获得 <span>{{ winText }}</span>
        </div>
      </div>
      <van-icon class="close-icon" size="40" name="close" color="#fff" @click="showPopup = false" />
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.close-icon {
  margin-left: 160px;
  margin-top: 10px;
}
.signin-pop {
  width: 100%;
  height: 280px;
  background-image: url('@/assets/images/draw/info_card_bg.png');
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
.fresh {
  background-image: url('@/assets/images/draw/btn2.png');
  color: #fff;
}
.vip {
  background-image: url('@/assets/images/draw/btn3.png');
  color: #4e0000;
}
.points {
  background-image: url('@/assets/images/draw/btn1.png');
  color: #fff;
}
.btn-card {
  width: 120px;
  height: 60px;
  background-size: 100% 100%;
  border-radius: 16px;
  font-size: 12px;
  text-align: center;
  padding: 4px 0;
}
.bottom-btn {
  width: 100%;
  height: 130px;
  background-image: url('@/assets/images/draw/btn_card_bg.png');
  background-size: 100% 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-evenly;
}
.draw-rule-card {
  background-color: #00000020;
  color: #fff;
  font-size: 18px;
  margin-bottom: 120px;
  &:deep(.title img) {
    filter: brightness(0) invert(1);
  }
}
.wheel-box {
  width: 320px;
  height: 320 / 750 * 760px;
  background-image: url('@/assets/images/draw/bg.png');
  background-size: 100% 100%;
  position: relative;
  margin: 120px auto 40px;
  .lucky-wheel {
    position: absolute;
    top: 41px;
    left: 58px;
  }
}
.lottery-bg {
  background-color: #49cc83;
  min-height: 100vh;
  background-image: url('@/assets/images/background/lottery_bg.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
}
</style>
