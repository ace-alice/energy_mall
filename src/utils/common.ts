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
    label: '每***付息,到期返本',
    value: 0
  },
  {
    label: '到期返还本金及利息',
    value: 1
  },
  {
    label: '每期返息不返本',
    value: 2
  },
  {
    label: '每***返息,到期双倍本金',
    value: 3
  },
  {
    label: '每***付息,并且返回本金',
    value: 4
  },
  {
    label: '每***复利,到期返本返息',
    value: 5
  }
]

export function getProfitType(type: number, seconds: number): any {
  const temp1 = profitTypeEnums.find((item) => item.value == type)
  const tem2 = getCycleTime(seconds)
  return (temp1?.label || '').replace('***', `${tem2.value == 1 ? '' : tem2.value}${tem2.label}`)
}

export const cycleTimeEnums = [
  {
    label: '小时',
    value: 3600
  },
  {
    label: '一天',
    value: 86400
  },
  {
    label: '十天',
    value: 864000
  },
  {
    label: '一周',
    value: 604800
  },
  {
    label: '一月',
    value: 2592000
  },
  {
    label: '一年',
    value: 31536000
  }
]

export function getCycleTime(seconds: number): { label: string; value: number } {
  const units = [
    { label: '小时', value: 3600 },
    { label: '天', value: 86400 },
    { label: '周', value: 604800 },
    { label: '月', value: 2592000 }, // 按 30 天算
    { label: '年', value: 31536000 } // 按 365 天算
  ]

  for (let i = units.length - 1; i >= 0; i--) {
    if (seconds >= units[i].value) {
      let temp = (seconds / units[i].value).toFixed(0)

      return {
        label: units[i].label,
        value: Number(temp)
      }
    }
  }
  return {
    label: '秒',
    value: seconds
  }
}
