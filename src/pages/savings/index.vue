<script setup lang="ts" name="Savings">
import { useCommonStore } from '@/stores/common'
import SavingMoneyInfo from './components/yue-info.vue'
import { htmlDecodeByRegExp } from '@/utils/common'
import type { ArticleInfoType } from '@/interface/common'
import { articleInfoApi, yueBaoDepositApi, yueBaoWithdrawApi } from '@/api'
const channelType = ref('deposit')
const currency = __VITE_CURRENCY
const amount = ref()

const router = useRouter()

const { userDetail, userInfo } = storeToRefs(useCommonStore())
const { getUserDetail, getUserInfo } = useCommonStore()

const savingRule = ref<ArticleInfoType>({ content: '' } as ArticleInfoType)

function articleInfo() {
  articleInfoApi({ code: 'yuebao_info' }).then((res) => {
    savingRule.value = res.data.data
  })
}

const disabled = computed(() => {
  const tempMoney =
    channelType.value == 'deposit' ? userInfo.value.money : userDetail.value.yuebao_money
  return (amount.value || 0) <= 0 || (amount.value || 0) > +tempMoney
})

onMounted(() => {
  articleInfo()
})

const content = computed(() => {
  return htmlDecodeByRegExp(savingRule.value.content).replace(/<img/g, '<img  width="100%"')
})

function onSubmit() {
  showLoadingToast({ type: 'loading', overlay: true })
  const useApi = channelType.value == 'deposit' ? yueBaoDepositApi : yueBaoWithdrawApi
  useApi({ money: amount.value })
    .then((res) => {
      if (res.data.code == 0) {
        getUserInfo()
        getUserDetail()
        closeToast()
        setTimeout(() => {
          router.push('/savings-order')
        }, 200)
      }
    })
    .finally(() => {
      amount.value = undefined
    })
}
</script>

<template>
  <div class="normal-page">
    <BgTwo router="SavingsVip" />
    <NormalHeader title="存钱罐" :background="false">
      <template #right>
        <van-button type="primary" size="small" to="/savings-order">存钱罐记录</van-button>
      </template>
      <template #bottom>
        <SavingMoneyInfo />
      </template>
    </NormalHeader>
    <div class="normal-card">
      <van-row :gutter="12" style="margin-top: 16px">
        <van-col span="12">
          <van-button
            :plain="channelType != 'deposit'"
            block
            :type="channelType == 'deposit' ? 'primary' : 'default'"
            @click="() => (channelType = 'deposit')"
            :color="channelType == 'deposit' ? '' : '#222222'"
          >
            存入
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button
            :plain="channelType != 'withdraw'"
            :type="channelType == 'withdraw' ? 'primary' : 'default'"
            block
            :color="channelType == 'withdraw' ? '' : '#222222'"
            @click="() => (channelType = 'withdraw')"
          >
            取出
          </van-button>
        </van-col>
      </van-row>
      <div class="self-form recharge-form">
        <van-field
          v-model="amount"
          type="number"
          :placeholder="`请输入${channelType == 'deposit' ? '存入' : '取出'}金额`"
          :min="0"
        >
          <template #left-icon> </template>
          <template #right-icon>
            <span style="font-size: 14px; margin-right: 4px; color: #13b756">{{ currency }}</span>
            <van-icon name="arrow" size="16" color="#13B756" />
          </template>
        </van-field>
      </div>
      <div class="base">
        最大{{ channelType == 'deposit' ? '存入' : '取出' }}金额：
        <span>
          {{ channelType == 'deposit' ? userInfo.money : userDetail.yuebao_money }}
          {{ currency }}
        </span>
      </div>
    </div>
    <div class="normal-card draw-rule-card">
      <TitleDel title="温馨提示" />
      <div v-html="content"></div>
    </div>

    <van-sticky :offset-bottom="50" position="bottom">
      <div style="margin-top: 40px; padding: 16px">
        <van-button block round type="primary" :disabled="disabled" @click="onSubmit">{{
          channelType == 'deposit' ? '存入' : '取出'
        }}</van-button>
      </div>
    </van-sticky>
  </div>
</template>

<style lang="scss" scoped>
.base {
  font-size: 14px;
  padding: 20px 12px 0;
  span {
    color: #fbc145;
  }
}
</style>
