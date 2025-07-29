import service from '@/service'
export interface LocationParams {
  $pageSize: number
  $offsetId?: number
  name?: string
}
/**
 * 获取地区列表
 * @returns Promise
 */
export function getRegionList() {
  return service({
    url: '/resource/center/select/region',
    method: 'get'
  })
}

/**
 * 获取城市列表
 * @returns Promise
 */
export function getCityList(params: LocationParams) {
  return service({
    url: '/resource/v1/divisions/municipalities',
    method: 'get',
    params
  })
}

/**
 * 获取市场列表
 * @returns Promise
 */
export function getMarketList() {
  return service({
    url: '/da/v1/markets',
    method: 'get'
  })
}

/**
 * 获取省份
 * @returns Promise
 */
export function getProvinces() {
  return service({
    url: '/route/center/select/php/provinces',
    method: 'get'
  })
}

/**
 * 获取
 * @returns Promise
 */
export function getCitiesById(id: number | string) {
  return service({
    url: `/route/center/select/php/municipality/${id}`,
    method: 'get'
  })
}

/**
 * 获取
 * @returns Promise
 */
export function getBarangayById(id: number | string) {
  return service({
    url: `/route/center/select/php/barangay/${id}`,
    method: 'get'
  })
}
