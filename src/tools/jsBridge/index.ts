import './jsBridge'

var isAndroid =
  navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
/**
 * @description 初始化JSBridge
 * @param callback 初始化完成调用方法
 * @returns
 */
function setupWebViewJSBridge(callback: Function) {
  // Android使用
  if (isAndroid) {
    if (window.WebViewJSBridge) {
      callback(window.WebViewJSBridge)
    } else {
      document.addEventListener(
        'WebViewJSBridgeReady',
        function () {
          callback(window.WebViewJSBridge)
        },
        false
      )
    }
  }

  // iOS使用
  if (isiOS) {
    if (window.WebViewJSBridge) {
      return callback(window.WebViewJSBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
}

function callback(WebViewJSBridge: Window['WebViewJSBridge']) {
  console.log(WebViewJSBridge)
}

// function QRCodeCallback(WebViewJSBridge: Window["WebViewJSBridge"]) {
//   console.log(WebViewJSBridge)
// }

setupWebViewJSBridge(callback)
// setupWebViewJSBridge(QRCodeCallback)

window.WebViewJSBridge.init({ debug: true, channel: ['flutter'], isFlutterInAppWebView: true })
