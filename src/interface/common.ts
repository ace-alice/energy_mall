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
  title: string
  class_id: number
  class_name: string
  is_recommend: number
  good_id: number
  good_name: string
  good_img: string
  sort: number
  price: string
  people: number
  people_add: number
  people_time: number
  process_time: number
  process_num: string
  process_update_time: number
  fail_money: string
  limit: number
  level: number
  item_money: string
  status: number
  next_time: string
  cycle: number
  desc: string
  create_time: number
  update_time: number
  create_at: string
  update_at: string
  good_price: string
  good_content: string
  period: string
}
