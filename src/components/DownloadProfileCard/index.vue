<script setup lang="ts" name="DownloadProfileCard">
import IdBg from '@/assets/images/common/id_bg.png'
import { AppChannelType } from "@/tools/jsBridge/interface";
import html2canvas from "html2canvas";
import downloadIcon from '@/assets/images/icons/download-04.png'
const props = defineProps({
    userInfo: {
        type: Object,
        default: {}
    },
})

const captureRef = ref<HTMLElement>()

function exportDiv() {
    if (captureRef.value) {
        html2canvas(captureRef.value, {
            'useCORS': true,
            'allowTaint': true
        }).then((canvas) => {
            const dataURL = canvas.toDataURL('image/png');

            console.log(dataURL);
            window.WebViewJSBridge.callHandler(AppChannelType.downloadImage, {
                data: dataURL,
            })
        });
    }

}
</script>

<template>
    <div>
        <div class="download-profile-card" ref="captureRef">
            <img :src="IdBg" class="card-img" alt="" srcset="">
            <div class="user-info">
                <img :src="userInfo.avatarUrl" class="user-img" crossorigin="anonymous" alt="" srcset="">
                <div style="margin-left: 12px;">
                    <div class="info-label">Full Name</div>
                    <div class="info-title">{{ userInfo.firstName }} {{ userInfo.middleName }} {{ userInfo.lastName }}
                    </div>
                    <div style="height: 8px;"></div>
                    <div class="info-label">RSBSA Number(System-generated)</div>
                    <div class="info-title">{{ userInfo.RSBSA }}</div>
                </div>
            </div>
        </div>
        <div style="margin-top: 16px;"></div>
        <van-button block round color="linear-gradient(90deg, #0077E5 0%, #1E40AF 100%)" :icon="downloadIcon"
            @click="exportDiv">Download</van-button>
    </div>
</template>

<style lang="scss" scoped>
.download-profile-card {
    display: flex;
    width: 100%;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 2px #00000030;
    position: relative;

    .user-info {
        position: absolute;
        display: flex;
        bottom: 25px;
        left: 22px;
        align-items: center;

        .user-img {
            height: 93px;
            width: 93px;
        }

        .info-label {
            font-weight: 600;
            font-size: 12px;
        }

        .info-title {
            font-weight: 700;
            margin-top: 2px;
        }
    }
}

.card-img {
    width: 100%;
}
</style>
