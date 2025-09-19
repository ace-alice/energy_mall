<script setup lang="ts" name="NormalPayAction">
import { buyOutGoodsApi } from '@/api'
import { useCommonStore } from '@/stores/common'
import { showToast, closeToast } from 'vant'

const currency = __VITE_CURRENCY

const props = defineProps(['items', 'isPoint'])

const emit = defineEmits(['callBack'])

const showSheet = ref(false)

const showKeyboard = ref(false)

const showKeySheet = ref(false)

const { addressList, userInfo } = storeToRefs(useCommonStore())

const { getAddressList } = useCommonStore()

const { getUserInfo, getUserDetail } = useCommonStore()

const pins = ref('')

onMounted(() => {
  getAddressList()
})

const selectAddress = ref(0)

const totalPrice = computed(() => {
  return props.items.reduce((total: number, item: any) => total + (+item.price || 0), 0)
})

function toPins() {
  // if (!props.isPoint && userInfo.value.outside_frozen_money < totalPrice.value) {
  //   showToast({ type: 'fail', message: '可用余额不足' })
  //   return
  // }
  if (selectAddress.value) {
    showSheet.value = false
    showKeySheet.value = true
    showKeyboard.value = true
  } else {
    showToast({ type: 'fail', message: '请先选择收货地址' })
  }
}

function toPay() {
  showToast({ type: 'loading', overlay: true })
  const ids: string = props.items.map((item: any) => item.id).join(',')
  buyOutGoodsApi({ ids: ids, pin: pins.value })
    .then((res) => {
      closeToast()
      getUserInfo()
      getUserDetail()
      showToast({ type: 'text', message: '购买成功，请到订单页查看详情' })
      emit('callBack', ids.split(','))
    })
    .finally(() => {
      setTimeout(() => {
        closeKey()
      }, 200)
    })
}

function closeKey() {
  pins.value = ''
  showKeySheet.value = false
  showKeyboard.value = false
}

watch(
  () => addressList.value,
  (newVal) => {
    if (newVal.length > 0) {
      const defaultAddr = newVal.find((item) => item.default)
      if (defaultAddr) {
        selectAddress.value = defaultAddr.id
      } else {
        selectAddress.value = newVal[0].id
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <div @click="showSheet = true">
    <slot name="btn"> </slot>
  </div>
  <van-action-sheet
    v-model:show="showSheet"
    title=" "
    teleport="#app"
    lazy-render
    :close-on-click-overlay="false"
  >
    <div class="content">
      <van-radio-group v-model="selectAddress">
        <div class="normal-card" style="padding: 0">
          <van-cell
            v-for="item in addressList"
            :key="item.id"
            clickable
            :title="`${item.address_name} ${item.address_phone}`"
            :label="`${item.address_city},${item.address_place}`"
            @click="selectAddress = item.id"
          >
            <template #icon>
              <van-radio
                style="margin-right: 12px"
                checked-color="#000"
                :name="item.id"
              ></van-radio>
            </template>
          </van-cell>
          <van-cell title="添加收货地址" icon="add-o" size="large" clickable to="/address/add" />
        </div>
      </van-radio-group>
      <GoodsCount v-for="item in items" :item="item" :isPoint="isPoint" />

      <div class="submitBox">
        <div class="total">
          <span style="font-size: 14px">合计</span>
          <span style="font-size: 12px">{{ isPoint ? '积分' : currency }}</span>
          <VueCountTo
            style="font-size: 18px; color: #ff3434; font-weight: 600"
            :end-val="totalPrice"
          />
        </div>
        <div class="submit" v-waves @click="toPins">提交订单</div>
      </div>
    </div>
  </van-action-sheet>
  <van-action-sheet
    v-model:show="showKeySheet"
    teleport="#app"
    lazy-render
    :close-on-click-overlay="false"
    :closeable="false"
  >
    <div
      class="content"
      style="height: 400px"
      :style="{
        '--van-password-input-background': '#F7F8FB'
      }"
    >
      <div class="title">
        <div @click="closeKey">取消</div>
        <div>请输入支付密码</div>
        <div @click="toPay">确定</div>
      </div>
      <van-password-input
        :value="pins"
        :focused="showKeyboard"
        :gutter="10"
        @focus="showKeyboard = true"
        info="密码为 6 位数字"
        :mask="true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard v-model="pins" maxlength="6" :show="showKeyboard" />
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.title {
  padding: 0 16px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    font-size: 14px;
    cursor: pointer;
    &:nth-child(3) {
      font-size: 16px;
    }
  }
}
.total {
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
}
.submitBox {
  border: 1px solid #13b756;
  border-radius: 24px;
  margin: 20px 16px;
  height: 48px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .submit {
    width: 45%;
    line-height: 48px;
    background-color: #000;
    text-align: center;
    color: #13b756;
  }
}
.content {
  max-height: 80vh;
  padding: 30px 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f9f9f9;
}
</style>
