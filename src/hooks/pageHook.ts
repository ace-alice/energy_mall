import type { AxiosResponse } from 'axios'
import { ref } from 'vue'

export default function <T>({
  api,
  otherForm
}: {
  api: (data?: any) => Promise<AxiosResponse<any, any>>
  otherForm: { [key: string]: any }
}) {
  const list = ref<T[]>([])
  const loading = ref(false)
  const finished = ref(false)
  const refreshing = ref(false)

  const page = ref(0)

  const onLoad = () => {
    api(Object.assign({ page: page.value + 1 }, otherForm))
      .then((res) => {
        if (refreshing.value) {
          list.value = []
          refreshing.value = false
        }

        page.value = page.value + 1
        list.value = [...list.value, ...res.data.data.data]
        if (res.data.data.current_page >= res.data.data.last_page) {
          finished.value = true
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  const onRefresh = () => {
    // 清空列表数据
    finished.value = false

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true
    page.value = 0
    onLoad()
  }

  return { list, loading, finished, refreshing, onLoad, onRefresh }
}
