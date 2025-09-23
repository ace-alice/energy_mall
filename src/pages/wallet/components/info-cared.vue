<script setup lang="ts" name="InfoBox">
import titleIcon from '@/assets/images/icons/valid_total.png'
const props = defineProps(['title', 'label1', 'label2', 'value1', 'value2'])
</script>

<template>
  <div class="m-box">
    <div class="box-header">
      <img :src="titleIcon" height="24" width="24" alt="" srcset="" />
      <div>{{ title }}</div>
    </div>
    <div class="box-header-1"></div>
    <div class="info-box">
      <div class="info">
        <div style="margin-bottom: 10px">{{ label1 }}</div>
        <div style="font-size: 28px; font-weight: 500">
          {{ value1 }}
        </div>
      </div>
      <div class="info">
        <div style="margin-bottom: 10px">{{ label2 }}</div>
        <div style="font-size: 28px; font-weight: 500">
          {{ value2 }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-box {
  display: flex;
  margin-top: 30px;
}
.info {
  width: 50%;
  padding-left: 24px;
  & > div:nth-child(1) {
    font-size: 14px;
    color: #999;
  }
}
.box-header {
  position: absolute;
  height: 35px;
  width: 140px;
  background-color: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 8px;
  border-top: 2px solid #13b756;
  left: 0;
  top: -20px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  & > div {
    margin-left: 4px;
    font-weight: 600;
  }
}
.box-header-1 {
  position: absolute;
  height: 35px;
  width: 60px;
  background-color: #fff;
  border-top: 2px solid #13b756;
  transform: rotateZ(45deg) translateY(-3px);
  left: 114px;
}

.m-box {
  height: 110px;
  background-color: #fff;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  border-top: 2px solid #13b756;
  margin: 40px 16px 0;
  position: relative;
}
</style>
