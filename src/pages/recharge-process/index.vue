<template>
  <div class="normal-page">
    <BgTwo router="RechargeProcess" />
    <NormalHeader :background="false" title="充值流程"> </NormalHeader>
    <div class="c-box">
      <div class="h-box">银行卡和扫码充值流程</div>
      <div class="b-box">
        <van-steps direction="vertical" :active="-1">
          <van-step>
            <h3>STEP 1</h3>
            <p class="step">点击[我的]</p>
          </van-step>
          <van-step>
            <h3>STEP 2</h3>
            <p class="step">点击进入 [钱包]界面</p>
          </van-step>
          <van-step>
            <h3>STEP 3</h3>
            <p class="step">点击进入 [钱包]界面点击进入 [钱包]</p>
          </van-step>
          <van-step>
            <h3>STEP 4</h3>
            <p class="step">点击进入 [钱包]界面点击进入 [钱包]</p>
          </van-step>
          <van-step>
            <h3>STEP 5</h3>
            <p class="step">点击进入 [钱包]界面点击进入 [钱包]</p>
          </van-step>
          <van-step>
            <h3>STEP 6</h3>
            <p class="step">点击进入 [钱包]界面点击进入 [钱包]</p>
          </van-step>
        </van-steps>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RechargeProcess">
const router = useRouter()
</script>

<style lang="scss" scoped>
.c-box {
  margin: 16px;
  background-color: #13b756;
  border-radius: 16px;
  overflow: hidden;
  .b-box {
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    padding: 8px;
  }
  .h-box {
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    color: #fff;
    font-weight: 600;
  }
}
h3 {
  color: #13b756;
}
step {
  color: #222;
}
</style>
