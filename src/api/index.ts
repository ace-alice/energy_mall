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
export function getSigninListApi(data: any) {
  return service({
    url: '/signIn/record',
    method: 'POST',
    data
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
 * 签到
 * @param data 查询参数
 * @returns Promise
 */
export function signinTeamApi() {
  return service({
    url: `/signIn/signTeam`,
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
export function articleInfoApi(params: any) {
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
    url: `/goods/pay`,
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
    url: '/money/memberTransfer',
    method: 'POST',
    data
  })
}

/**
 * 投资类型列表
 * @param data 查询参数
 * @returns Promise
 */
export function getInvestClassesApi() {
  return service({
    url: '/Item/classes',
    method: 'GET'
  })
}

/**
 * 获取投资项目列表
 * @param data 查询参数
 * @returns Promise
 */
export function getInvestApi(data: any) {
  return service({
    url: '/item/lists',
    method: 'POST',
    data
  })
}

/**
 * 获取投资产品详情
 * @param data 查询参数
 * @returns Promise
 */
export function getInvestDetailApi(data: any) {
  return service({
    url: '/item/info',
    method: 'POST',
    params: data
  })
}

/**
 * 获取产品订单列表
 * @param data 查询参数
 * @returns Promise
 */
export function investOrderApi(data: any) {
  return service({
    url: '/item/record',
    method: 'POST',
    data
  })
}

/**
 * 投资项目
 * @param data 查询参数
 * @returns Promise
 */
export function investBuyApi(data: any) {
  return service({
    url: '/item/pay',
    method: 'POST',
    data
  })
}

/**
 * 获取抽奖奖励列表
 * @param data 查询参数
 * @returns Promise
 */
export function raffleListApi() {
  return service({
    url: '/raffle/lists',
    method: 'POST'
  })
}

/**
 * 获取抽奖奖励列表
 * @param data 查询参数
 * @returns Promise
 */
export function raffleDrawApi(data: any) {
  return service({
    url: `/raffle/draw`,
    method: 'POST',
    data
  })
}

/**
 * 获取抽奖记录列表
 * @param data 查询参数
 * @returns Promise
 */
export function raffleRecordApi(data: any) {
  return service({
    url: `/raffle/record`,
    method: 'POST',
    data
  })
}

/**
 * 获取资金明细
 * @param data 查询参数
 * @returns Promise
 */
export function getMoneyLogApi(data: any) {
  return service({
    url: `/Money/getMoneyLog`,
    method: 'POST',
    data
  })
}

/**
 * 获取项目订单详情
 * @param data 查询参数
 * @returns Promise
 */
export function getItemOrderInfoApi(data: any) {
  return service({
    url: `/item/orderInfo`,
    method: 'POST',
    data
  })
}

/**
 * 获取团队成员
 * @param data 查询参数
 * @returns Promise
 */
export function getTeamMemberApi(data: any) {
  return service({
    url: `/Team/blow`,
    method: 'POST',
    data
  })
}

/**
 * 获取团队成员
 * @param data 查询参数
 * @returns Promise
 */
export function getTeamMemberSelfApi(data: any) {
  return service({
    url: `/Team/lists`,
    method: 'POST',
    data
  })
}

/**
 * 额度转换
 * @param data 查询参数
 * @returns Promise
 */
export function selfTransferApi(data: any) {
  return service({
    url: `/money/selfTransfer`,
    method: 'POST',
    data
  })
}

/**
 * 额度转换
 * @param data 查询参数
 * @returns Promise
 */
export function getMemberTransferAuditListApi(data: any) {
  return service({
    url: `/money/getMemberTransferAuditList`,
    method: 'POST',
    data
  })
}

/**
 * 余额宝转入
 * @param data 查询参数
 * @returns Promise
 */
export function yueBaoDepositApi(data: any) {
  return service({
    url: `/YueBao/deposit`,
    method: 'POST',
    data
  })
}

/**
 * 余额宝转出
 * @param data 查询参数
 * @returns Promise
 */
export function yueBaoWithdrawApi(data: any) {
  return service({
    url: `/YueBao/withdraw`,
    method: 'POST',
    data
  })
}

/**
 * 余额宝明细
 * @param data 查询参数
 * @returns Promise
 */
export function yueBaoRecordApi(data: any) {
  return service({
    url: `/YueBao/record`,
    method: 'POST',
    data
  })
}

/**
 * 优惠卷列表
 * @param data 查询参数
 * @returns Promise
 */
export function getCouponListApi(data: any) {
  return service({
    url: `/user/userCouponsList`,
    method: 'POST',
    data
  })
}

/**
 * 获取有效优惠券
 * @param data 查询参数
 * @returns Promise
 */
export function getUseAbleCouponsApi(data?: any) {
  return service({
    url: `/user/userCoupons`,
    method: 'POST',
    data
  })
}

/**
 * 更换头像
 * @param data 查询参数
 * @returns Promise
 */
export function editAvatarApi(data?: any) {
  return service({
    url: `/user/editAvatar`,
    method: 'POST',
    data
  })
}
