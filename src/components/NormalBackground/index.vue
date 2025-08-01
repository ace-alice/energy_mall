<template>
    <teleport to='#app'>
        <img class="normal-bg" :src="normalBg" alt="">
    </teleport>
</template>

<script name="NormalBackground" setup lang="ts">
import normalBg from '@/assets/images/common/rsbsa_1x-card.png'
</script>

<style lang="scss" scoped>
.normal-bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>