import service from '@/service'

/**
 * 获取商品分类列表
 * @returns Promise
 */
export function getCategoryList() {
  return service({
    url: '/da/v1/commodity-categories',
    method: 'get'
  })
}
