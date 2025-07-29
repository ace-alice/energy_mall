import type { RegisterData } from '@/interface/common'
import service from '@/service'
interface userQueryParams {
  userId: number
}

/**
 * 获取init信息
 * @returns
 */
export function registerApi(data: RegisterData) {
  return service({
    url: '/da/v1/rsbsa-users',
    method: 'post',
    data
  })
}

export function userInfoApi() {
  return service({
    url: '/da/v1/rsbsa-users',
    method: 'get',
  })
}