import type { RegisterForm } from '@/api'
import { registerApi } from '@/api'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/common'
import { showLoadingToast } from 'vant'

export default function () {
  const checked = ref(false)

  const formData = reactive<RegisterForm>({
    phone: '',
    invite: '',
    password: '',
    withdraw: '',
    username: '',
    password1: '',
    withdraw1: ''
  })

  const { setToken } = useCommonStore()

  const onSubmit = (values: any) => {
    showLoadingToast({ type: 'loading', overlay: true })
    registerApi(formData)
      .then((res) => {
        if (res.data.code == 0) {
          setToken(res.data.data.token)
          router.push({ name: 'Home' })
        }
      })
      .finally(() => {
        closeToast()
      })
  }

  const openEye = ref(false)

  const openEye2 = ref(false)

  const openEye3 = ref(false)

  const openEye4 = ref(false)

  const router = useRouter()

  return { formData, checked, onSubmit, openEye, openEye2, openEye3, openEye4, router }
}
