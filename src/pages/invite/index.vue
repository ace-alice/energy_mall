<script setup lang="ts" name="Invite">
import codeInvite from '@/assets/images/icons/code_invite.png'
import scanInvite from '@/assets/images/icons/scan_invite.png'
import { useCommonStore } from '@/stores/common'
import QRCode from 'qrcode'

const { userInfo } = storeToRefs(useCommonStore())

const inviteUrl = computed(() => {
  return `${location.origin}/?invite=${userInfo.value.invite}`
})

const cv = ref<HTMLCanvasElement | null>(null)
const size = 230

async function draw() {
  if (!cv.value) return
  await QRCode.toCanvas(cv.value, inviteUrl.value, {
    width: size,
    margin: 2,
    errorCorrectionLevel: 'M'
  })
  // 在中心绘制 logo（可选）
  const ctx = cv.value.getContext('2d')!
  const img = new Image()
  img.src = '/logo.png'
  img.onload = () => {
    const w = 48,
      h = 48
    ctx.roundRect((size - w) / 2, (size - h) / 2, w, h, 8)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h)
  }
}
onMounted(draw)
watch(inviteUrl, draw)
</script>

<template>
  <div class="normal-page invite">
    <NormalHeader :background="false" :backIconTag="2" />
    <div class="invite-card">
      <div class="card-top">
        <div style="font-size: 32px">{{ userInfo.invite }}</div>
        <Clipboard :content="inviteUrl">
          <template #label>
            <van-button type="primary" style="margin-top: 4px" round size="small"
              >复制邀请码</van-button
            >
          </template>
        </Clipboard>
      </div>
      <div class="card-bottom">
        <canvas ref="cv" :width="size" :height="size"></canvas>
      </div>
    </div>
    <div class="notice-card">
      <div class="card-item">
        <img :src="scanInvite" height="30" width="30" alt="" />
        朋友扫二维码注册加入
      </div>
      <div class="card-item">
        <img :src="codeInvite" height="30" width="30" alt="" />
        注册时输入你的邀请码
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-top {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-bottom {
  padding: 20px 40px;
}
.invite {
  background-color: #09090c;
  min-height: 100vh;
  background-image: url('@/assets/images/background/invite_bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  .invite-card {
    width: 310px;
    height: 360px;
    margin: auto;
    margin-top: 180px;
    background-image: url('@/assets/images/background/invite_code_bg.png');
    background-size: 100% 100%;
  }
  .notice-card {
    width: 312px;
    margin: auto;
    margin-top: 20px;
    padding: 16px 16px 16px 46px;
    border-radius: 16px;
    border: 1px solid #ffffff30;
  }
  .card-item {
    & + .card-item {
      margin-top: 12px;
    }
    display: flex;
    color: #13b756;
    align-items: center;
    img {
      margin-right: 8px;
    }
  }
}
</style>
