/**
 * 格式化日期
 * @param dateString 日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (dateString: string, type?: string) => {
    const date = new Date(dateString)
    // const date = new Date('2025-06-10 10:00:00')
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    // Convert milliseconds to different time units
    const diffSeconds = Math.floor(diff / 1000)
    const diffMinutes = Math.floor(diff / (1000 * 60))
    const diffHours = Math.floor(diff / (1000 * 60 * 60))
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))

    // If type is 'date', return only the date part
    if (type === 'date') {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    // Time difference based formatting
    if (diffSeconds < 60) {
        return 'Just now'
    } else if (diffMinutes === 1) {
        return '1 min'
    } else if (diffMinutes < 60) {
        return `${diffMinutes} mins ago`
    } else if (diffHours === 1) {
        return '1 hr'
    } else if (diffHours < 24) {
        return `${diffHours} hrs ago`
    } else if (diffDays === 1) {
        return '1 day'
    } else if (diffDays < 7) {
        return `${diffDays} days ago`
    } else if (diffDays === 7) {
        return 'A week ago'
    } else {
        // For dates more than a week ago, show full date with time
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            // hour: 'numeric',
            // minute: '2-digit',
            // hour12: true
        })
    }
}

/**
 * 格式化日期范围
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @returns 格式化后的日期范围字符串
 */
export const formatDateRange = (startTime?: string, endTime?: string) => {
    if (!startTime) return ''

    const start = new Date(startTime)
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    const startMonth = months[start.getMonth()]
    const startDay = start.getDate()
    const startYear = start.getFullYear()

    // 如果没有结束日期，只显示开始日期
    if (!endTime) {
        return `${startMonth} ${startDay}, ${startYear}`
    }

    const end = new Date(endTime)
    const endMonth = months[end.getMonth()]
    const endDay = end.getDate()
    const endYear = end.getFullYear()

    // 同年同月
    if (startYear === endYear && start.getMonth() === end.getMonth()) {
        return `${startMonth} ${startDay}-${endDay}, ${startYear}`
    }

    // 同年跨月
    if (startYear === endYear) {
        return `${startMonth} ${startDay}-${endMonth} ${endDay}, ${startYear}`
    }

    // 跨年
    return `${startMonth} ${startDay}, ${startYear}-${endMonth} ${endDay}, ${endYear}`
} 