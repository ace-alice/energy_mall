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

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: getLocal('apiDomain') || 'https://56.155.148.101:81',
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000
})

// 在运行时切换 baseURL
export function setBaseURL(newURL: string) {
  service.defaults.baseURL = newURL
}

// 添加请求拦截器
service.interceptors.request.use(
  async (config: any) => {
    if (config.method === 'get') {
      Object.assign(config.headers, {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    if (config.data instanceof FormData) {
      Object.assign(config.headers, {
        'Content-Type': 'multipart/form-data'
      })
    }
    if (config.headers) {
      config.headers['Accept-Token'] =
        getLocal('token') == null || getLocal('token') == '' ? '' : getLocal('token')
      config.headers['Accept-Lang'] = getLocal('lang') || 'zh-cn'
    }

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
      ;(showToast as any)({
        message: i18n.global.t('network_connection_failed'),
        duration: 3000
      })
      return Promise.reject('error')
    } else if (parseInt(response.data.code) != 0) {
      if (parseInt(response.data.code) == 444) {
        const { loginOut } = useCommonStore()
        showToast({
          type: 'fail',
          message: '登录失效,请重新登录',
          className: '',
          duration: 3000
        })
        loginOut()
        router.push({ name: 'Login' })
      } else {
        setTimeout(() => {
          showToast({
            type: 'fail',
            message: response.data.msg,
            className: '',
            duration: 3000
          })
        }, 300)
      }

      return Promise.reject('error')
    } else {
      return response
    }
  },
  (error) => {
    // 对响应错误做点什么
    ;(showToast as any)({
      message: error || i18n.global.t('network_connection_failed'),
      duration: 3000
    })
    return Promise.reject(error)
  }
)

export default service
