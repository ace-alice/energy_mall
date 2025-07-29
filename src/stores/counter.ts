import { ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { Base64 } from 'js-base64'
import { getQueryString } from '@/utils/parseTools'
import { useI18n } from 'vue-i18n'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const { t } = useI18n()
    const token = ref('')

    const tokenUsed = ref(false)

    const billNo = ref('')

    const tokenExpiredDate = ref<string>('')
    function isExpired() {
      return dayjs(tokenExpiredDate.value).isBefore(dayjs())
    }

    return {
      token,
      tokenExpiredDate,
      isExpired,
      tokenUsed,
      billNo
    }
  },
  {
    // 配置持久化
    persist: {
      key: 'counter', // 在 localStorage 中保存的 key
      storage: localStorage, // 使用 localStorage 进行存储
      pick: ['token', 'tokenExpiredDate', 'tokenUsed', 'billNo'],
      serializer: {
        // 自定义序列化
        serialize: (state: any) => {
          return Base64.encode(JSON.stringify(state))
        },
        // 自定义反序列化
        deserialize: (storedValue: any) => {
          return JSON.parse(Base64.decode(storedValue))
        }
      },
      afterHydrate: (ctx) => {
        const token = getQueryString('token')
        if (token && ctx.store.$state.token !== token) {
          ctx.store.$state.token = token
          ctx.store.$state.tokenExpiredDate = dayjs().add(30, 'minute').format()
          ctx.store.$state.tokenUsed = false
          ctx.store.$state.billNo = ''
        }
      },
      debug: true
    }
  }
)
