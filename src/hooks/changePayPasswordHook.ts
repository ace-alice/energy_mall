import { resetLoginPassword, getVerifyCode, resetPayPasswordApi } from '@/api'
import { useCommonStore } from '@/stores/common'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showLoadingToast, showToast } from 'vant'
import { storeToRefs } from 'pinia'

export default function () {
  const { userInfo } = storeToRefs(useCommonStore())

  const router = useRouter()

  const formData = reactive({
    password: '',
    confirmPassword: '',
    smscode: ''
  })

  const openEye1 = ref(false)

  const openEye2 = ref(false)

  const onSubmit = (values: any) => {
    showLoadingToast({ type: 'loading', overlay: true })
    resetPayPasswordApi(formData)
      .then((res) => {
        if (res.data.code == 0) {
          router.push({ name: 'Setting' })
        }
      })
      .finally(() => {
        closeToast()
      })
  }

  const timer = ref<null | NodeJS.Timeout>(null)
  const counter = ref(0)

  function getCode() {
    if (counter.value) {
      return
    }
    if (userInfo.value.phone) {
      showLoadingToast({ type: 'loading', overlay: true })
      getVerifyCode({ phone: userInfo.value.phone })
        .then(() => {
          setTimeout(() => {
            showToast({ type: 'success', message: '验证码已发送！' })
          }, 100)
          if (timer.value) {
            clearInterval(timer.value)
          }
          counter.value = 60
          timer.value = setInterval(() => {
            counter.value--
          }, 1000)
        })
        .finally(() => {
          closeToast()
        })
    } else {
      showToast({ type: 'fail', message: '请输入正确手机号' })
    }
  }

  return { formData, openEye1, openEye2, onSubmit, router, getCode, counter, userInfo }
}
