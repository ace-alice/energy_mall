import service from '@/service'

interface PriceQueryParams {
  regionId?: string
  marketCode?: string
  commodityCategoryCode?: string
}

/**
 * 获取价格列表
 * @param params 查询参数
 * @returns Promise
 */
export function getPriceList(params: PriceQueryParams) {
  return service({
    url: '/da/v1/commodities/doSearch',
    method: 'post',
    data: params
  })
}
