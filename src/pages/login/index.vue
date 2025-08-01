<script setup name="Home" lang="ts">
import passwordIcon from '@/assets/images/icons/password.png'
import usernameIcon from '@/assets/images/icons/username.png'
const username = ref('');
const password = ref('');
const checked = ref(true);
const onSubmit = (values: any) => {
    console.log('submit', values);
};

</script>

<template>
    <div class="normal-page">
        <!-- <NormalHeader title="login" /> -->
        <NormalBackground></NormalBackground>
        <van-form @submit="onSubmit" required style="margin-top: 280px;">
            <van-field v-model="username" name="username" placeholder="请输入手机号"
                :rules="[{ required: true, message: '请输入手机号' }]">
                <template #left-icon>
                    <img :src="usernameIcon" width="24" height="24" alt="">
                </template>
            </van-field>
            <van-field v-model="password" type="password" name="password" placeholder="请输入密码"
                :rules="[{ required: true, message: '请输入密码' }]">
                <template #left-icon>
                    <img :src="passwordIcon" width="24" height="24" alt="">
                </template>
            </van-field>
            <van-button class="submit-button" size="large" block type="primary" native-type="submit"
                style="margin-top: 48px;">
                提交
            </van-button>
        </van-form>
        <div class="re-to-for">
            <div>立即注册</div>
            <div class="center"></div>
            <div>忘记密码</div>
        </div>
        <van-sticky offset-top="84vh" position="top">
            <div class="login-bottom">
                <van-icon name="service" color="#13b756" size="24" style="font-weight: 700;margin-bottom: 24px;" />
                <div class="custom">
                    <van-checkbox v-model="checked" checked-color="#222" icon-size="16">我已阅读并同意
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
    padding: 16px;
}

.login-bottom {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.custom {
    display: flex;
    align-items: center;
    font-size: 12px;

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

    .center {
        height: 12px;
        width: 1px;
        background-color: #222;
        margin: 0 20px;
    }
}
</style>
