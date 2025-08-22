import { uploadApi } from '@/api'
import { ref } from 'vue'

export default function ({ callBack }: { callBack?: Function }) {
  const fileList = ref([])

  const afterRead = (file: any) => {
    file.status = 'uploading'
    file.message = '上传中...'
    const formData = new FormData()
    formData.append('file', file.file)
    uploadApi(formData)
      .then((res) => {
        file.status = 'success'
        file.message = '上传成功'
        if (callBack) {
          callBack(res.data.data.url)
        }
      })
      .catch((e) => {
        file.status = 'failed'
        file.message = '上传失败'
      })
  }

  return { fileList, afterRead }
}
