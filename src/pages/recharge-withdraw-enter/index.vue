<script setup lang="ts" name="RechargeWithdrawEnter">
import vipRecharge from '@/assets/images/icons/vip_recharge.png'
import vipWithdraw from '@/assets/images/icons/vip_withdraw.png'
import goIcon from '@/assets/images/icons/go_icon.png'

const router = useRouter()
</script>

<template>
  <div class="normal-page invite">
    <NormalHeader :background="false" :backIconTag="2" />
    <div style="margin-top: 420px">
      <van-sticky :offset-bottom="260" position="bottom">
        <div class="normal-card enter-card" @click="router.push({ name: 'Recharge' })">
          <img :src="vipRecharge" height="58" width="58" alt="" srcset="" />
          <div>
            <div>充值</div>
            <div></div>
          </div>
          <img :src="goIcon" width="30" height="18" alt="" srcset="" />
        </div>
        <div class="normal-card enter-card" @click="router.push({ name: 'Withdraw' })">
          <img :src="vipWithdraw" height="58" width="58" alt="" srcset="" />
          <div>
            <div>提现</div>
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
  background-image: url('@/assets/images/background/r_w_e_bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
