<script setup lang="ts" name="InputRechargeAmount">
const props = defineProps(['method', 'amount'])
const emit = defineEmits(['change'])

const amountList = [100, 500, 1000, 1500, 3000, 4000, 5000, 7000, 10000, 20000, 50000]

const amountTemp = ref()

const selectList = computed(() => {
  return amountList
    .filter((item) => item >= props.method.min && item <= props.method.max)
    .slice(0, 6)
})

watch(
  () => props.amount,
  (newVal) => {
    if (amountTemp.value != newVal) {
      amountTemp.value = undefined
    }
  }
)

watch(
  () => amountTemp.value,
  (newVal) => {
    if (newVal) {
      emit('change', newVal)
    } else if (!selectList.value.includes(props.amount)) {
      emit('change', selectList.value[0])
    }
  }
)

watch(
  () => selectList.value,
  (newVal) => {
    if (newVal.length > 0) {
      emit('change', newVal[0])
    }
  }
)

const onInput = (e: any) => {
  // 只保留数字
  let digits = String(e.detail || '').replace(/\D/g, '')
  // 去掉前导 0
  digits = digits.replace(/^0+/, '')
  amountTemp.value = digits
}
</script>

<template>
  <div>
    <van-row :gutter="[10, 5]" style="margin-top: 10px">
      <van-col span="8" v-for="value in selectList" :key="value">
        <van-button
          :color="value == amount ? '#13B756' : '#EDF8F2'"
          :style="{
            color: value == amount ? '#fff' : '#000',
            fontWeight: 600,
            fontSize: '16px'
          }"
          block
          @click="emit('change', value)"
          >{{ value }}</van-button
        >
      </van-col>
    </van-row>
    <div class="self-form recharge-form">
      <van-field
        v-model="amountTemp"
        type="number"
        placeholder="请输入充值金额"
        :min="+method.min || 0"
        :max="+method.max || 999999999"
      >
        <template #left-icon>
          <div>自定义 |</div>
        </template>
        <template #right-icon>
          <span style="font-size: 14px; margin-right: 4px">{{
            method.account_info?.coin_name || 'RMB'
          }}</span>
          <van-icon name="arrow" size="16" />
        </template>
      </van-field>
      <div
        class="rate"
        v-if="
          method.account_info?.coin_name &&
          method.account_info?.coin_name != 'RMB' &&
          method.account_info?.rate
        "
      >
        <div>
          <span style="opacity: 0.6; font-size: 14px">兑换结果</span>
          {{ (amount * method.account_info?.rate).toFixed(0) }} RMB
        </div>
        <div style="color: #13b756">
          1{{ method.account_info?.coin_name }}={{ method.account_info?.rate }}RMB
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rate {
  display: flex;
  justify-content: space-between;

  padding: 12px;
}
</style>
