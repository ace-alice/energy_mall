import service from '@/service'

interface LoginForm {
  phone: string
  password: string
}

export interface RegisterForm {
  phone: string
  invite: string
  password: string
  withdraw: string
  username: string
  [key: string]: any
}

export interface ResetLoginForm {
  phone: string
  code: string
  password: string
  [key: string]: any
}

/**
 * 登录接口
 * @param data 查询参数
 * @returns Promise
 */
export function loginApi(data: LoginForm) {
  return service({
    url: '/login/login',
    method: 'post',
    data
  })
}

/**
 * 注册接口
 * @param data 查询参数
 * @returns Promise
 */
export function registerApi(data: RegisterForm) {
  return service({
    url: '/login/register',
    method: 'post',
    data
  })
}

/**
 * 获取userinfo
 * @param data 查询参数
 * @returns Promise
 */
export function userInfoApi() {
  return service({
    url: '/user/info',
    method: 'get'
  })
}

/**
 * 忘记密码获取验证码
 * @param data 查询参数
 * @returns Promise
 */
export function getVerifyCode(data: { phone: string }) {
  return service({
    url: '/sms/reset',
    method: 'POST',
    data
  })
}

/**
 * 重置登录密码
 * @param data 查询参数
 * @returns Promise
 */
export function resetLoginPassword(data: ResetLoginForm) {
  return service({
    url: '/login/reset',
    method: 'POST',
    data
  })
}

/**
 * 获取设置信息
 * @param data 查询参数
 * @returns Promise
 */
export function settingApi(params: { key: string }) {
  return service({
    url: '/api/setting',
    method: 'GET',
    params
  })
}

/**
 * 获取banners
 * @param data 查询参数
 * @returns Promise
 */
export function bannerApi() {
  return service({
    url: '/api/banner/',
    method: 'GET'
  })
}
