/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
// noinspection JSIgnoredPromiseFromCall
import axios from 'axios'
import router from '@/router'
import { i18n } from '@/locale'
import { getLocal } from '@/utils/storage'
import { showToast } from 'vant'
import 'vant/lib/toast/style'

import { useCommonStore } from '@/stores/common'
const commonStore = useCommonStore()
const baseURL = window.location.origin + '/api'

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000
})

// 添加请求拦截器
service.interceptors.request.use(
  async (config: any) => {
    if (!getLocal("token")) {
      await commonStore.getToken()
    }
    if (config.method === 'get') {
      Object.assign(config.headers, {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      })
    } else {
      Object.assign(config.headers, {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      })
    }
    if (config.headers) {
      config.headers.Authorization = getLocal('token') == null || getLocal('token') == "" ? "" : getLocal('token')
    }
    if (config.data) {
      config.data.lang = getLocal('lang')
    } else {
      config.data = {
        lang: getLocal('lang')
      }
    }

    // config.data = qs.stringify(config.data)
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response: any): any => {
    const code = response.status
    if (code < 200 || code > 300) {
      (showToast as any)({
        message: i18n.global.t('network_connection_failed'),
        duration: 3000
      })
      if (router.currentRoute.value.name !== 'NotNet') {
        router.push({ name: 'NotNet' })
      }
      return Promise.reject('error')
    } else if (
      parseInt(response.data.code) === 0 &&
      (parseInt(response.data.error_code) === 18 ||
        parseInt(response.data.error_code) === 17 ||
        parseInt(response.data.error_code) === 15)
    ) {
      showToast({
        message: response.data.message,
        duration: 3000
      })

      // noinspection JSIgnoredPromiseFromCall
      router.push({
        name: 'NotPage',
        query: {
          message: response.data.message
        }
      })
      return Promise.reject('error')
    } else {
      return response
    }
  },
  (error) => {


    // 对响应错误做点什么
    (showToast as any)({
      message: error.response.data.msg || i18n.global.t('network_connection_failed'),
      duration: 3000
    })
    if (router.currentRoute.value.name !== 'NotNet') {
      router.push({ name: 'NotNet' })
    }
    return Promise.reject(error)
  }
)

export default service
