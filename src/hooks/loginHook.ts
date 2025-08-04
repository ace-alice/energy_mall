import { loginApi } from '@/api'
import { useCommonStore } from '@/stores/common'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showLoadingToast } from 'vant'

export default function () {
  const { setToken } = useCommonStore()

  const formData = reactive({
    phone: '',
    password: ''
  })

  const openEye = ref(false)

  const checked = ref(false)

  const onSubmit = (values: any) => {
    showLoadingToast({ type: 'loading', overlay: true })
    loginApi(formData)
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

  const router = useRouter()

  return { formData, openEye, checked, onSubmit, router }
}
