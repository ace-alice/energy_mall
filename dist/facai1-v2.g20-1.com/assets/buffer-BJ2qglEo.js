
/**
 * 由 flying services 提供技术支持
 * Powered by Hector
 */
  
var t,e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function o(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function r(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var e=t.default;if("function"==typeof e){var n=function t(){return this instanceof t?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach((function(e){var o=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(n,e,o.get?o:{enumerable:!0,get:function(){return t[e]}})})),n}function f(){if(e)return t;function n(){this.buffer=[],this.length=0}return e=1,n.prototype={get:function(t){const e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(let n=0;n<e;n++)this.putBit(1==(t>>>e-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t=n}export{r as a,n as c,o as g,f as r};
