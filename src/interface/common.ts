export interface MediaQueryInfo {
  height: number
  width: number
  top: number
  bottom: number
}
// 分页基础参数
export interface PageParams {
  $pageSize: number
  $offsetTime: string
}

export interface RegisterData {
  RSBSA: string
  firstName: string
  middleName: string
  lastName: string
  suffixName: string
  gender: 'Male' | 'Female' | ""
  dateOfBirth: string
  farmerClassification: string
  association: string
  activity: string
  provinceId?: number
  cityId?: number
  barangayId?: number
  street?: string
  [key: string]: any
}
export interface UserInfo {
  RSBSA: string | null
  rsbsaId: string | null
  firstName: string
  middleName: string
  lastName: string
  suffixName: string
  gender: string
  avatarUrl: string
  dateOfBirth: string
  farmerClassification: string
  activity: string
  association: string
  reviewStatus: string
  provinceName: string | null
  cityName: string | null
  barangayName: string | null
  street: string | null
  provinceId: number | null
  cityId: number | null
  barangayId: number | null
}
export interface AsianlinkIdUserInfo {
  userId: number
  uid: number
  displayName: string
  avatarUrl: string
  status: string
  asianlinkId: string
}
export interface Announcement {
  id: number
  title: string
  coverUrl: string
  text: string
  type: 'Article' | 'Video' | 'UserLive' | 'ThirdPartyLive'
  sourceUserId: number
  classification: 'News' | 'Announcement' | 'Ayuda' | 'Live'
  channels: string[]
  video?: {
    videoUrl: string
    txVodFileId: string
  }
  userInfo: AsianlinkIdUserInfo
  updateTime: string
  createTime: string
  coupons: Coupon[]
}

export interface Coupon {
  id: number
  title: string
  itemQuantity: number
  coverUrl: string
  startTime: string
  endTime: string
  price: number
  specification: string
  claimedTime: string
  claimMerchantName: string
  status: string
}