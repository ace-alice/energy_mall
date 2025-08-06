import { defineStore } from 'pinia'
import { ref, reactive, computed, watch } from 'vue'
import { initLang } from '@/utils/common'
import { AppChannelType } from '@/tools/jsBridge/interface'
import type { MediaQueryInfo, UserInfo } from '@/interface/common'
import { defaultMediaQueryInfo, defaultUserInfo } from '@/defaultValue'
import { getLocal, removeLocal, setLocal } from '@/utils/storage'
import { userInfoApi } from '@/api'
import { useRouter } from 'vue-router'
import { Base64 } from 'js-base64'
import dayjs from 'dayjs'

export const useCommonStore = defineStore(
  'common',
  () => {
    const isVip = ref(false)
    const vipExpiredDate = ref<number>(0)
    const lang = ref(initLang())
    const token = ref(getLocal('token'))
    const mediaQueryInfo = reactive(Object.assign({}, defaultMediaQueryInfo))

    const serviceUrl = ref('')

    const router = useRouter()

    const userInfo = reactive<UserInfo>(Object.assign({}, defaultUserInfo))

    const showLangChar = computed(() => {
      const langArr = lang.value.split('')
      langArr[0] = langArr[0].toUpperCase()
      return langArr.join('')
    })

    function setToken(t: string) {
      token.value = t
      setLocal('token', token.value)
    }

    function loginOut() {
      setToken('')
      isVip.value = false
      Object.assign(userInfo, defaultUserInfo)
    }

    watch(
      () => token.value,
      (newVal) => {
        if (newVal) {
          getUserInfo()
        } else {
          router.push({ name: 'Login' })
        }
      },
      { immediate: true }
    )

    function initMediaQuery() {
      window.WebViewJSBridge.callHandler(AppChannelType.initMediaQuery, {
        data: 'initMediaQuery',
        success: (data: any) => {
          console.log(data)
          try {
            const temp = JSON.parse(data)
            Object.assign(mediaQueryInfo, temp)
          } catch (e) {}
        },
        fail: (err: any) => {
          console.log('initMediaQuery:' + err)
        }
      })
    }

    function getUserInfo() {
      userInfoApi().then((res) => {
        Object.assign(userInfo, res.data.data)
      })
    }

    return {
      token,
      showLangChar,
      setToken,
      initMediaQuery,
      loginOut,
      mediaQueryInfo,
      userInfo,
      isVip,
      vipExpiredDate,
      serviceUrl
    }
  },
  {
    // 配置持久化
    persist: {
      key: 'common', // 在 localStorage 中保存的 key
      storage: localStorage, // 使用 localStorage 进行存储
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
      afterHydrate: (context) => {
        console.log('vipExpiredDate', context.store.$state.vipExpiredDate)
        if (
          !context.store.$state.vipExpiredDate ||
          !context.store.$state.isVip ||
          !(context.store.$state.vipExpiredDate > dayjs().unix())
        ) {
          context.store.$state.isVip = false
        } else {
          context.store.$state.vipExpiredDate = 0
        }
      },
      debug: true
    }
  }
)
