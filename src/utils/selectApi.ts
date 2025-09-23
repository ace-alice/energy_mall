import { setBaseURL } from '@/service'
import { getLocal, setLocal } from './storage'

export const baseNode =
  import.meta.env.MODE == 'fat' ? import.meta.env.VITE_APP_API_DOMAIN : 'https://8.138.239.156:81'
export const backupNode = 'https://56.155.148.101:81'
export const nodes = []

if (!getLocal('apiDomain')) {
  setLocal('apiDomain', baseNode)
}

export function isValidApi() {
  if (getLocal('apiDomain') == baseNode) {
    fetch(getLocal('apiDomain'))
      .then((res) => {
        console.log('可用')
      })
      .catch(() => {
        selectApi()
      })
  } else {
    selectApi()
  }
}

export function selectApi() {
  if (nodes.length) {
    setLocal('apiDomain', backupNode)
    setBaseURL(backupNode)
    const promiseArr = nodes.map((url: string) => {
      return new Promise<string>((resolve, reject) => {
        fetch(url)
          .then((res) => {
            resolve(url)
          })
          .catch(() => {
            reject()
          })
      })
    })

    Promise.any(promiseArr)
      .then((res) => {
        if (res) {
          setLocal('apiDomain', res)
          setBaseURL(res)
        }
      })
      .catch(() => {
        setLocal('apiDomain', backupNode)
        setBaseURL(backupNode)
      })
  } else {
    setLocal('apiDomain', backupNode)
    setBaseURL(backupNode)
  }
}
