import { getRechargeMethodApi, rechargeApi } from '@/api'
import type {} from '@/interface/common'
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { showToast, showLoadingToast } from 'vant'
import { isNative } from '@/utils/common'
import { AppChannelType } from '@/tools/jsBridge/interface'
import { useRouter } from 'vue-router'

export type ChannelType = 'usdt' | 'bank'

export default function () {
  const channelType = ref<ChannelType>('usdt')

  const amount = ref<undefined | number>(undefined)

  return { channelType, amount }
}
