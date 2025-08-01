<script setup name="ForgetPassword" lang="ts">
import passwordIcon from '@/assets/images/icons/password.png'
import usernameIcon from '@/assets/images/icons/username.png'
import loginLogo from '@/assets/images/common/login_logo.png'
import invitationIcon from '@/assets/images/icons/invitation.png'
import validCodeIcon from '@/assets/images/icons/valid_code.png'
import openEyeIcon from '@/assets/images/icons/open_eye.png'
import closeEyeIcon from '@/assets/images/icons/close_eye.png'

const username = ref('')
const password = ref('')
const checked = ref(true)
const onSubmit = (values: any) => {
  console.log('submit', values)
}

const openEye = ref(false)

const openEye2 = ref(false)

const router = useRouter()
</script>

<template>
  <div class="normal-page">
    <NormalHeader />
    <NormalBackground />
    <div class="re-box">
      <img :src="loginLogo" width="75" style="margin-left: 8px" alt="" />
      <div class="welcome-text">忘记<span style="font-weight: 600">密码</span></div>
      <van-form @submit="onSubmit" required class="login-form">
        <van-field
          v-model="username"
          name="username"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        >
          <template #left-icon>
            <img :src="usernameIcon" width="24" height="24" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="password"
          type="text"
          name="password"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #left-icon>
            <img :src="validCodeIcon" width="24" height="24" alt="" />
          </template>
          <template #right-icon>
            <div style="cursor: pointer; margin-top: 4px">45215</div>
          </template>
        </van-field>
        <van-field
          v-model="password"
          :type="openEye ? 'text' : 'password'"
          name="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <template #left-icon>
            <img :src="passwordIcon" width="24" height="24" alt="" />
          </template>
          <template #right-icon>
            <div style="cursor: pointer; margin-top: 4px" @click="openEye = !openEye">
              <img :src="openEyeIcon" v-if="openEye" width="24" height="24" alt="" />
              <img :src="closeEyeIcon" v-else width="24" height="24" alt="" />
            </div>
          </template>
        </van-field>
        <van-field
          v-model="password"
          :type="openEye2 ? 'text' : 'password'"
          name="password"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请再次输入密码' }]"
        >
          <template #left-icon>
            <img :src="passwordIcon" width="24" height="24" alt="" />
          </template>
          <template #right-icon>
            <div style="cursor: pointer; margin-top: 4px" @click="openEye2 = !openEye2">
              <img :src="openEyeIcon" v-if="openEye2" width="24" height="24" alt="" />
              <img :src="closeEyeIcon" v-else width="24" height="24" alt="" />
            </div>
          </template>
        </van-field>
        <van-button
          class="submit-button"
          size="large"
          block
          type="primary"
          native-type="submit"
          style="margin-top: 48px"
        >
          确定
        </van-button>
      </van-form>
    </div>
    <van-sticky offset-top="84vh" position="top">
      <div class="login-bottom">
        <CustomService />
      </div>
    </van-sticky>
  </div>
</template>

<style lang="scss" scoped>
.re-box {
  padding: 0 28px;
}

.welcome-text {
  font-size: 28px;
  width: 213px;
  margin-left: 8px;
  margin-top: 16px;
}

.login-bottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form {
  margin-top: 24px;
  margin-bottom: 40px;
}

.custom {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 16px;

  span {
    color: var(--van-button-primary-color);
  }
}
</style>
