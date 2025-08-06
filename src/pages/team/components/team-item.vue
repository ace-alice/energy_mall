<template>
  <div class="team-item">
    <div class="name">Summer 13576768909</div>
    <div class="time">注册时间 2024.12.23 14:3</div>
    <div class="info">
      <van-grid :border="false" column-num="4" :center="false">
        <van-grid-item class="direction">
          <div>
            <div class="label">充值(USDT)</div>
            <div class="value">
              <VueCountTo :end-val="Number(200)" :start-val="0" />
            </div>
          </div>
        </van-grid-item>
        <van-grid-item class="direction">
          <div>
            <div class="label">提现(USDT)</div>
            <div class="value">22345.00</div>
          </div>
        </van-grid-item>
        <van-grid-item class="direction">
          <div>
            <div class="label">在投(USDT)</div>
            <div class="value">22345.00</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <div class="label">总投资(USDT)</div>
            <div class="value">22345.00</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="next-team">
      <div>团队总人数<span>123</span></div>
      <div>一级总人数 <span>123</span></div>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script setup lang="ts" name="TeamItem">
const props = defineProps(['item'])
</script>

<style lang="scss" scoped>
.info {
  background: #f9f9f9;
  padding: 9px 6px;
  margin-top: 8px;
  border-radius: 8px;
  :deep(.van-grid-item__content) {
    background: unset;
  }
}
.name {
  font-size: 16px;
  font-weight: 500;
}
.time {
  font-size: 12px;
  color: #999999;
  margin-top: 8px;
}
.next-team {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 12px;
  color: #999999;
  div {
    width: 40%;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    margin-left: 8px;
    color: #222;
  }
}
.team-item {
  margin: 12px 0;
  background-color: white;
  border-top: 3px solid #13b756;
  border-radius: 12px;
  padding: 12px;
}
.direction {
  position: relative;
  &::after {
    content: '/';
    position: absolute;
    font-size: 12px;
    color: #8d9196;
    opacity: 0.6;
    top: 20px;
    right: 5px;
  }
}
.label {
  font-size: 12px;
  margin-bottom: 4px;
  margin-top: 2px;
  color: #999999;
}
.value,
.value span {
  font-size: 14px;
  font-weight: 500;
}
:deep(.van-grid-item__content) {
  padding: 6px 2px;
  font-size: 17px;
}
</style>
