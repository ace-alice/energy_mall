import { HtmlTagDescriptor } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default function createHtml(env: any, isBuild: boolean) {
  const { VITE_APP_TITLE } = env
  let tags: HtmlTagDescriptor[] = []
  if (isBuild) {
    tags = [
      {
        tag: 'link',
        attrs: {
          rel: 'stylesheet',
          href: 'https://fastly.jsdelivr.net/npm/vant@4/lib/index.css'
        }
      }
    ]
  }
  // const loadingScript = ''
  return createHtmlPlugin({
    inject: {
      data: {
        title: VITE_APP_TITLE
      }
      // tags: tags
    },
    minify: isBuild
  })
}
