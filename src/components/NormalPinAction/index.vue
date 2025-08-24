<script setup lang="ts" name="NormalPinAction">
const emit = defineEmits(['submit'])

const showKeySheet = ref(false)

const pins = ref('')

const showKeyboard = ref(false)

function sure() {
  if (pins.value.length == 6) {
    emit('submit', pins.value)
    setTimeout(() => {
      closeKey()
    }, 50)
  }
}

function closeKey() {
  pins.value = ''
  showKeySheet.value = false
  showKeyboard.value = false
}

function toOpenPin() {
  pins.value = ''
  showKeySheet.value = true
  showKeyboard.value = true
}

defineExpose({ toOpenPin })
</script>

<template>
  <div>
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
          <div @click="sure">确定</div>
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
  </div>
</template>

<style lang="scss" scoped>
.content {
  max-height: 80vh;
  padding: 30px 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f9f9f9;
}
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
</style>
