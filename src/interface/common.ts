export interface MediaQueryInfo {
  height: number
  width: number
  top: number
  bottom: number
}
export interface UserInfo {
  money: string
  frozen_money: string
  total_money: number
  income_money: string
  invest_not_finish: string
  invest_not_earn: string
  yuebao_earn: string
  username: string
  nickname: string
  avatar: string
  phone: string
  phone2: string
  sfz_name: string
  sfz_number: string
  level: number
  level_name: string
  signin_num: number
  user_points: number
  invite: string
  level_team: number
  level_team_name: string
  outside_money: string
  outside_frozen_money: string
  outside_level_name: string
  outside_level_img: string
}

export interface UserDetail {
  uid: number
  shares_money: string
  yuebao_money: string
  yuebao_earn: string
  yuebao_time: number
  yuebao_num: number
  recharge_money: string
  recharge_num: number
  withdraw_money: string
  withdraw_num: number
  signin_money: string
  signin_num: number
  raffle_money: string
  raffle_num: number
  team_invite: string
  team_item: string
  team_item_v1: string
  team_item_v2: string
  team_item_v3: string
  team_invite_v1: string
  team_invite_v2: string
  team_invite_v3: string
  team_invite_num: number
  team_invite_user: number
  team_recharge: string
  team_recharge_v1: string
  team_recharge_v2: string
  team_recharge_v3: string
  income_money: string
  invest_money: string
  invest_not_finish: string
  invest_not_earn: string
  invest_num: number
  user_points: number
  user_coupon: number
  bonus_num: number
  bonus_money: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface TeamInfo {
  v0: number
  v1: number
  total_recharge: number
  total_withdraw: number
  total_invest: number
  today_recharge: number
  month_recharge: number
  total_earn: number
}

export interface BannerItem {
  id: number
  title: string
  img: string
  url: string
  content: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface NewsItemType {
  id: number
  title: string
  img: string
  code: string
  desc: string
  release_time: string
  content: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
  class_id: number
  class_name: string
}

export interface GroupClassType {
  id: number
  title: string
  img: string
  remark: string
  sort: number
  type: number
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface ProjectItemType {
  id: number
  class_id: number
  class_name: string
  class_type: number
  title: string
  sort: number
  price: string
  original_price: string
  img: string
  type: number
  is_hot: number
  valid_day: number
  sign_amount: number
  content: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface userDetailType {
  uid: number
  shares_money: string
  yuebao_money: string
  yuebao_earn: string
  yuebao_time: number
  yuebao_num: number
  recharge_money: string
  recharge_num: number
  withdraw_money: string
  withdraw_num: number
  signin_money: string
  signin_num: number
  raffle_money: string
  raffle_num: number
  team_invite: string
  team_item: string
  team_item_v1: string
  team_item_v2: string
  team_item_v3: string
  team_invite_v1: string
  team_invite_v2: string
  team_invite_v3: string
  team_invite_num: number
  team_invite_user: number
  team_recharge: string
  team_recharge_v1: string
  team_recharge_v2: string
  team_recharge_v3: string
  income_money: string
  invest_money: string
  invest_not_finish: string
  invest_not_earn: string
  invest_num: number
  user_points: number
  user_coupon: number
  bonus_num: number
  bonus_money: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface ArticleInfoType {
  id: number
  title: string
  img: string
  code: string
  desc: string
  release_time: number
  content: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
  class_id: number
  class_name: string
}

export interface AddressItemType {
  id: number
  uid: number
  username: string
  phone: string
  is_test: number
  address_name: string
  address_phone: string
  address_city: string
  address_place: string
  default: number
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface Account_info {
  id: number
  title: string
  status: number
  type: number
  show: number
  bank_name: string
  bank_owner: string
  bank_branch: string
  bank_account: string
  coin_name: string
  coin_blockchain: string
  coin_account: string
  alipay_account: string
  img: string
  remark: string
  rate: string
  admin_id: number
  admin_name: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface RechargeMethodType {
  id: number
  title: string
  code: string
  status: number
  upper: string
  upper_id: number
  upper_name: string
  upper_status: number
  upper_img: string
  class_id: number
  class_name: string
  class_status: number
  class_img: string
  class_rate: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
  min: string
  max: string
  style: number
  accounts: string
  accounts_name: string
  sort: number
  desc: string
  account_info: Account_info
}

export interface MethodLisFilterType {
  class_id: number
  class_name: string
  children: RechargeMethodType[]
}

export interface RechargeOrderItemType {
  id: number
  uid: number
  username: string
  phone: string
  is_test: number
  is_voice: number
  status: number
  channel_id: number
  channel_name: string
  class_id: number
  class_name: string
  account_id: number
  account_name: string
  order_no: string
  account: string
  img: string
  name: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
  amount: string
  amount_real: string
  remark: string
  rate: string
  style: number
}

export interface BankItemType {
  id: number
  uid: number
  username: string
  phone: string
  is_test: number
  type: number
  default: number
  name: string
  bank_name: string
  bank_branch: string
  bank_account: string
  coin_name: string
  coin_blockchain: string
  coin_account: string
  alipay_account: string
  alipay_img: string
  wx_img: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface GoodsOrderItemType {
  id: number
  uid: number
  username: string
  phone: string
  is_test: number
  img: string
  from_id: string
  goods_id: number
  goods_type: number
  goods_title: string
  order_no: string
  money: string
  remark: string
  deliver_title: string
  deliver_order_no: string
  deliver_time: string
  status: number
  is_cash: number
  address_name: string
  address_phone: string
  address_city: string
  address_place: string
  desc: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}
