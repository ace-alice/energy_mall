<script setup name="Address" lang="ts">
import { addAddressApi } from '@/api'
import { useCommonStore } from '@/stores/common'
import { getLocal } from '@/utils/storage'
import { areaList } from '@vant/area-data'
import type { AddressEditInfo } from 'vant'
const commonStore = useCommonStore()

const route = useRoute()
const router = useRouter()

function onSave(info: AddressEditInfo) {
  if (route.params.type && route.params.type == 'edit') {
    const editInfo = getLocal('editAddress')
    addAddressApi({
      id: editInfo.id,
      address_name: info.name,
      address_phone: info.tel,
      address_city: `${info.province},${info.city},${info.county},${info.areaCode}`,
      address_place: info.addressDetail,
      default: 1
    }).then((res) => {
      commonStore.getAddressList()
      router.back()
    })
  } else {
    addAddressApi({
      address_name: info.name,
      address_phone: info.tel,
      address_city: `${info.province},${info.city},${info.county},${info.areaCode}`,
      address_place: info.addressDetail,
      default: 1
    }).then((res) => {
      commonStore.getAddressList()
      router.back()
    })
  }
}

const addressInfo = reactive<AddressEditInfo>({
  tel: '',
  name: '',
  city: '',
  county: '',
  province: '',
  areaCode: '',
  addressDetail: '',
  isDefault: false
})

onMounted(() => {
  if (route.params.type && route.params.type == 'edit') {
    const editInfo = getLocal('editAddress')
    if (editInfo.address_city) {
      const cityArr = editInfo.address_city.split(',')
      Object.assign(addressInfo, {
        name: editInfo.address_name,
        tel: editInfo.address_phone,
        city: cityArr[1] || '',
        county: cityArr[2] || '',
        province: cityArr[0] || '',
        areaCode: cityArr[3] || '',
        isDefault: !!editInfo.default,
        addressDetail: editInfo.address_place
      })
    }
  }
})
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
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.van-address-item__tag) {
  background: #000;
  color: #13b756;
}
:deep(.van-address-item) {
  margin: 0;
}
:deep(.van-address-item + .van-address-item) {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    height: 0.5px;
    width: calc(100% - 20px);
    background: #ccc;
    opacity: 0.4;
    top: 0;
    right: 0;
  }
}
</style>
