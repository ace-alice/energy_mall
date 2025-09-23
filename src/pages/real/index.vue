<template>
  <div class="normal-page">
    <NormalHeader title="实名认证"> </NormalHeader>

    <div style="padding: 16px">
      <van-form @submit="onSubmit" required class="login-form self-form">
        <van-field
          v-model="formData.name"
          name="name"
          type="text"
          :disabled="!!alreadyReal"
          placeholder="请输入真实姓名"
          :rules="[{ required: true, message: '请输入真实姓名' }]"
        >
          <template #left-icon>
            <img :src="usernameIcon" width="24" height="24" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="formData.idcard"
          type="text"
          name="idcard"
          :disabled="!!alreadyReal"
          placeholder="请输入身份证号"
          :rules="[
            { required: true, message: '请输入身份证号' },
            { pattern: /(^\d{15}$)|(^\d{17}[\dXx]$)/, message: '请输入正确身份证号' }
          ]"
        >
          <template #left-icon>
            <img :src="usernameIcon" width="24" height="24" alt="" />
          </template>
        </van-field>
        <van-button
          class="submit-button"
          size="large"
          block
          type="primary"
          native-type="submit"
          :disabled="!!alreadyReal"
          style="margin-top: 48px"
        >
          提交
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="Real">
import { useCommonStore } from '@/stores/common'
import usernameIcon from '@/assets/images/icons/username.png'
import { showLoadingToast, closeToast } from 'vant'
import { realNameAuthApi } from '@/api'
const { userInfo } = storeToRefs(useCommonStore())
const { getUserInfo } = useCommonStore()
const router = useRouter()

const alreadyReal = computed(() => userInfo.value.sfz_name && userInfo.value.sfz_number)

const formData = reactive({
  name: '',
  idcard: ''
})

const onSubmit = (values: any) => {
  showLoadingToast({ type: 'loading', overlay: true })
  realNameAuthApi(formData).then((res) => {
    if (res.data.code == 0) {
      getUserInfo()
      showToast({ type: 'success', message: '实名认证已提交' })
      router.push({ name: 'Setting' })
    }
  })
}

watch(
  () => userInfo.value,
  (newVal) => {
    if (newVal.sfz_name) {
      formData.name = newVal.sfz_name
    }
    if (newVal.sfz_number) {
      formData.idcard = newVal.sfz_number
    }
  },
  {
    immediate: true
  }
)

watch(
  () => alreadyReal.value,
  (newVal) => {
    showToast({ type: 'success', message: '您已经完成实名认证' })
  },
  {
    immediate: true
  }
)
</script>
