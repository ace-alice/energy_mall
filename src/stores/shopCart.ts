import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { Base64 } from 'js-base64'
import type { ProjectItemType } from '@/interface/common'

export const useShopCartStore = defineStore(
  'shopCart',
  () => {
    const shopCartList = ref<ProjectItemType[]>([])

    const searchText = ref('')

    const checkedCart = ref<string[]>([])

    // const allCheck = computed(() => {
    //   return filterCart.value.length == checkedCart.value.length
    // })

    const allCheck = ref(false)

    function addShopCart(item: ProjectItemType) {
      if (shopCartList.value.length >= 15) {
        showToast({ type: 'fail', message: '请先结算其他购物车商品' })
      } else {
        const shop = shopCartList.value.find((item1) => item.id == item1.id)
        if (!shop) {
          shopCartList.value.unshift(item)
        } else {
          showToast({ type: 'fail', message: '该商品已在购物车中' })
        }
      }
    }

    function delShopCart(id: string) {
      shopCartList.value = shopCartList.value.filter((item) => item.id.toString() != id)
    }

    function delMoreShopCart(ids: string[]) {
      shopCartList.value = shopCartList.value.filter((item) => ids.includes(item.id.toString()))
    }

    const filterCart = computed(() => {
      return shopCartList.value.filter((item) => {
        if (searchText.value.trim()) {
          return item.good_name.includes(searchText.value)
        } else {
          return true
        }
      })
    })

    function onSubmit() {}

    function changeCheck(checked: boolean) {
      setTimeout(() => {
        if (allCheck.value) {
          checkedCart.value = filterCart.value.map((item) => item.id.toString())
        } else {
          checkedCart.value = []
        }
      }, 100)
    }

    watch(
      () => filterCart.value,
      () => {
        checkedCart.value = []
      }
    )

    watch(
      () => [filterCart.value, checkedCart.value],
      () => {
        allCheck.value = filterCart.value.length == checkedCart.value.length
      }
    )

    const totalPrice = computed(() => {
      return shopCartList.value
        .filter((item) => {
          return checkedCart.value.includes(item.id.toString())
        })
        .reduce((total, item) => total + (+item.price || 0), 0)
    })

    return {
      shopCartList,
      delShopCart,
      addShopCart,
      delMoreShopCart,
      searchText,
      filterCart,
      checkedCart,
      allCheck,
      onSubmit,
      changeCheck,
      totalPrice
    }
  },
  {
    // 配置持久化
    persist: {
      key: 'shopCart', // 在 localStorage 中保存的 key
      storage: localStorage, // 使用 localStorage 进行存储
      serializer: {
        // 自定义序列化
        serialize: (state: any) => {
          return Base64.encode(JSON.stringify(state))
        },
        // 自定义反序列化
        deserialize: (storedValue: any) => {
          return JSON.parse(Base64.decode(storedValue))
        }
      },
      debug: true
    }
  }
)
