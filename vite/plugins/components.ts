import { VantResolver } from '@vant/auto-import-resolver'
import components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createComponents() {
  return components({
    resolvers: [VantResolver()],
    dirs: ['src/components'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: 'src/types/components.d.ts'
  })
}
