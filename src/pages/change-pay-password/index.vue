<script setup name="ForgetPassword" lang="ts">
import passwordIcon from '@/assets/images/icons/password.png'
import usernameIcon from '@/assets/images/icons/username.png'
import validCodeIcon from '@/assets/images/icons/valid_code.png'
import openEyeIcon from '@/assets/images/icons/open_eye.png'
import closeEyeIcon from '@/assets/images/icons/close_eye.png'
import changePayPasswordHook from '@/hooks/changePayPasswordHook'

const { onSubmit, formData, openEye1, openEye2, getCode, counter, userInfo } =
  changePayPasswordHook()

function onInput1(e: any) {
  // 只保留数字，最多 6 位
  formData.password = e.target!.value.replace(/\D/g, '').slice(0, 6)
  console.log(formData.password)
}
function onInput2(e: any) {
  // 只保留数字，最多 6 位
  formData.confirmPassword = e.target.value.replace(/\D/g, '').slice(0, 6)
}
</script>

<template>
  <div class="normal-page">
    <NormalHeader title="重置支付密码" />
    <div class="re-box">
      <van-form @submit="onSubmit" required class="login-form self-form">
        <van-field v-model="userInfo.phone2" name="username" placeholder="请输入手机号" disabled>
          <template #left-icon>
            <img :src="usernameIcon" width="24" height="24" alt="" />
          </template>
        </van-field>
        <div class="code-form">
          <van-field
            v-model="formData.smscode"
            type="number"
            :maxlength="6"
            name="code"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
          >
            <template #left-icon>
              <img :src="validCodeIcon" width="24" height="24" alt="" />
            </template>
          </van-field>
          <van-button
            size="large"
            round
            @click="getCode"
            :type="counter ? 'success' : 'default'"
            :disabled="!!counter"
            style="width: 120px; height: 54px; border: none; margin-left: 16px; font-size: 12px"
            >{{ counter ? `${counter}s` : '获取验证码' }}</van-button
          >
        </div>
        <van-field
          v-model="formData.password"
          :type="openEye1 ? 'number' : 'password'"
          name="password"
          placeholder="请输入密码"
          @input="onInput1"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <template #left-icon>
            <img :src="passwordIcon" width="24" height="24" alt="" />
          </template>
          <template #right-icon>
            <div style="cursor: pointer; margin-top: 4px" @click="openEye1 = !openEye1">
              <img :src="openEyeIcon" v-if="openEye1" width="24" height="24" alt="" />
              <img :src="closeEyeIcon" v-else width="24" height="24" alt="" />
            </div>
          </template>
        </van-field>
        <van-field
          v-model="formData.confirmPassword"
          :type="openEye2 ? 'number' : 'password'"
          name="confirmPassword"
          placeholder="请再次输入密码"
          @input="onInput2"
          :rules="[
            { required: true, message: '请再次输入密码' },
            {
              validator: (val) => {
                return formData.password != formData.confirmPassword ? '两次输入的密码不一致' : ''
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
.code-form {
  display: flex;
}
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
