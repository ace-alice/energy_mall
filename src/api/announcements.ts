import type { PageParams } from '@/interface/common'
import service from '@/service'

/**
 * 公告列表请求参数接口
 */
export interface AnnouncementsParams {
  classification: 'News' | 'Announcement' | 'Ayuda' | 'Live' | ''
  channel: 'Home' | 'PesteUpdate' | 'MoreRelatedArticles'
  $pageSize: number
  $offsetTime: string
  regionId?: number
  provinceId?: number
  cityId?: number
}

/**
 * 获取公告列表
 * @param params 请求参数
 * @returns Promise
 */
export function getAnnouncements(params: AnnouncementsParams) {
  return service({
    url: `da/v1/da-contents/channels/${params.channel}`,
    method: 'get',
    params: params
  })
}

export function getAnnouncementDetail(id: string) {
  return service({
    url: `/da/v1/da-contents/${id}`,
    method: 'get'
  })
}
