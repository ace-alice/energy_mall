import { defineStore } from 'pinia'
import { ref, reactive, computed, watch } from 'vue'
import { initLang } from '@/utils/common'
import { AppChannelType } from '@/tools/jsBridge/interface'
import type {
  AddressItemType,
  BankItemType,
  GroupClassType,
  InvestClassItemType,
  MediaQueryInfo,
  UserDetail,
  UserInfo
} from '@/interface/common'
import { defaultMediaQueryInfo, defaultUserDetail, defaultUserInfo } from '@/defaultValue'
import { getLocal, setLocal } from '@/utils/storage'
import {
  getAddressListApi,
  getBankListApi,
  getInvestClassesApi,
  getUseAbleCouponsApi,
  getUserDetailApi,
  groupClassesApi,
  settingApi,
  userInfoApi
} from '@/api'
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
    const mediaQueryInfo = reactive<MediaQueryInfo>(Object.assign({}, defaultMediaQueryInfo))

    const serviceUrl = ref('')

    const comVideoUrl = ref('')

    const router = useRouter()

    const userInfo = reactive<UserInfo>(Object.assign({}, defaultUserInfo))

    const groupClasses = ref<GroupClassType[]>([])

    const pointsClasses = ref<GroupClassType[]>([])

    const investClasses = ref<InvestClassItemType[]>([])

    const addressList = ref<AddressItemType[]>([])

    const userDetail = reactive<UserDetail>(Object.assign({}, defaultUserDetail))

    const bankList = ref<BankItemType[]>([])

    const couponList = ref<any[]>([])

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

    function getCouponList() {
      getUseAbleCouponsApi().then((res) => {
        couponList.value = res.data.data
      })
    }

    function getUserInfo() {
      userInfoApi().then((res) => {
        Object.assign(userInfo, res.data.data)
      })
    }

    function geServiceUrl() {
      settingApi({ key: 'kefu' }).then((res) => {
        serviceUrl.value = res.data.data.val || ''
      })
    }

    function getComVideoUrl() {
      settingApi({ key: 'home_video_link' }).then((res) => {
        comVideoUrl.value = res.data.data.val || ''
      })
    }

    function getGroupClasses() {
      groupClassesApi({ type: 1 }).then((res) => {
        groupClasses.value = res.data.data || []
      })
    }

    function getPointsClasses() {
      groupClassesApi({ type: 2 }).then((res) => {
        pointsClasses.value = res.data.data || []
      })
    }

    async function getAddressList() {
      await getAddressListApi().then((res) => {
        addressList.value = res.data.data
      })
    }

    function getUserDetail() {
      getUserDetailApi().then((res) => {
        Object.assign(userDetail, res.data.data)
      })
    }

    function getBankList() {
      getBankListApi().then((res) => {
        bankList.value = res.data.data
      })
    }

    function getInvestClasses() {
      getInvestClassesApi().then((res) => {
        investClasses.value = res.data.data
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
      serviceUrl,
      getComVideoUrl,
      comVideoUrl,
      geServiceUrl,
      groupClasses,
      getGroupClasses,
      getAddressList,
      addressList,
      getUserInfo,
      getUserDetail,
      userDetail,
      bankList,
      getBankList,
      getInvestClasses,
      investClasses,
      getPointsClasses,
      pointsClasses,
      getCouponList,
      couponList
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
