<script setup name="BantayPresyo" lang="ts">
const router = useRouter()
function toNamed(routeName: string) {
  router.push({ name: routeName })
}
</script>

<template>
  <div class="bantay-presyo">
    <div class="content-1">Bantay Presyo</div>
    <div class="content-2">
      A platform providing daily commodity prices in major markets across the country.
    </div>
    <van-button round color="#fff" @click="toNamed('bantay_presyo')">
      <span style="color: rgba(30, 41, 59, 1);font-weight: 600;">Check</span></van-button
    >
  </div>
</template>

<style lang="scss" scoped>
.bantay-presyo {
  box-sizing: border-box;
  width: 100%;
  height: 207px;
  border-radius: 12px;
  background-color: rgba(219, 234, 254, 1);
  position: relative;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  line-height: 1.3;
  background-image: url('@/assets/images/common/bantaypresyo_1x-card.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .content-1 {
    font-size: 14px;
    font-weight: 700;
    width: 100%;
  }

  .content-2 {
    font-size: 12px;
    flex-grow: 1;
    width: calc(100% - 20px);
    font-weight: 500;
    margin-top: 12px;
  }
}
</style>
