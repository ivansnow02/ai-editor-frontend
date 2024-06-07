/*
 * @Date: 2023-05-11 22:14:19
 * @LastEditors: yikoyu 2282373181@qq.com
 * @LastEditTime: 2023-06-13 20:39:47
 * @FilePath: \vuetify-pro-tiptap\examples\tiptap.ts
 */
// import 'vuetify-pro-tiptap/styles/editor.css'
import 'vuetify-pro-tiptap/styles/markdown.css'
import './styles/markdown/github.scss'
import './styles/markdown/maidragon.scss'

import {
  createVuetifyProTipTap,
  VuetifyTiptap,
  VuetifyViewer
} from 'vuetify-pro-tiptap'

export const vuetifyProTipTap = createVuetifyProTipTap({
  lang: 'zhHans',
  markdownTheme: 'github',
  components: {
    VuetifyTiptap,
    VuetifyViewer
  },

})
