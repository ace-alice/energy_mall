export interface Announcement {
  [key: string]: any
}

export interface MediaQueryInfo {
  height: number
  width: number
  top: number
  bottom: number
}

export interface Lv1Data {
  sum_invest_money: string
  sum_recharge_money: string
  count: number
}

export interface Lv2Data {
  sum_invest_money: string
  sum_recharge_money: string
  count: number
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
  level_extra: string
  level_signin_amount: number
  signin_num: number
  user_points: number
  invite: string
  level_team: number
  level_team_name: string
  outside_money: string
  outside_frozen_money: string
  outside_level_name: string
  outside_level_img: string
  outside_level_start_time: string
  outside_level_end_time: string
  outside_level_sign_amount: number
  rate: string
  raffle_num: number
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
  outside_recharge_money: string
  outside_recharge_num: number
  withdraw_money: string
  withdraw_num: number
  signin_money: string
  signin_num: number
  outside_signin_num: number
  outside_signin_money: string
  raffle_money: string
  raffle_num: number
  new_user_draw: number
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
  lv1Data: Lv1Data
  lv2Data: Lv2Data
  team_num: number
  team_recharge_money: string
  team_withdraw_money: string
  valid_recharge_num: number
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

export interface SigninHistoryItemType {
  id: number
  uid: number
  username: string
  phone: string
  amount: string
  is_test: number
  is_agent: number
  sign_date: string
  continuous: number
  continuous_days: number
  continuous_days_total: number
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface InvestClassItemType {
  id: number
  title: string
  desc: string
  sort: number
  pid: number
  img: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface InvestItemType {
  id: number
  title: string
  img: string
  status: number
  sort: number
  level: number
  level_name: string
  class_id: number
  class_name: string
  discounted: number
  invest: number
  invest_scale: number
  invest_limit: number
  profit_type: number
  profit_rate: string
  profit_more: string
  profit_extra: string
  profit_cycle: number
  profit_cycle_time: number
  gift_points: number
  gift_raffle: number
  gift_bonus: string
  content: string
  desc: string
  progress: string
  progress_cycle: number
  progress_rate: string
  progress_time: number
  create_time: number
  update_time: number
  create_at: string
  update_at: string
  home_display: number
  product_release_time: string
  product_insurance_time: string
  gift_goods: number
  gift_item: number
  level_income: number
  gift_product_expires: number
  video_link: string
  sales_limit: number
  sales_time: number
  discounted_invest: number
}

export interface InvestOrderItemType {
  id: number
  order_no: string
  uid: number
  username: string
  phone: string
  is_test: number
  item_class_id: number
  item_class_name: string
  item_id: number
  item_name: string
  item_status: number
  item_type: number
  amount: string
  discounted_amount: string
  gift_bonus: string
  gift_points: number
  gift_raffle: number
  gift_coupon: number
  cycle_start: number
  cycle_end: number
  cycle_time: number
  profit_rate: string
  profit_more: string
  profit_extra: string
  profit_now: string
  profit_earn: string
  profit_total: string
  next_time: string
  last_time: string
  end_time: string
  is_coupon: number
  create_time: number
  update_time: number
  create_at: string
  update_at: string
  gift_goods: number
  gift_item: number
  is_gift: number
  gift_product_expires: number
  principal: string
  img: string
  profit_cycle_time: string
  profit_cycle: string
  profit_type: string
  end_time2: number
  item_invest_scale: string
  product_release_time: string
  product_insurance_time: string
  profit_fake: number
}

export interface RaffleItemType {
  id: number
  title: string
  money: string
  chance: string
  type: number
  img: string
  goods_id: number
  goods_name: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface RaffleHistoryItemType {
  id: number
  uid: number
  username: string
  phone: string
  is_test: number
  type: number
  raffle_id: number
  raffle_name: string
  desc: string
  amount: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
  img: string
  draw_type: number
}

export interface MoneyLogType {
  id: number
  uid: number
  username: string
  phone: string
  is_test: number
  order_id: string
  class_id: number
  class_name: string
  amount: string
  before: string
  after: string
  desc: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}

export interface TeamMemberType {
  id: number
  phone: string
  username: string
  nickname: string
  level_name: string
  sfz_name?: string
  total_recharge: string
  total_withdraw: string
  total_invest: string
  valid_user: number
  total_user: number
}

export interface TransferOrderItemType {
  id: number
  from_uid: number
  from_username: string
  from_phone: string
  to_uid: number
  to_username: string
  to_phone: string
  amount: string
  status: number
  admin_id: number
  admin_name: string
  audit_time: number
  audit_remark: string
  order_no: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}
export interface YueBaoRecordItemType {
  id: number
  uid: number
  username: string
  phone: string
  is_test: number
  type: number
  money: string
  info: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
}
