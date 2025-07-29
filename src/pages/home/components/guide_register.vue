<script setup name="GuideRegister" lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userInfoApi } from '@/api/login'
import { setLocal } from '@/utils/storage'
import QRCode from 'qrcode'
import type { UserInfo } from '@/interface/common'
import { getLocal } from '@/utils/storage'
import { AppChannelType } from '@/tools/jsBridge/interface'

const router = useRouter()
const route = useRoute()
const userInfo = ref<UserInfo | null>(null)
const qrCodeUrl = ref('')

// 生成二维码
const generateQRCode = async (rsbsaId: string | null) => {
  try {
    if (rsbsaId) {
      qrCodeUrl.value = await QRCode.toDataURL(rsbsaId, {
        width: 130,
        margin: 0,
        color: {
          dark: '#065F46',
          light: '#d1fae5'
        }
      })
    }
  } catch (err) {
    console.error('QR Code generation error:', err)
  }
}

// 判断是否显示已通过视图
const isApproved = computed(() => {
  return userInfo.value?.reviewStatus === 'Approved' && userInfo.value?.rsbsaId
})

// 获取用户信息
const queryUserInfo = async () => {
  try {
    const res = await userInfoApi() //getLocal('userId')  107965568409600
    if (res.data) {
      res.data.RSBSA = res.data.rsbsaId
      //  res.data.reviewStatus='Approved';
      userInfo.value = res.data

      setLocal('registerInfo', res.data)

      if (userInfo.value && userInfo.value.reviewStatus === 'Approved' && userInfo.value.rsbsaId) {
        // 生成二维码
        await generateQRCode(userInfo.value.rsbsaId)
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

const showRegisterButton = computed(() => {
  if (!userInfo.value) return true
  return userInfo.value.reviewStatus !== 'Pending' && userInfo.value.reviewStatus !== 'Approved'
})

function goRegister(routeName: string) {
  showDialog.value = false
  router.push({ name: routeName })
}

function viewProfile() {
  // window.WebViewJSBridge.callHandler(AppChannelType.toNamed, {
  //   data: {
  //     routerName: '/livePage',
  //     id: 111266756440064,
  //     type: 'ThirdPartyLive',
  //     liveId: 111266756440064
  //   }
  // })

  router.push({ name: 'RsbsaProfile' })
}

const showDialog = ref(false)

// 监听路由变化
watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName === 'Home') {
      queryUserInfo()
    }
  },
  { immediate: true }
)

onMounted(() => { })
</script>

<template>
  <div class="guide-register" :class="{ approved: isApproved }">
    <template v-if="isApproved">
      <div class="user-info">
        <div class="left-section">
          <div class="avatar-section">
            <div class="avatar">
              <img :src="userInfo?.avatarUrl" alt="avatar" />
            </div>
            <div class="info">
              <div class="name">{{ userInfo?.firstName }} {{ userInfo?.lastName }}</div>
              <div class="role">{{ userInfo?.farmerClassification }}</div>
            </div>
          </div>
          <van-button round color="#fff" style="width: 178px" @click="viewProfile">
            <span style="color: rgba(30, 41, 59, 1); font-weight: 600">View Profile</span>
          </van-button>
        </div>
        <div class="qr-code">
          <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="content-1">Registry System for Basic Sectors in Agriculture (RSBSA)</div>
      <div class="content-2">Empowering Farmers Through Registration and Support.</div>
      <div class="content-3">
        <van-button v-if="showRegisterButton" round color="#fff" style="width: 141px" @click="goRegister('Register')">
          <span style="color: rgba(30, 41, 59, 1); font-weight: 600">Register Now</span>
        </van-button>
        <van-button v-else round color="#fff" style="width: 141px" disabled>
          <span style="color: rgba(30, 41, 59, 1); font-weight: 600">Reviewing</span>
        </van-button>
      </div>
    </template>
  </div>

  <van-dialog v-model:show="showDialog" :show-cancel-button="false" :showConfirmButton="false" closeOnClickOverlay
    width="256">
    <div class="register-dialog-header">
      <van-icon name="cross" @click="showDialog = false" />
    </div>
    <div class="register-dialog">
      <div class="dialog-title">Do you have a RSBSA account already?</div>
      <div style="height: 16px"></div>
      <div class="dialog-content">
        Ipaalam sa amin kung isa kang magsasaka — may mga tampok kaming ginawa para sa'yo.
      </div>
      <div style="height: 16px"></div>
      <van-button block round color="linear-gradient(to right, #0077E5, #1E40AF)"
        @click="goRegister('Finder')">Yes</van-button>
      <div style="height: 16px"></div>
      <van-button block round color="#F1F5F9" @click="goRegister('Register')">
        <span style="color: #1e293b; font-weight: 600">Register now</span></van-button>
    </div>
  </van-dialog>
</template>

<style lang="scss" scoped>
.guide-register {
  width: 100%;
  height: 171px;
  border-radius: 12px;
  background-color: rgba(209, 250, 229, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  line-height: 1.3;
  background-image: url('@/assets/images/common/rsbsa_1x-card.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  &.approved {
    background: #d1fae5;
    padding: 20px;
    display: flex;
    align-items: center;
    background-image: none;

    .user-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left-section {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .avatar-section {
          display: flex;
          align-items: center;
          gap: 12px;

          .avatar {
            width: 64px;
            height: 64px;
            border: 3px solid #fff;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .info {
            .name {
              font-size: 16px;
              font-weight: 500;
              color: #111827;
              margin-bottom: 4px;
            }

            .role {
              font-size: 14px;
              color: #047857;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              width: 120px;
              word-break: break-word;
            }
          }
        }
      }

      .qr-code {
        width: 130px;
        height: 130px;
        border-radius: 8px;
        padding: 8px;
        box-sizing: border-box;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }

  .content-1 {
    font-size: 14px;
    font-weight: 700;
    width: 220px;
  }

  .content-2 {
    font-size: 12px;
    flex-grow: 1;
    width: 220px;
    margin-top: 12px;
  }

  .content-3 {
    width: 180px;
  }
}

.register-dialog-header {
  width: 100%;
  height: 48px;
  display: flex;
  box-sizing: border-box;
  padding-right: 16px;
  align-items: center;
  justify-content: flex-end;
}

.dialog-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

.dialog-content {
  font-size: 14px;
  color: #64748b;
  text-align: center;
}

.register-dialog {
  box-sizing: border-box;
  padding: 0 20px 20px 20px;
}
</style>
