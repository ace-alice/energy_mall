import { getLocal } from './storage'

export function getSystemLang() {
  // 获取首选语言
  const language = navigator.language.slice(0, 2)
  if (language && ['zh', 'ja', 'en'].includes(language)) {
    return language
  } else {
    return 'zh'
  }
}

export function initLang(): string {
  const lang = getLocal('lang') || getSystemLang()
  return lang.slice(0, 2)
}
// 动态加载 /src/assets/images/ 目录下的图片
export const getImageUrl = (imageName: string, type = '.png') => {
  return new URL(`/src/assets/images/pay_type/${imageName}${type}`, import.meta.url).href
}

export const htmlDecodeByRegExp = (str: string) => {
  var temp = ''
  if (str.length == 0) return ''
  temp = str.replace(/&amp;/g, '&')
  temp = temp.replace(/&lt;/g, '<')
  temp = temp.replace(/&gt;/g, '>')
  temp = temp.replace(/&nbsp;/g, ' ')
  temp = temp.replace(/&#39;/g, "'")
  temp = temp.replace(/&quot;/g, '"')
  temp = temp.replace(/↵/g, '')
  return temp
}

export const isNative = () => {
  if (window.navigator.userAgent.match(/android_client/)) return true
  if (window.navigator.userAgent.match(/ios_client/)) return true
  if (window.navigator.userAgent.match(/flutter_client/)) return true
  return false
}

const drawType = ['积分', '新人', '积分', '会员']

const drawTheme = ['primary', 'warning', 'primary', 'success']

export function getDrawType(type: number) {
  return drawType[type] || '会员'
}

export function getDrawTheme(type: number): any {
  return drawTheme[type] || '会员'
}

export const profitTypeEnums = [
  {
    label: '每期返息到期返本',
    value: 0
  },
  {
    label: '一次性到期返本息',
    value: 1
  },
  {
    label: '每期返息不返本',
    value: 2
  },
  {
    label: '每期返息到期双倍本金',
    value: 3
  },
  {
    label: '每期返息并且返回本金',
    value: 4
  },
  {
    label: '每期复利返息到期返本',
    value: 5
  }
]

export function getProfitType(type: number): any {
  return profitTypeEnums.find((item) => item.value == type)
}
