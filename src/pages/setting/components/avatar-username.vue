<template>
  <div class="avatar-username">
    <van-image :src="userInfo.avatar || avatarIcon" width="74" height="74" round>
      <template v-slot:error>加载失败</template>
    </van-image>
    <van-uploader reupload max-count="1" :after-read="afterRead">
      <van-button type="primary" style="margin: 12px; height: 36px" round>更换头像</van-button>
    </van-uploader>

    <van-cell
      title="昵称"
      is-link
      :value="userInfo.nickname || '暂无昵称'"
      @click="showNicknameEdit = true"
    >
      <template #right-icon>
        <img :src="allowRight" width="20" height="20" alt="" />
      </template>
    </van-cell>
  </div>

  <van-dialog
    v-model:show="showNicknameEdit"
    title="编辑昵称"
    show-confirm-button
    show-cancel-button
    @confirm="nicknameConfirm"
  >
    <van-cell-group inset>
      <van-field
        v-model="nickname"
        rows="2"
        autosize
        type="textarea"
        maxlength="15"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </van-cell-group>
  </van-dialog>
</template>

<script setup lang="ts" name="AvatarUsername">
import avatarIcon from '@/assets/images/common/avatar.png'
import { useCommonStore } from '@/stores/common'
import allowRight from '@/assets/images/icons/allow-right.png'
import { editAvatarApi, editNickNameApi } from '@/api'
import uploadHook from '@/hooks/uploadHook'
const { userInfo } = storeToRefs(useCommonStore())
const { getUserInfo } = useCommonStore()
const showNicknameEdit = ref(false)
const nickname = ref('')

const { fileList, afterRead } = uploadHook({ callBack })

function callBack(url: string) {
  editAvatarApi({ img: url }).then((res) => {
    getUserInfo()
  })
}

watch(
  () => userInfo.value.nickname,
  (newVal) => {
    nickname.value = newVal
  },
  { immediate: true }
)

function nicknameConfirm() {
  if (nickname.value) {
    editNickNameApi({ username: nickname.value })
      .then(() => {
        showToast({ type: 'success', message: '编辑成功' })
        getUserInfo()
      })
      .finally(() => {
        return true
      })
  } else {
    return false
  }
}
</script>

<style lang="scss" scoped>
.avatar-username {
  margin: 16px;
  padding: 24px 0 6px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
