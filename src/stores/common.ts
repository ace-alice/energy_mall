import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { initLang } from '@/utils/common'
import { AppChannelType } from '@/tools/jsBridge/interface'
import { setLocal, getLocal } from '@/utils/storage'
import type { MediaQueryInfo } from '@/interface/common'
import { defaultMediaQueryInfo } from '@/defaultValue'

export const useCommonStore = defineStore('common', {
  state: () => ({
    lang: ref(initLang()),
    token: ref(''),
    userId: ref(0),
    mediaQueryInfo: reactive(Object.assign({}, defaultMediaQueryInfo)),
    selectedRegionId: undefined as number | undefined,
    selectedCityId: undefined as number | undefined,
    selectedRegionName: undefined as string | undefined,
    selectedCityName: undefined as string | undefined,
  }),

  getters: {
    showLangChar: (state) => {
      const langArr = state.lang.split('')
      langArr[0] = langArr[0].toUpperCase()
      return langArr.join('')
    }
  },

  actions: {
    initMediaQuery() {
      window.WebViewJSBridge.callHandler(AppChannelType.initMediaQuery, {
        data: 'initMediaQuery',
        success: (data: any) => {
          console.log(data)
          try {
            const temp = JSON.parse(data)
            Object.assign(this.mediaQueryInfo, temp)
          } catch (e) { }
        },
        fail: (err: any) => {
          console.log('initMediaQuery:' + err)
        }
      })
    },

    getToken() {
      return new Promise<string>((resolve, reject) => {
        window.WebViewJSBridge.callHandler(AppChannelType.getToken, {
          data: 'getToken',
          success: (data: string) => {
            try {
              this.token = data
              setLocal('token', this.token)
              resolve(data)
            } catch (e) {
              reject(e)
            }
          },
          fail: (err: any) => {
            console.log('getToken:', err)
            reject(err)
          }
        })
      })
    },

    getUserId() {
      window.WebViewJSBridge.callHandler(AppChannelType.getUserId, {
        data: 'getUserId',
        success: (data: number) => {
          try {
            this.userId = data
            setLocal('userId', this.userId)
          } catch (e) {
          }
        },
        fail: function (err: any) {
          console.log('userId:', err)
        }
      })
    },

    getLocation() {
      return new Promise<{ province: string; city: string }>((resolve, reject) => {
        window.WebViewJSBridge.callHandler(AppChannelType.getLocation, {
          data: 'getLocation',
          success: (data: any) => {
            console.log('data', data)
            try {
              resolve(data)
            } catch (e) {
              reject(e)
            }
          },
          fail: (err: any) => {
            console.log('getLocation:', err)
            reject(err)
          }
        })
      })
    },

    updateLocation(params: {
      regionId?: number;
      cityId?: number;
      regionName?: string;
      cityName?: string;
    }) {
      this.selectedRegionId = params.regionId
      this.selectedCityId = params.cityId
      this.selectedRegionName = params.regionName
      this.selectedCityName = params.cityName
    },

    async getLocationParams() {
      if (this.selectedRegionId || this.selectedCityId) {
        return {
          regionId: this.selectedRegionId,
          cityId: this.selectedCityId
        }
      }

      try {
        var locationData = undefined;
        if (import.meta.env.MODE !== 'dev') {
          locationData = await this.getLocation()
        }
        if (locationData) {
          return {}
        } else {
          const userInfo = getLocal('registerInfo')
          if (userInfo?.provinceId || userInfo?.cityId) {
            return {
              provinceId: userInfo.provinceId,
              cityId: userInfo.cityId
            }
          }
        }
      } catch (error) {
        console.error('Failed to get location params:', error)
      }

      return {}
    },

    resetLocationSelection() {
      this.selectedRegionId = undefined
      this.selectedCityId = undefined
      this.selectedRegionName = undefined
      this.selectedCityName = undefined
    }
  },
  persist: true
})
