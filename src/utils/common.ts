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
