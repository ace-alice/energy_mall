import type { MediaQueryInfo, TeamInfo, UserDetail, UserInfo } from '@/interface/common'

export const defaultMediaQueryInfo: MediaQueryInfo = {
  height: 815,
  width: 375,
  top: 0,
  bottom: 0
}

export const defaultUserInfo: UserInfo = {
  money: '',
  frozen_money: '',
  total_money: 0,
  income_money: '',
  invest_not_finish: '',
  invest_not_earn: '',
  yuebao_earn: '',
  username: '',
  nickname: '',
  avatar: '',
  phone: '',
  phone2: '',
  sfz_name: '',
  sfz_number: '',
  level: 0,
  level_name: '',
  signin_num: 0,
  user_points: 0,
  invite: '',
  level_team: 0,
  level_team_name: ''
}

export const defaultUserDetail: UserDetail = {
  uid: 0,
  shares_money: '',
  yuebao_money: '',
  yuebao_earn: '',
  yuebao_time: 0,
  yuebao_num: 0,
  recharge_money: '',
  recharge_num: 0,
  withdraw_money: '',
  withdraw_num: 0,
  signin_money: '',
  signin_num: 0,
  raffle_money: '',
  raffle_num: 0,
  team_invite: '',
  team_item: '',
  team_item_v1: '',
  team_item_v2: '',
  team_item_v3: '',
  team_invite_v1: '',
  team_invite_v2: '',
  team_invite_v3: '',
  team_invite_num: 0,
  team_invite_user: 0,
  team_recharge: '',
  team_recharge_v1: '',
  team_recharge_v2: '',
  team_recharge_v3: '',
  income_money: '',
  invest_money: '',
  invest_not_finish: '',
  invest_not_earn: '',
  invest_num: 0,
  user_points: 0,
  user_coupon: 0,
  bonus_num: 0,
  bonus_money: '',
  create_time: 0,
  update_time: 0,
  create_at: '',
  update_at: ''
}

export const defaultTeamInfo: TeamInfo = {
  v0: 0,
  v1: 0,
  total_recharge: 0,
  total_withdraw: 0,
  total_invest: 0,
  today_recharge: 0,
  month_recharge: 0,
  total_earn: 0
}
