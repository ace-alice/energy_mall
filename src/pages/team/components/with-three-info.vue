<template>
  <van-grid :border="false" column-num="3" :center="false">
    <van-grid-item class="direction">
      <div>
        <div class="label">一级投资人数</div>
        <div>
          <VueCountTo :end-val="Number(userInfo.money)" :start-val="0" />
        </div>
      </div>
    </van-grid-item>
    <van-grid-item class="direction">
      <div>
        <div class="label">二级投资人数</div>
        <div>22345.00</div>
      </div>
    </van-grid-item>
    <van-grid-item>
      <div>
        <div class="label">三级投资人数</div>
        <div>
          <VueCountTo :end-val="Number(userInfo.user_points)" :start-val="0" />
        </div>
      </div>
    </van-grid-item>
    <van-grid-item class="direction">
      <div>
        <div class="label">一级投资资金</div>
        <div>22345.00</div>
      </div>
    </van-grid-item>
    <van-grid-item class="direction">
      <div>
        <div class="label">二级投资资金</div>
        <div>22345.00</div>
      </div>
    </van-grid-item>
    <van-grid-item>
      <div>
        <div class="label">三级投资资金</div>
        <div>22345.00</div>
      </div>
    </van-grid-item>
    <van-grid-item class="direction">
      <div>
        <div class="label">三级内总计投资</div>
        <div>22345.00</div>
      </div>
    </van-grid-item>
    <van-grid-item class="direction">
      <div>
        <div class="label">三级内总计提现</div>
        <div>22345.00</div>
      </div>
    </van-grid-item>
    <van-grid-item>
      <div>
        <div class="label">团队总充值</div>
        <div>22345.00</div>
      </div>
    </van-grid-item>
  </van-grid>
</template>

<script setup lang="ts" name="WithThreeInfo">
import { useCommonStore } from '@/stores/common'
const { userInfo } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
.direction {
  position: relative;
  &::after {
    content: '/';
    position: absolute;
    font-size: 12px;
    color: #8d9196;
    opacity: 0.6;
    top: 20px;
    right: 10px;
  }
}
.label {
  font-size: 12px;
  margin-bottom: 4px;
  margin-top: 2px;
  color: #999999;
}
:deep(.van-grid-item__content) {
  padding: 10px 12px;
  font-size: 17px;
}
</style>
