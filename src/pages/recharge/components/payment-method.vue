<script setup lang="ts" name="PaymentMethod">
const props = defineProps(['method'])
</script>

<template>
  <div style="margin-top: 12px">
    <van-cell-group inset v-if="method.account_info.type == 0">
      <van-cell title="银行名称" :value="method.account_info.bank_name">
        <template #right-icon>
          <Clipboard :content="method.account_info.bank_name" style="margin-left: 8px">
            <template #label>
              <van-icon name="link-o" size="18" />
            </template>
          </Clipboard>
        </template>
      </van-cell>
      <van-cell title="持卡人" :value="method.account_info.bank_owner">
        <template #right-icon>
          <Clipboard :content="method.account_info.bank_owner" style="margin-left: 8px">
            <template #label>
              <van-icon name="link-o" size="18" />
            </template>
          </Clipboard>
        </template>
      </van-cell>
      <van-cell title="银行卡号" :value="method.account_info.bank_account">
        <template #right-icon>
          <Clipboard :content="method.account_info.bank_account" style="margin-left: 8px">
            <template #label>
              <van-icon name="link-o" size="18" />
            </template>
          </Clipboard>
        </template>
      </van-cell>
      <van-cell title="分行名称" :value="method.account_info.bank_branch">
        <template #right-icon>
          <Clipboard :content="method.account_info.bank_branch" style="margin-left: 8px">
            <template #label>
              <van-icon name="link-o" size="18" />
            </template>
          </Clipboard>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group inset v-if="method.account_info.type == 1">
      <van-cell title="虚拟币地址" :value="method.account_info.coin_account">
        <template #right-icon>
          <Clipboard :content="method.account_info.coin_account" style="margin-left: 8px">
            <template #label>
              <van-icon name="link-o" size="18" />
            </template>
          </Clipboard>
        </template>
      </van-cell>
      <van-cell title="地址协议" :value="method.account_info.coin_blockchain">
        <template #right-icon>
          <Clipboard :content="method.account_info.coin_blockchain" style="margin-left: 8px">
            <template #label>
              <van-icon name="link-o" size="18" />
            </template>
          </Clipboard>
        </template>
      </van-cell>
      <van-cell class="img-cell" v-if="method.account_info.img"
        ><van-image width="200" height="200" :src="method.account_info.img" />
      </van-cell>
    </van-cell-group>
    <van-cell-group inset v-if="method.account_info.type == 2">
      <van-cell title="支付宝账号" :value="method.account_info.alipay_account">
        <template #right-icon>
          <Clipboard :content="method.account_info.alipay_account" style="margin-left: 8px">
            <template #label>
              <van-icon name="link-o" size="18" />
            </template>
          </Clipboard>
        </template>
      </van-cell>
      <van-cell class="img-cell" v-if="method.account_info.img"
        ><van-image width="200" height="200" :src="method.account_info.img" />
      </van-cell>
    </van-cell-group>
    <van-cell-group inset v-if="method.account_info.type == 3">
      <van-cell class="img-cell" v-if="method.account_info.img"
        ><van-image width="200" height="200" :src="method.account_info.img" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style lang="scss" scoped>
.img-cell {
  &:deep(.van-cell__value) {
    text-align: center !important;
  }
}
</style>
