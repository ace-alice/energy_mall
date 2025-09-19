import { articleInfoApi, raffleDrawApi, raffleListApi } from '@/api'
import drawBtn from '@/assets/images/draw/draw_btn.png'
import type { ArticleInfoType, RaffleItemType } from '@/interface/common'
import { useCommonStore } from '@/stores/common'
import { htmlDecodeByRegExp } from '@/utils/common'
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default function () {
  const { userDetail, userInfo } = storeToRefs(useCommonStore())
  const { getUserDetail, getUserInfo } = useCommonStore()

  const drawRule = ref<ArticleInfoType>({ content: '' } as ArticleInfoType)

  const raffleLists = ref<RaffleItemType[]>([])

  function articleInfo() {
    articleInfoApi({ code: 'lottory_details_info' }).then((res) => {
      drawRule.value = res.data.data
    })
  }

  function getRaffleList() {
    raffleListApi().then((res) => {
      raffleLists.value = res.data.data
    })
  }

  const content = computed(() => {
    return htmlDecodeByRegExp(drawRule.value.content).replace(/<img/g, '<img  width="100%"')
  })

  const prizes = computed(() => {
    return raffleLists.value.map((item) => {
      return {
        fonts: [{ text: item.title, top: '10%', fontSize: '14px' }],
        background: '#fff',
        imgs: [{ src: item.img, width: '20px', height: '20px', top: '30px' }]
      }
    })
  })

  onMounted(() => {
    articleInfo()
    getRaffleList()
  })

  const myLucky = ref()
  const defaultConfig = ref({
    gutter: 6
  })

  const defaultStyle = ref({
    fontColor: '#3EA867',
    fontSize: '24px',
    fontWeight: 600
  })

  const blocks = ref([{ padding: '6px', background: '#3EA867' }])
  const buttons = ref([
    {
      imgs: [
        {
          src: drawBtn,
          width: '120px',
          height: '120px',
          top: '-60px'
        }
      ]
    }
  ])

  //   const prizes = ref([{ fonts: [{ text: '0', top: '10%' }], background: '#fff' }])

  const playing = ref(false)

  const winInfo = ref<RaffleItemType>({} as RaffleItemType)

  const showPopup = ref(false)

  const loading = ref(false)

  function startCallback(type?: any) {
    if (playing.value || loading.value) {
      return
    }
    loading.value = true
    raffleDrawApi({
      // draw_type: type
    })
      .then((res) => {
        myLucky.value.play()
        playing.value = true
        getUserDetail()
        getUserInfo()
        setTimeout(() => {
          // 调用stop停止旋转并传递中奖索引
          const index = raffleLists.value.findIndex((item) => item.id == res.data.data.id) || 0
          winInfo.value = raffleLists.value[index]
          myLucky.value.stop(index)
          playing.value = false
        }, 1500)
        setTimeout(() => {
          showPopup.value = true
        }, 2500)
      })
      .catch(() => {
        myLucky.value.stop(0)
        playing.value = false
      })
      .finally(() => {
        loading.value = false
      })
  }

  // 抽奖结束会触发end回调
  function endCallback(prize: any) {
    console.log(prize)
  }

  return {
    myLucky,
    defaultConfig,
    buttons,
    defaultStyle,
    blocks,
    startCallback,
    endCallback,
    content,
    prizes,
    userDetail,
    winInfo,
    showPopup,
    userInfo,
    loading
  }
}
