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
 * 重置支付密码
 * @param data 查询参数
 * @returns Promise
 */
export function resetPayPasswordApi(data: any) {
  return service({
    url: '/user/editPin',
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
export function groupClassesApi(data: any) {
  return service({
    url: '/goods/classes',
    method: 'POST',
    data
  })
}

/**
 * 获取产品列表
 * @param data 查询参数
 * @returns Promise
 */
export function projectListApi(data: any) {
  return service({
    url: '/goods/lists',
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
    url: '/goods/info',
    method: 'POST',
    params: data
  })
}

/**
 * 获取收货地址
 * @param data 查询参数
 * @returns Promise
 */
export function getAddressListApi() {
  return service({
    url: '/address/lists',
    method: 'POST'
  })
}

/**
 * 添加收货地址
 * @param data 查询参数
 * @returns Promise
 */
export function addAddressApi(data: any) {
  return service({
    url: '/address/add',
    method: 'POST',
    data
  })
}

/**
 * 编辑收货地址
 * @param data 查询参数
 * @returns Promise
 */
export function editAddressApi(data: any) {
  return service({
    url: '/address/edit',
    method: 'POST',
    data
  })
}

/**
 * 删除收货地址
 * @param data 查询参数
 * @returns Promise
 */
export function delAddressApi(data: any) {
  return service({
    url: '/address/delete',
    method: 'POST',
    data
  })
}

/**
 * 获取已经签到的列表
 * @param data 查询参数
 * @returns Promise
 */
export function getSigninListApi() {
  return service({
    url: '/signIn/record',
    method: 'GET'
  })
}

/**
 * 签到
 * @param data 查询参数
 * @returns Promise
 */
export function signinApi() {
  return service({
    url: `/signIn/sign`,
    method: 'GET'
  })
}

/**
 * 实名认证
 * @param data 查询参数
 * @returns Promise
 */
export function realNameAuthApi(data: any) {
  return service({
    url: `/user/realName`,
    method: 'POST',
    data
  })
}

/**
 * 编辑昵称
 * @param data 查询参数
 * @returns Promise
 */
export function editNickNameApi(data: any) {
  return service({
    url: `/user/editNickName`,
    method: 'POST',
    data
  })
}

/**
 * 获取article
 * @param data 查询参数
 * @returns Promise
 */
export function articleInfoApi(params: { code: string }) {
  return service({
    url: `/article/info`,
    method: 'GET',
    params
  })
}

/**
 * 上传图片
 * @param data 查询参数
 * @returns Promise
 */
export function uploadApi(data: any) {
  return service({
    url: `/api/upload`,
    method: 'POST',
    data
  })
}

/**
 * 商城订单
 * @param data 查询参数
 * @returns Promise
 */
export function getGoodsRecordApi(data: any) {
  return service({
    url: `/goods/record`,
    method: 'POST',
    data
  })
}

/**
 * 购买外部商城
 * @param data 查询参数
 * @returns Promise
 */
export function buyOutGoodsApi(data: any) {
  return service({
    url: `/GroupBy/pay`,
    method: 'POST',
    data
  })
}

/**
 * 获取会员详情
 * @param data 查询参数
 * @returns Promise
 */
export function getUserDetailApi() {
  return service({
    url: `/user/detail`,
    method: 'GET'
  })
}

/**
 * 获取会员详情
 * @param data 查询参数
 * @returns Promise
 */
export function getRechargeMethodApi() {
  return service({
    url: `/recharge/method`,
    method: 'POST'
  })
}

/**
 * 充值
 * @param data 查询参数
 * @returns Promise
 */
export function rechargeApi(data: any) {
  return service({
    url: '/recharge/recharge',
    method: 'POST',
    data
  })
}

/**
 * 获取充值记录
 * @param data 查询参数
 * @returns Promise
 */
export function rechargeRecordApi(data: any) {
  return service({
    url: '/recharge/record',
    method: 'POST',
    data
  })
}

/**
 * 获取提现记录
 * @param data 查询参数
 * @returns Promise
 */
export function withdrawRecordApi(data: any) {
  return service({
    url: '/withdraw/record',
    method: 'POST',
    data
  })
}

/**
 * 获取银行列表
 * @param data 查询参数
 * @returns Promise
 */
export function getBankListApi() {
  return service({
    url: '/bank/lists',
    method: 'POST'
  })
}

/**
 * 添加银行
 * @param data 查询参数
 * @returns Promise
 */
export function addBankApi(data: any) {
  return service({
    url: `/bank/add`,
    method: 'POST',
    data
  })
}

/**
 * 提现
 * @param data 查询参数
 * @returns Promise
 */
export function doWithdrawApi(data: any) {
  return service({
    url: '/withdraw/withdraw',
    method: 'POST',
    data
  })
}

/**
 * 转账
 * @param data 查询参数
 * @returns Promise
 */
export function doTransferApi(data: any) {
  return service({
    url: '/Transfer/operate',
    method: 'POST',
    data
  })
}
