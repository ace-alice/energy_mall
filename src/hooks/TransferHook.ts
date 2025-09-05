import { useRouter } from 'vue-router'
import { ref, reactive, nextTick } from 'vue'
import { showToast } from 'vant'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'
import { doTransferApi } from '@/api'

export default function () {
  const router = useRouter()

  const { userInfo } = storeToRefs(useCommonStore())
  const { getUserInfo, getUserDetail } = useCommonStore()

  function onSubmit() {
    formData.money = Math.abs(formData.money || 0)
    if ((+userInfo.value.outside_money || 0) < +(formData.money || 0)) {
      showToast({ type: 'fail', message: '您的余额不足' })
      return
    }
    nextTick(() => {
      if (normalPinActionRef.value) {
        normalPinActionRef.value.toOpenPin()
      }
    })
  }

  const formData = reactive<{ money: undefined | number; phone: number }>({
    money: undefined,
    phone: 1
  })

  const normalPinActionRef = ref()

  function toTransfer(pin: string) {
    showToast({ type: 'loading', overlay: true })
    doTransferApi({ ...formData, pin: pin })
      .then((res) => {
        closeToast()
        getUserInfo()
        getUserDetail()
        showToast({ type: 'text', message: '转账申请已成功发送' })
        setTimeout(() => {
          router.push({ name: 'HomeNormal' })
        }, 200)
      })
      .catch((e) => {})
  }

  return { router, onSubmit, formData, normalPinActionRef, toTransfer }
}
