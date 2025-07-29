<template>
    <div v-bind="$attrs" class="videoPlayer">
        <video class="video-js" :id="videoId" style="width: 100%; height: 100%" :poster="poster">
            <source v-if="src" :src="src" />
        </video>
        <!-- <div class="play-icon" @click="playVideo" v-if="!isPlaying">
            <van-icon name="play-circle-o" size="32" color="#fff" />
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'

const videoId = ref('myPlayerId');


const overrideNative = ref(false)
const isPlaying = ref(false);
const props = defineProps({
    id: { type: String, default: 'vd' },
    src: { type: String, default: '' },
    poster: { type: String, default: '' }
})

const emit = defineEmits([
    'videoCanplaythrough',
    'videoPlay',
    'videoPlaying',
    'videoPause'
]);

watch(() => props.id, (newId) => {
    videoId.value = newId;
}, {
    immediate: true
});

// VideoJs更多选项配置可以参考中文文档：
// https://gitcode.gitcode.host/docs-cn/video.js-docs-cn/docs/guides/options.html
function options() {
    return {
        html5: {
            hls: {
                overrideNative: overrideNative
            },
            nativeVideoTracks: !overrideNative,
            nativeAudioTracks: !overrideNative,
            nativeTextTracks: !overrideNative
        },
        autoplay: true,
        muted: false,
        loop: false,
        controls: true,
        preload: 'auto',
        fluid: true, // 当true时，将按比例缩放以适应其容器。
        type: 'application/x-mpegURl',
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        textTrackDisplay: false
    }
}


const playVideo = () => {
    isPlaying.value = true;
};
let player: any;


onMounted(() => {
    console.log('onMounted---video')
    try {
        player = videojs(videoId.value, options(), () => {
            // videojs.log('播放器已经准备好了!')
            player.pause();
            isPlaying.value = false;
            player.on('canplaythrough', function (event: any) {
                emit('videoCanplaythrough', event.target.player.cache_?.duration)
            })
            player.on('play', function () {
                // videojs.log('视频准备播放')
                emit('videoPlay')
            })
            player.on('playing', function () {
                // videojs.log('视频已开始播放')
                const videoEl = player.el().getElementsByTagName('video')[0];
                console.log('videoEl', videoEl)
                if (videoEl) {
                    videoEl.removeAttribute('poster');
                }
                isPlaying.value = true;

                emit('videoPlaying')
            })
            player.on('pause', function (event: any) {
                // videojs.log('视频暂停播放')

                isPlaying.value = false;
                emit('videoPause', event.target.player.cache_?.currentTime)
            })
        })
    } catch (error) {
        console.log('catch--->', error)
    }
})

onBeforeUnmount(() => {
    if (player) {
        player.dispose()
    }
})
</script>

<style scoped lang="scss">
.videoPlayer {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.video-js {
    width: 100%;
    height: 100%;
    padding-top: 0 !important;
}

:deep(.vjs-tech) {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

:deep(.vjs-control-bar) {
    pointer-events: none;

    .vjs-paused,
    .vjs-playing {
        pointer-events: none !important;
    }

    .vjs-control {
        pointer-events: auto;
    }

    .vjs-picture-in-picture-control {
        display: none;
    }
}

.play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    pointer-events: auto;
    cursor: pointer;
}
</style>