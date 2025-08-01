<script setup name="Home" lang="ts">
import passwordIcon from '@/assets/images/icons/password.png'
import usernameIcon from '@/assets/images/icons/username.png'
import loginLogo from '@/assets/images/common/login_logo.png'
import openEyeIcon from '@/assets/images/icons/open_eye.png'
import closeEyeIcon from '@/assets/images/icons/close_eye.png'

const formData = reactive({
  username: '',
  password: ''
})

const openEye = ref(false)

const checked = ref(true)
const onSubmit = (values: any) => {
  console.log('submit', values)
}

const router = useRouter()
</script>

<template>
  <div class="normal-page">
    <HeaderPlaceholder />
    <NormalBackground />
    <img :src="loginLogo" width="75" style="margin-top: 80px; margin-left: 8px" alt="" />
    <div class="welcome-text">Welcome To Use Iberdrola</div>
    <van-form @submit="onSubmit" required class="login-form">
      <van-field
        v-model="formData.username"
        name="username"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
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
      <van-button
        class="submit-button"
        size="large"
        block
        type="primary"
        native-type="submit"
        style="margin-top: 48px"
      >
        提交
      </van-button>
    </van-form>
    <div class="re-to-for">
      <div @click="router.push({ name: 'Register' })">立即注册</div>
      <div class="center"></div>
      <div @click="router.push({ name: 'ForgetPassword' })">忘记密码</div>
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
.normal-page {
  padding: 26px;
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
  margin-top: 180px;
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

.re-to-for {
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  & > div {
    cursor: pointer;
  }

  .center {
    height: 12px;
    width: 1px;
    background-color: var(--main-text-color);
    margin: 0 20px;
  }
}
</style>
