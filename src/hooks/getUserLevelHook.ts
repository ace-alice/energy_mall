import { ref, onMounted } from 'vue'
export default function () {
  const list = ref<any[]>([])

  function getList() {}

  onMounted(() => {
    getList()
  })

  function getLevelNameById(id: string) {
    return list.value.find((item) => item.id == id)
  }

  return { list, getLevelNameById }
}
