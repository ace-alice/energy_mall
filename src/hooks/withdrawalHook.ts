import { doWithdrawApi } from '@/api'
import type { BankItemType } from '@/interface/common'
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'
import { defaultBankItem } from '@/defaultValue'

export type ChannelType = 'usdt' | 'bank'

export default function () {
  const channelType = ref<ChannelType>('usdt')

  const showSelect = ref(false)

  const router = useRouter()

  const checked = ref(-1)

  const normalPinActionRef = ref()

  function selectHandle() {
    if (channelType.value == 'bank' && bankItems.value.length > 0) {
      showSelect.value = true
    }
    if (channelType.value == 'usdt' && usdtItems.value.length > 0) {
      showSelect.value = true
    }
  }

  const amount = ref<undefined | number>(undefined)

  const { bankList, userInfo } = storeToRefs(useCommonStore())

  const { getBankList, getUserInfo, getUserDetail } = useCommonStore()

  onMounted(() => {
    getBankList()
  })

  const currentMethod = ref<BankItemType>(Object.assign({}, defaultBankItem))

  const usdtItems = computed(() => {
    return bankList.value.filter((item) => {
      return item.type == 1
    })
  })

  const bankItems = computed(() => {
    return bankList.value.filter((item) => {
      return item.type == 0
    })
  })

  const alipayItems = computed(() => {
    return bankList.value.filter((item) => {
      return item.type == 2
    })
  })

  function setCurrentMethod(list: BankItemType[], type: ChannelType) {
    const typeCode = type == 'bank' ? 0 : type == 'usdt' ? 1 : 2
    const tempDefault = list.find((item) => item.type == typeCode && item.default == 1)
    const temp = list.find((item) => item.type == typeCode)
    if (tempDefault) {
      currentMethod.value = tempDefault
    } else {
      currentMethod.value = temp || defaultBankItem
    }
  }

  watch(
    () => bankList.value,
    (newVal) => {
      setCurrentMethod(newVal, channelType.value)
    }
  )

  watch(
    () => channelType.value,
    (newVal) => {
      setCurrentMethod(bankList.value, newVal)
    },
    { immediate: true }
  )

  watch(
    () => checked.value,
    (newVal) => {
      const temp = bankList.value.find((item) => item.id == newVal)
      if (temp && currentMethod.value.id != newVal) {
        currentMethod.value = temp
      }
    }
  )

  function submitChecked() {
    if (checked.value != currentMethod.value.id) {
      const temp = bankList.value.find((item) => item.id == checked.value)
      currentMethod.value = temp!
    }
    showSelect.value = false
  }

  function cancelChecked() {
    checked.value = currentMethod.value.id
    showSelect.value = false
  }

  watch(
    () => currentMethod.value,
    (newVal) => {
      if (newVal.id != checked.value) {
        checked.value = newVal.id
      }
    }
  )

  function toOpenPin() {
    nextTick(() => {
      if (normalPinActionRef.value) {
        normalPinActionRef.value.toOpenPin()
      }
    })
  }

  const disabled = computed(() => {
    return !!(
      !amount.value ||
      (+userInfo.value.money || 0) < (amount.value || 0) ||
      !currentMethod.value.id
    )
  })

  function toWithdraw(pin: string) {
    showToast({ type: 'loading', overlay: true })
    doWithdrawApi({ money: amount.value, pin: pin, id: currentMethod.value.id })
      .then((res) => {
        closeToast()
        getUserInfo()
        getUserDetail()
        showToast({ type: 'text', message: '提现申请已成功发送' })
        setTimeout(() => {
          router.push({ name: 'WithdrawOrder' })
        }, 200)
      })
      .catch((e) => {})
  }

  return {
    channelType,
    amount,
    bankList,
    usdtItems,
    bankItems,
    alipayItems,
    currentMethod,
    showSelect,
    selectHandle,
    checked,
    submitChecked,
    cancelChecked,
    toWithdraw,
    disabled,
    normalPinActionRef,
    toOpenPin
  }
}
