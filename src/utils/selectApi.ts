import { getLocal, setLocal } from './storage'

export function isValidApi() {
  if (getLocal('apiDomain') != window.config.base_node) {
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
  const promiseArr = window.config.nodes.map((url: string) => {
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

  Promise.any(promiseArr).then((res) => {
    if (res) {
      setLocal('apiDomain', res)
    }
  })
}
