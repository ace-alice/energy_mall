import { useRouter } from 'vue-router'
import { AppChannelType } from '@/tools/jsBridge/interface'
import type { Announcement } from '@/interface/common'

export function useAnnouncement() {
    const router = useRouter()

    const isLive = (type: string) => type === 'UserLive' || type === 'ThirdPartyLive'

    const handleItemClick = (item: Announcement) => {
        if (isLive(item.type)) {
            window.WebViewJSBridge.callHandler(AppChannelType.toNamed, {
                data: { routerName: '/livePage', id: item.id, type: item.type, liveId: item.id }
            })
        } else {
            router.push({
                name: 'AnnouncementDetail',
                query: {
                    id: item.id,
                    type: item.type
                }
            })
        }
    }

    return {
        isLive,
        handleItemClick
    }
} 