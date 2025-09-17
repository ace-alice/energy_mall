<template>
  <div class="team-overview">
    <div class="team-level">一级团队长</div>
    <van-grid :border="false" column-num="2" :center="false">
      <van-grid-item class="">
        <div style="display: flex; align-items: center">
          <img :src="re_total" width="35" style="margin-right: 4px" alt="" />
          <div>
            <div class="label">总注册人数</div>
            <div>
              {{ Number(userDetail.team_num) }}
            </div>
          </div>
        </div>
      </van-grid-item>
      <van-grid-item class="">
        <div style="display: flex; align-items: center">
          <img :src="real_total" width="35" style="margin-right: 8px" alt="" />
          <div>
            <div class="label">有效充值人数</div>
            <div>
              {{ Number(userDetail.valid_recharge_num) }}
            </div>
          </div>
        </div>
      </van-grid-item>
      <van-grid-item class="">
        <div style="display: flex; align-items: center">
          <img :src="valid_total" width="35" style="margin-right: 4px" alt="" />
          <div>
            <div class="label">有效充值金额</div>
            <div>
              <VueCountTo :end-val="Number(userDetail.team_recharge_money)" :start-val="0" />
            </div>
          </div>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div style="display: flex; align-items: center">
          <img :src="my_total" width="35" style="margin-right: 4px" alt="" />
          <div>
            <div class="label">团队提款金额</div>
            <div>
              <VueCountTo :end-val="Number(userDetail.team_withdraw_money)" :start-val="0" />
            </div>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup lang="ts" name="TeamOverview">
import re_total from '@/assets/images/icons/re_total.png'
import real_total from '@/assets/images/icons/real_total.png'
import valid_total from '@/assets/images/icons/valid_total.png'
import my_total from '@/assets/images/icons/my_total.png'
import { useCommonStore } from '@/stores/common'
const { userDetail } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
.team-level {
  font-size: 16px;
  //   font-weight: 600;
  color: #ff0000;
  margin: 16px 16px 0;
}
.team-overview {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.direction {
  display: flex;
}
.label {
  font-size: 12px;
  margin-bottom: 8px;
  margin-top: 2px;
  color: #999999;
}
:deep(.van-grid-item__content) {
  padding: 10px 8px;
  font-size: 17px;
}
</style>
