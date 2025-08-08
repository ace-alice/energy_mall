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

/**
 * 获取文章列表
 * @param data 查询参数
 * @returns Promise
 */
export function getArticles(data: { class_id: number; page: number }) {
  return service({
    url: '/article/lists',
    method: 'POST',
    data
  })
}

/**
 * 获取产品分类
 * @param data 查询参数
 * @returns Promise
 */
export function groupClassesApi() {
  return service({
    url: '/groupBy/classes',
    method: 'GET'
  })
}

/**
 * 获取产品列表
 * @param data 查询参数
 * @returns Promise
 */
export function projectListApi(data: any) {
  return service({
    url: '/groupBy/lists',
    method: 'POST',
    data
  })
}

/**
 * 获取产品详情
 * @param data 查询参数
 * @returns Promise
 */
export function getProjectDetailApi(data: any) {
  return service({
    url: '/groupBy/info',
    method: 'POST',
    params: data
  })
}
