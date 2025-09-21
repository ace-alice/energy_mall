
/**
 * 由 flying services 提供技术支持
 * Powered by Hector
 */
  
if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/sw.js', { scope: '/' })})}