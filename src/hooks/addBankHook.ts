import { useCommonStore } from '@/stores/common'
import { reactive, ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { showDialog, showLoadingToast, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { allBanks } from '@/utils/bankList'
import { addBankApi } from '@/api'

export default function ({ type, style }: { type: number; style: string }) {
  const { userInfo } = storeToRefs(useCommonStore())
  const { getBankList } = useCommonStore()
  const router = useRouter()

  function onSubmit() {
    showLoadingToast({ overlay: true })
    addBankApi({
      ...formData,
      phone: userInfo.value.phone
    }).then((res) => {
      showToast({ type: 'success', message: '添加成功', overlay: true })
      getBankList()
      setTimeout(() => {
        if (window.history.state?.back) {
          router.back()
        } else {
          router.push({ name: 'BankList' })
        }
      }, 500)
    })
  }

  const formData = reactive({
    type: type,
    style: style,
    bank_name: '',
    bank_account: '',
    bank_branch: '',
    alipay_account: '',
    coin_name: '',
    coin_blockchain: '',
    coin_account: '',
    default: 0
  })

  const showPicker = ref(false)

  const showPicker1 = ref(false)

  const searchText = ref('')

  const coinBlockchainColumns = [
    { text: 'TRC20（波场）', value: 'TRC20' },
    { text: 'ERC20（以太坊）', value: 'ERC20' },
    { text: 'BEP20（币安智能链）', value: 'BEP20' }
  ]

  function blockchainConfirm({ selectedValues }: { selectedValues: string[] }) {
    formData.coin_blockchain = selectedValues[0]
    showPicker.value = false
  }

  function bankNameConfirm({ selectedValues }: { selectedValues: string[] }) {
    formData.bank_name = selectedValues[0]
    showPicker.value = false
  }

  const allBankFilter = computed(() => {
    return allBanks.filter((item) => item.text.includes(searchText.value))
  })

  watch(
    () => userInfo.value,
    () => {
      if (userInfo.value.phone && !userInfo.value.sfz_name) {
        showDialog({
          title: '实名认证',
          message: '请您先完成实名认证',
          width: 300
        }).then(() => {
          router.push({ name: 'Real' })
        })
      }
    },
    {
      immediate: true
    }
  )

  return {
    onSubmit,
    formData,
    coinBlockchainColumns,
    blockchainConfirm,
    showPicker,
    bankNameConfirm,
    showPicker1,
    searchText,
    allBankFilter,
    userInfo
  }
}
