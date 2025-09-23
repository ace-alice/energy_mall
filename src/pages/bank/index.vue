<script setup lang="ts" name="BankList">
import { articleInfoApi } from '@/api'
import bankBg from '@/assets/images/background/back_bg.png'
import bankIcon from '@/assets/images/icons/bank.png'
import usdtIcon from '@/assets/images/icons/usdt.png'
import { defaultArticleInfo } from '@/defaultValue'
import type { ArticleInfoType } from '@/interface/common'
import { useCommonStore } from '@/stores/common'
import { htmlDecodeByRegExp } from '@/utils/common'

const router = useRouter()

const { getBankList } = useCommonStore()

const { bankList } = storeToRefs(useCommonStore())

const rules = ref<ArticleInfoType>(Object.assign({}, defaultArticleInfo))

function getRules() {
  articleInfoApi({ code: 'withdraw_rules' }).then((res) => {
    rules.value = res.data.data
  })
}

const content = computed(() => {
  return htmlDecodeByRegExp(rules.value.content || '').replace(/<img/g, '<img  width="100%"')
})

const usdtItems = computed(() => {
  return bankList.value.filter((item) => {
    return item.type == 1
  })
})

const bankItems = computed(() => {
  return bankList.value.filter((item) => {
    return item.type == 0
  })
})

const alipayItems = computed(() => {
  return bankList.value.filter((item) => {
    return item.type == 2
  })
})

onActivated(() => {
  getBankList()
})

onMounted(() => {
  getRules()
})
</script>

<template>
  <div class="normal-page">
    <BgTwo router="BankList" :img-src="bankBg" />
    <NormalHeader
      title="钱包管理"
      :background="false"
      text-color="#fff"
      :back-icon-tag="2"
      bgColor="#31BF6B"
    />
    <van-cell-group inset style="margin-top: 12px; border-radius: 16px">
      <van-cell title="USDT" size="large">
        <template #icon>
          <img :src="usdtIcon" alt="" height="20" width="20" style="margin-right: 8px" srcset="" />
        </template>
        <template #right-icon>
          <van-button type="success" plain size="small" @click="router.push({ name: 'UsdtAdd' })"
            >去添加</van-button
          >
        </template>
      </van-cell>
      <van-cell v-for="item in usdtItems" :key="item.id">
        <UsdtCard :delAble="true" :item="item" />
      </van-cell>
    </van-cell-group>
    <van-cell-group inset style="margin-top: 12px; border-radius: 16px">
      <van-cell title="银行卡" size="large">
        <template #icon>
          <img :src="bankIcon" alt="" height="20" width="20" style="margin-right: 8px" srcset="" />
        </template>
        <template #right-icon>
          <van-button type="success" plain size="small" @click="router.push({ name: 'BankAdd' })"
            >去添加</van-button
          >
        </template>
      </van-cell>
      <van-cell v-for="item in bankItems" :key="item.id">
        <BankCard :item="item" />
      </van-cell>
    </van-cell-group>

    <div class="normal-card">
      <TitleDel title="温馨提示" />
      <div v-html="content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
