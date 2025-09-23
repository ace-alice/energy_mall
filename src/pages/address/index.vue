<script setup name="Address" lang="ts">
import { showConfirmDialog, showLoadingToast, closeToast } from 'vant'
import { useCommonStore } from '@/stores/common'
import { setLocal } from '@/utils/storage'
import { delAddressApi, editAddressApi } from '@/api'
import type { AddressItemType } from '@/interface/common'

const { addressList } = storeToRefs(useCommonStore())
const { getAddressList } = useCommonStore()

const router = useRouter()

function onDelete(id: any) {
  showConfirmDialog({
    title: '删除地址',
    message: '确实要删除该地址吗？',
    className: 'dialog-addr',
    width: 300
  })
    .then(() => {
      beforeClose(id)
    })
    .catch(() => {
      // on cancel
    })
}

function beforeClose(id: number) {
  showLoadingToast({})
  delAddressApi({ id }).then(() => {
    getAddressList()
    closeToast()
  })
}

const changeDefaultLoad = ref(false)

function changeDefault(item: AddressItemType) {
  changeDefaultLoad.value = true
  editAddressApi(item).finally(() => {
    changeDefaultLoad.value = false
    getAddressList()
  })
}

function onEdit(item: any) {
  setLocal('editAddress', item)
  router.push({ name: 'AddressEditAdd', params: { type: 'edit' } })
}

function onAdd() {
  router.push({ name: 'AddressEditAdd', params: { type: 'add' } })
}
</script>

<template>
  <div
    class="normal-page"
    :style="{
      '--van-address-list-radio-color': '#000',
      '--van-address-list-padding': 0
    }"
  >
    <NormalHeader title="地址管理" />
    <div style="min-height: 90vh">
      <template v-if="addressList.length > 0">
        <van-swipe-cell v-for="item in addressList" :key="item.id">
          <!-- AddressList 的单项结构 -->
          <van-cell
            clickable
            :title="`${item.address_name} ${item.address_phone}`"
            :label="`${item.address_city},${item.address_place}`"
          >
            <template #icon>
              <van-checkbox
                v-model="item.default"
                style="margin-right: 12px"
                checked-color="#000"
                :disabled="changeDefaultLoad"
                @click="
                  () => {
                    changeDefault(Object.assign({}, item, { default: item.default }))
                  }
                "
              ></van-checkbox>
            </template>
            <template #right-icon>
              <van-icon name="edit" size="20" @click="onEdit(item)" />
            </template>
          </van-cell>

          <!-- 右侧滑动操作 -->
          <template #right>
            <van-button
              square
              type="danger"
              style="height: 100%; width: 100%"
              text="删除"
              @click="onDelete(item.id)"
            />
          </template>
        </van-swipe-cell>
      </template>
      <template v-else>
        <van-empty image-size="140" description="暂无收货地址" />
      </template>
    </div>

    <van-sticky :offset-bottom="50" position="bottom">
      <div style="margin: 16px">
        <van-button type="primary" round block @click="onAdd">新增收货地址</van-button>
      </div>
    </van-sticky>
  </div>
</template>

<style lang="scss"></style>
