<script setup name="Register" lang="ts">
import passwordIcon from '@/assets/images/icons/password.png'
import usernameIcon from '@/assets/images/icons/username.png'
import loginLogo from '@/assets/images/common/login_logo.png'
import invitationIcon from '@/assets/images/icons/invitation.png'
// import validCodeIcon from '@/assets/images/icons/valid_code.png'
import openEyeIcon from '@/assets/images/icons/open_eye.png'
import closeEyeIcon from '@/assets/images/icons/close_eye.png'
import registerHook from '@/hooks/registerHook'
import { getLocal } from '@/utils/storage'

const { formData, onSubmit, openEye, openEye2, openEye3, openEye4, checked, router } =
  registerHook()
</script>

<template>
  <div class="normal-page">
    <NormalHeader :background="false" />
    <NormalBackground router="Register" />
    <div class="re-box">
      <img :src="loginLogo" width="75" style="margin-left: 8px" alt="" />
      <div class="welcome-text">注册<span style="font-weight: 600">账号</span></div>
      <van-form @submit="onSubmit" required class="login-form self-form">
        <van-field
          v-model="formData.phone"
          name="phone"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            { pattern: /\d{11}/, message: '请输入正确手机号' }
          ]"
          autocomplete="off"
        >
          <template #left-icon>
            <img :src="usernameIcon" width="24" height="24" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="formData.password"
          :type="openEye ? 'text' : 'password'"
          name="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
          autocomplete="off"
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
          v-model="formData.password1"
          :type="openEye2 ? 'text' : 'password'"
          name="password1"
          placeholder="请再次输入密码"
          :rules="[
            { required: true, message: '请再次输入密码' },
            {
              validator: (val) => {
                return formData.password != formData.password1 ? '两次输入的密码不一致' : ''
              },
              message: '两次输入的密码不一致'
            }
          ]"
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
        <van-field
          v-model="formData.withdraw"
          :type="openEye3 ? 'number' : 'password'"
          name="withdraw"
          :maxlength="6"
          placeholder="请输入支付密码"
          :rules="[
            { required: true, message: '请输入支付密码' },
            { pattern: /\d{6}/, message: '请输入6位数字作为支付密码' }
          ]"
        >
          <template #left-icon>
            <img :src="passwordIcon" width="24" height="24" alt="" />
          </template>
          <template #right-icon>
            <div style="cursor: pointer; margin-top: 4px" @click="openEye3 = !openEye3">
              <img :src="openEyeIcon" v-if="openEye3" width="24" height="24" alt="" />
              <img :src="closeEyeIcon" v-else width="24" height="24" alt="" />
            </div>
          </template>
        </van-field>
        <van-field
          v-model="formData.withdraw1"
          :type="openEye4 ? 'number' : 'password'"
          :maxlength="6"
          name="withdraw1"
          placeholder="请再次输入支付密码"
          :rules="[
            { required: true, message: '请再次输入支付密码' },
            { pattern: /\d{6}/, message: '请输入6位数字作为支付密码' },
            {
              validator: (val) => {
                return formData.withdraw != formData.withdraw1 ? '两次输入的密码不一致' : ''
              },
              message: '两次输入的密码不一致'
            }
          ]"
        >
          <template #left-icon>
            <img :src="passwordIcon" width="24" height="24" alt="" />
          </template>
          <template #right-icon>
            <div style="cursor: pointer; margin-top: 4px" @click="openEye4 = !openEye4">
              <img :src="openEyeIcon" v-if="openEye4" width="24" height="24" alt="" />
              <img :src="closeEyeIcon" v-else width="24" height="24" alt="" />
            </div>
          </template>
        </van-field>
        <van-field
          v-model="formData.invite"
          type="text"
          :disabled="!!getLocal('inviteCode')"
          name="invite"
          placeholder="请输入邀请码"
          :rules="[{ required: true, message: '请输入邀请码' }]"
        >
          <template #left-icon>
            <img :src="invitationIcon" width="24" height="24" alt="" />
          </template>
        </van-field>
        <!-- <van-field
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
        </van-field> -->
        <van-button
          class="submit-button"
          size="large"
          block
          type="primary"
          native-type="submit"
          style="margin-top: 48px"
          :disabled="!checked"
        >
          注册
        </van-button>
      </van-form>
      <div class="re-to-for">
        <span>已有账号，去</span>
        <div style="font-weight: 600" @click="router.push({ name: 'Login' })">登录</div>
      </div>
    </div>
    <van-sticky offset-top="84vh" position="top">
      <div class="login-bottom">
        <CustomService />
        <div class="custom">
          <van-checkbox v-model="checked" checked-color="#222" icon-size="16"
            >我已阅读并同意
            <span>《服务协议》</span>
            <span>《隐私协议》</span>
          </van-checkbox>
        </div>
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
  // margin-bottom: 40px;
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

.re-to-for {
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-bottom: 40px;

  .center {
    height: 12px;
    width: 1px;
    background-color: var(--main-text-color);
    margin: 0 20px;
  }
}
</style>
