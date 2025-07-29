import service from '@/service'
import type { PageParams } from '@/interface/common'


// 获取优惠券详情
export function getCouponDetail(id: string) {
  return service({
    url: `/da/v1/coupons/${id}/user-coupons`,
    method: 'get'
  })
}

// 领取优惠券
export function doCollection(couponId: string) {
  return service({
    url: `/da/v1/coupons/${couponId}/user-coupons/doCollection`,
    method: 'put'
  })
}

// 设置通知提醒
export function doNotification(couponId: string) {
  return service({
    url: `/da/v1/coupons/${couponId}/user-coupons/doNotification`,
    method: 'put'
  })
}

// 获取当前用户已领取的优惠券
export function getActiveCoupons() {
  return service({
    url: '/da/v1/user-coupons/active-coupons',
    method: 'get'
  })
}
// 获取已领取的优惠券
export function getClaimedCoupons() {
  return service({
    url: '/da/v1/user-coupons/claimed-coupons',
    method: 'get'
  })
}
// 获取优惠券和内容
export function getCouponsWithContents(params: PageParams) {
  return service({
    url: '/da/v1/da-contents/with-coupons',
    method: 'get',
    params: params
  })
}
// 核销
export function doClaim(couponId: string) {
  return service({
    url: `/da/v1/coupons/${couponId}/user-coupons/doClaim`,
    method: 'put'
  })
}
// 核销优惠券详情
export function getClaimCouponDetail(couponId: string) {
  return service({
    url: `/da/v1/coupons/${couponId}/user-coupons`,
    method: 'get'
  })
}