<script setup name="PesteUpdate" lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPesteList = () => {
  router.push('/peste-list')
}
</script>

<template>
  <div class="peste_update">
    <div class="content-1">Peste Update</div>
    <div class="content-2">
      Crops face major threats from pests, diseases, climate change, and soil degradation.
    </div>
    <van-button round color="#fff" @click="goToPesteList">
      <span style="color: rgba(30, 41, 59, 1); font-weight: 600">Learn more</span>
    </van-button>
  </div>
</template>

<style lang="scss" scoped>
.peste_update {
  box-sizing: border-box;
  width: 100%;
  height: 207px;
  border-radius: 12px;
  background-color: rgba(237, 233, 254, 1);
  position: relative;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  line-height: 1.3;
  background-image: url('@/assets/images/common/pesteupdate_1x-card.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .content-1 {
    font-size: 14px;
    font-weight: 700;
    width: 100%;
  }
  .content-2 {
    font-size: 12px;
    flex-grow: 1;
    width: calc(100% - 20px);
    font-weight: 500;
    margin-top: 12px;
  }
}
</style>
