// 自定义验证函数
export function validatePhone(value: any) {
  if (!value) {
    return true // ✅ 如果没填，直接通过
  }
  return /^1[3-9]\d{9}$/.test(value) // ✅ 如果填了，就要符合正则
}
