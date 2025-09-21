export function loadCssById(url: string, callback: Function) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  const head = document.getElementsByTagName('head')[0]

  link.onload = function () {
    if (typeof callback === 'function') {
      callback(url)
    }
  }

  link.onerror = function () {
    alert('Failed to load css: ' + url)
    console.error('Failed to load css: ' + url)
  }

  head.appendChild(link)
}

export function loadScript(url: string, callback: Function) {
  const script = document.createElement('script')
  script.src = url
  const head = document.getElementsByTagName('head')[0]

  script.onload = function () {
    if (typeof callback === 'function') {
      callback(url)
    }
  }

  script.onerror = function () {
    alert('Failed to load script: ' + url)
    console.error('Failed to load script: ' + url)
  }

  head.appendChild(script)
}
