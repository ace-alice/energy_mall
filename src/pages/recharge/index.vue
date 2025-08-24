<template>
  <div class="normal-page">
    <BgTwo router="Recharge" />
    <NormalHeader :background="false" title="充值">
      <template #right>
        <van-button
          plain
          round
          size="small"
          type="success"
          style="background: none"
          @click="router.push({ name: 'RechargeProcess' })"
          >充值流程</van-button
        >
      </template>
    </NormalHeader>
    <BalanceBox />
    <div class="normal-card">
      <div class="select-method">
        选择充值方式
        <div v-waves @click="router.push({ name: 'RechargeOrderList' })">充值记录</div>
      </div>
      <van-tabs color="#000" animated @change="currentClassChange" v-model:active="active">
        <van-tab
          :title="classItem.class_name"
          v-for="(classItem, index) in methodLisFilter"
          :key="classItem.class_id"
          :name="index"
        >
          <div
            class="class-item"
            :class="{
              'active-method': currentMethod.id == child.id
            }"
            v-for="child in classItem.children"
            :key="child.id"
            v-waves
            @click="changeMethod(child)"
          >
            <div>{{ child.title }}</div>
            <div style="margin-top: 4px; font-size: 12px; opacity: 0.8">
              {{ child.min }}-{{ child.max }}
            </div>
            <div
              v-if="child.desc"
              style="margin-top: 4px; font-size: 12px; opacity: 0.8; color: #222"
            >
              {{ child.desc }}
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <PaymentMethod
      v-if="
        currentMethod.id &&
        currentMethod.account_info &&
        (currentMethod.style == 2 || currentMethod.style == 3)
      "
      :method="currentMethod"
    />
    <div class="normal-card">
      <div class="select-method">
        选择金额({{ currentMethod.account_info?.coin_name || 'RMB' }})
      </div>
      <InputRechargeAmount
        v-if="currentMethod.id"
        :method="currentMethod"
        :amount="amount"
        @change="(a) => (amount = a)"
      />
    </div>
    <div class="normal-card" v-if="currentMethod.style == 2 || currentMethod.style == 3">
      <div class="select-method">付款信息</div>
      <div class="self-form recharge-form">
        <van-field v-model="rechargeName" type="text" placeholder="请输入汇款人名称">
          <template #left-icon> </template>
          <template #right-icon> </template>
        </van-field>
        <div class="select-method" style="margin: 12px 0">付款信息</div>
        <van-uploader
          v-model="fileList"
          max-count="1"
          reupload
          :after-read="afterRead"
          :deletable="false"
        />
      </div>
    </div>

    <van-sticky :offset-bottom="50" position="bottom">
      <div style="margin-top: 40px; padding: 16px">
        <van-button block round type="primary" :disabled="disabled" @click="submit"
          >提交充值订单</van-button
        >
      </div>
    </van-sticky>
  </div>
</template>

<script setup lang="ts" name="Recharge">
import rechargeHook from '@/hooks/rechargeHook'
import BalanceBox from './components/balance-box.vue'
import PaymentMethod from './components/payment-method.vue'
import InputRechargeAmount from './components/input-recharge-amount.vue'
const router = useRouter()
const {
  methodLisFilter,
  currentMethod,
  currentClassChange,
  active,
  changeMethod,
  amount,
  rechargeName,
  afterRead,
  fileList,
  disabled,
  submit
} = rechargeHook()
</script>

<style lang="scss" scoped>
.select-method {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    font-size: 14px;
    color: #13b756;
    padding: 8px 12px;
    background-color: #edf8f2;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    transform: translateX(16px);
    cursor: pointer;
  }
}
.class-item {
  background-color: #78c46599;
  color: #fff;
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 12px;
}
.active-method {
  background-color: #13b756;
}
</style>
