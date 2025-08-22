import { getRechargeMethodApi, rechargeApi } from '@/api'
import type { MethodLisFilterType, RechargeMethodType } from '@/interface/common'
import { ref, computed, onMounted, reactive, watch } from 'vue'
import uploadHook from './uploadHook'
import { showToast, showLoadingToast } from 'vant'
import { isNative } from '@/utils/common'
import { AppChannelType } from '@/tools/jsBridge/interface'
import { useRouter } from 'vue-router'

export default function () {
  const methodList = ref<RechargeMethodType[]>([])

  const currentClass = reactive({} as MethodLisFilterType)

  const active = ref(0)

  const amount = ref<number | null>(null)

  const currentMethod = ref({} as RechargeMethodType)

  const rechargeName = ref('')

  const certificateImg = ref('')

  const router = useRouter()

  function callBack(url: string) {
    certificateImg.value = url
  }

  const { fileList, afterRead } = uploadHook({ callBack })

  function getRechargeMethod() {
    getRechargeMethodApi().then((res) => {
      methodList.value = res.data.data
    })
  }

  const methodLisFilter = computed<MethodLisFilterType[]>(() => {
    const temp: MethodLisFilterType[] = []
    const sorTemp = methodList.value.sort((a, b) => a.class_id - b.class_id)
    sorTemp.forEach((item, index) => {
      if (index == 0) {
        temp.unshift({
          class_id: item.class_id,
          class_name: item.class_name,
          children: [item]
        })
      } else {
        if (temp[0] && temp[0].class_id == item.class_id) {
          temp[0].children.push(item)
        } else {
          temp.unshift({
            class_id: item.class_id,
            class_name: item.class_name,
            children: [item]
          })
        }
      }
    })
    return temp
  })

  function currentClassChange(name: number) {
    console.log(name)
    Object.assign(currentClass, methodLisFilter.value[name])
  }

  function changeMethod(item: RechargeMethodType) {
    currentMethod.value = item
  }

  onMounted(() => {
    getRechargeMethod()
  })

  watch(
    () => currentClass.class_id,
    () => {
      currentMethod.value = currentClass.children[0]
    }
  )

  watch(
    () => methodLisFilter.value,
    (newVal) => {
      Object.assign(currentClass, newVal[0])
    }
  )

  const rechargeAccount = computed(() => {
    if (currentMethod.value.style == 2 || currentMethod.value.style == 3) {
      if (
        currentMethod.value.account_info.type == 0 ||
        currentMethod.value.account_info.type == 4
      ) {
        return currentMethod.value.account_info.bank_account
      } else if (currentMethod.value.account_info.type == 1) {
        return currentMethod.value.account_info.coin_account
      } else {
        return currentMethod.value.account_info.alipay_account
      }
    } else {
      return ''
    }
  })

  const disabled = computed(() => {
    console.log(certificateImg.value, rechargeName.value)
    return !!(
      !currentMethod.value ||
      !amount.value ||
      ((currentMethod.value.style == 2 || currentMethod.value.style == 3) &&
        (!certificateImg.value || !rechargeName.value))
    )
  })

  function submit() {
    showLoadingToast({ overlay: true })
    rechargeApi({
      money: amount.value,
      name: rechargeName.value,
      id: currentMethod.value.id,
      account: rechargeAccount.value,
      img: certificateImg.value
    }).then((res) => {
      showToast({ type: 'success', message: '请尽快完成支付', overlay: true })
      setTimeout(() => {
        router.push({ name: 'Home' })
        if (currentMethod.value.style != 2 && res.data.url) {
          if (isNative()) {
            window.WebViewJSBridge.callHandler(AppChannelType.openWindow, {
              data: res.data.url
            })
          } else {
            window.open(res.data.url, '_black')
          }
        }
      }, 500)
    })
  }

  return {
    methodLisFilter,
    currentClass,
    currentMethod,
    currentClassChange,
    active,
    changeMethod,
    amount,
    rechargeName,
    certificateImg,
    fileList,
    afterRead,
    disabled,
    submit
  }
}
