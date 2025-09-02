<template>
  <div class="normal-page">
    <HomeHeader :img-src="pointsMallBg">
      <template #box>
        <div class="box-header">
          <div class="points">
            <div>
              <img
                :src="starIcon"
                width="20"
                height="20"
                style="margin-right: 4px"
                alt=""
                srcset=""
              />
              {{ userInfo.user_points }}
            </div>
            <div>积分记录></div>
          </div>
          <div class="header-bottom"></div>
          <img
            :src="backIcon2"
            class="back"
            height="24"
            width="24"
            alt=""
            @click="router.push({ name: 'MeVip' })"
          />
        </div>
      </template>
    </HomeHeader>
    <van-tabs
      class="team-tabs"
      v-model:active="active"
      sticky
      swipeable
      shrink
      color="#27B6AD"
      title-active-color="#333333"
      title-inactive-color="#333333"
      :offset-top="208 + mediaQueryInfo.top"
    >
      <van-tab v-for="tab in pointsClasses" :title="tab.title"
        ><ProjectListBox :type="tab.id"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts" name="PointsMall">
import pointsMallBg from '@/assets/images/background/points_mall_bg.png'
import starIcon from '@/assets/images/icons/star.png'
import { useCommonStore } from '@/stores/common'
import backIcon2 from '@/assets/images/icons/back_white_icon.png'
import ProjectListBox from './components/project-list.vue'

const { mediaQueryInfo, userInfo, pointsClasses } = storeToRefs(useCommonStore())

const router = useRouter()

const active = ref(0)
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  left: 16px;
  top: 56px;
}
.header-bottom {
  height: 16px;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #f9f9f9;
}
.points {
  margin: 30px 0;
  background: #fff;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
  & > div:nth-child(1) {
    height: 32px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #13b756;
    border-radius: 8px;
  }
  & > div:nth-child(2) {
    padding: 6px;
    font-size: 12px;
  }
}
.box-header {
  height: 210px;
  width: 100%;
  background-image: url('@/assets/images/background/points_mall_bg.png');
  background-size: 100% 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}
</style>
